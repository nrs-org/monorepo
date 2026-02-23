/* eslint-disable */
/**
 * xml-to-tsx.ts
 *
 * Converts NRSML XML files from .temp_third_party/nrs-impl/nrs/ into TSX files
 * under packages/nrs-impl/nrs/, mirroring the directory structure.
 *
 * Usage:
 *   bun run scripts/xml-to-tsx.ts
 *
 * Rules:
 * - XML tags are renamed: camelCase → PascalCase, but structural tags
 *   (document, entry, include, def, ref, contributor, children, source, etc.)
 *   are handled specially.
 * - XML comments → {/* ... *\/} JSX comments.
 * - Nested <entry> elements are flattened: child entries become top-level
 *   siblings, $-N IDs are resolved to <parentId>-N, and a <Contains> is
 *   emitted inside the parent entry.
 * - <def>/<ref> without <script>: converted to TS functions / call sites.
 * - <def>/<ref> with <script>: emitted as TODO comment blocks.
 * - Document-level impacts with <contributor> children: emitted at doc level
 *   with a contributors prop.
 * - <source> children (mal, al, adb, ks, urls/url, vgmdb): passed as props to <Source>.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, relative, resolve } from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type XmlNode = XmlElement | XmlText | XmlComment | XmlProcessingInstruction;

interface XmlElement {
  type: "element";
  tag: string;
  attrs: Record<string, string>;
  children: XmlNode[];
}

interface XmlText {
  type: "text";
  value: string;
}

interface XmlComment {
  type: "comment";
  value: string;
}

interface XmlProcessingInstruction {
  type: "pi";
  value: string;
}

// ---------------------------------------------------------------------------
// Minimal XML Parser
// ---------------------------------------------------------------------------

function parseXml(src: string): XmlNode[] {
  const nodes: XmlNode[] = [];
  let i = 0;

  function skipWhitespace() {
    while (i < src.length && /\s/.test(src[i]!)) i++;
  }

  function parseComment(): XmlComment {
    // i is right after <!--
    const start = i;
    while (i < src.length) {
      if (src.slice(i, i + 3) === "-->") {
        const value = src.slice(start, i);
        i += 3;
        return { type: "comment", value };
      }
      i++;
    }
    throw new Error("Unterminated comment");
  }

  function parsePI(): XmlProcessingInstruction {
    // i is right after <?
    const start = i;
    while (i < src.length) {
      if (src.slice(i, i + 2) === "?>") {
        const value = src.slice(start, i);
        i += 2;
        return { type: "pi", value };
      }
      i++;
    }
    throw new Error("Unterminated PI");
  }

  function parseAttrValue(): string {
    const quote = src[i];
    if (quote !== '"' && quote !== "'") {
      throw new Error(`Expected quote at ${i}, got ${src[i]}`);
    }
    i++; // skip opening quote
    let val = "";
    while (i < src.length && src[i] !== quote) {
      if (src[i] === "&") {
        const semi = src.indexOf(";", i);
        const entity = src.slice(i + 1, semi);
        switch (entity) {
          case "amp":
            val += "&";
            break;
          case "lt":
            val += "<";
            break;
          case "gt":
            val += ">";
            break;
          case "quot":
            val += '"';
            break;
          case "apos":
            val += "'";
            break;
          default:
            val += `&${entity};`;
        }
        i = semi + 1;
      } else {
        val += src[i];
        i++;
      }
    }
    i++; // skip closing quote
    return val;
  }

  function parseName(): string {
    const start = i;
    while (i < src.length && /[a-zA-Z0-9_:.\-$]/.test(src[i]!)) i++;
    return src.slice(start, i);
  }

  function parseElement(): XmlElement {
    // i is right after <
    const tag = parseName();
    const attrs: Record<string, string> = {};

    while (i < src.length) {
      skipWhitespace();
      if (src[i] === "/" && src[i + 1] === ">") {
        i += 2;
        return { type: "element", tag, attrs, children: [] };
      }
      if (src[i] === ">") {
        i++;
        break;
      }
      // parse attribute
      const attrName = parseName();
      if (!attrName) {
        i++; // safety
        continue;
      }
      skipWhitespace();
      if (src[i] === "=") {
        i++;
        skipWhitespace();
        attrs[attrName] = parseAttrValue();
      } else {
        attrs[attrName] = attrName; // boolean attr
      }
    }

    // parse children until </tag>
    const children = parseNodes(`</${tag}>`);

    // consume closing tag
    if (src.slice(i, i + `</${tag}>`.length) === `</${tag}>`) {
      i += `</${tag}>`.length;
    }

    return { type: "element", tag, attrs, children };
  }

  function parseNodes(until: string): XmlNode[] {
    const result: XmlNode[] = [];
    while (i < src.length) {
      if (until && src.slice(i, i + until.length) === until) break;

      if (src[i] === "<") {
        if (src.slice(i, i + 4) === "<!--") {
          i += 4;
          result.push(parseComment());
        } else if (src.slice(i, i + 2) === "<?") {
          i += 2;
          result.push(parsePI());
        } else if (src[i + 1] === "/") {
          // closing tag — stop
          break;
        } else {
          i++; // skip <
          result.push(parseElement());
        }
      } else {
        // text node
        const start = i;
        while (
          i < src.length &&
          src[i] !== "<" &&
          !(until && src.slice(i, i + until.length) === until)
        ) {
          i++;
        }
        const text = src.slice(start, i);
        if (text.trim()) {
          result.push({ type: "text", value: text });
        }
      }
    }
    return result;
  }

  return parseNodes("");
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Explicit tag → component name overrides for tags that are all-caps acronyms. */
const TAG_TO_COMPONENT: Record<string, string> = {
  aei: "AEI",
  nei: "NEI",
  ehi: "EHI",
  epi: "EPI",
  pads: "PADS",
  cryPADS: "CryPADS",
  maxAEIPADS: "MaxAEIPADS",
};

/** camelCase or lowercase tag → PascalCase component name */
function toPascalCase(tag: string): string {
  if (TAG_TO_COMPONENT[tag]) return TAG_TO_COMPONENT[tag]!;
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

/** Escape a string for use inside a JSX string prop (double-quoted) */
function escapeAttr(value: string): string {
  return value.replace(/"/g, "&quot;");
}

/**
 * Normalise a `generatedBy` attribute value.
 * Returns `"user"` if the value is literally `"user"`, otherwise `null`
 * (meaning the attribute was machine-generated and should be dropped).
 */
function normalizeGeneratedBy(value: string): "user" | null {
  return value === "user" ? "user" : null;
}

/**
 * Translate legacy XML `status` strings to the current `ProgressStatus` union.
 *
 * Old XML term → ProgressStatus
 *   Watching / Reading / Playing → Consuming
 *   Plan to Watch / Read / Play  → Planned
 *   On Hold                      → Paused
 *   Dropped                      → Abandoned
 *   Rewatching / Rereading       → Reconsuming
 *   Unwatched / Unread           → Planned
 */
function normalizeProgressStatus(value: string): string {
  switch (value) {
    case "Watching":
    case "Reading":
    case "Playing":
      return "Consuming";
    case "Plan to Watch":
    case "Plan to Read":
    case "Plan to Play":
    case "Unwatched":
    case "Unread":
      return "Planned";
    case "On Hold":
      return "Paused";
    case "Dropped":
      return "Abandoned";
    case "Rewatching":
    case "Rereading":
    case "Replaying":
      return "Reconsuming";
    default:
      return value; // already canonical (e.g. "Completed", "Paused", …)
  }
}

/** Format an attribute value as a JSX prop.
 *  Numeric strings → {n}, boolean strings ("true"/"false") → {bool},
 *  fractions (e.g. "1/5") → {1/5},
 *  everything else → "string".
 */
function formatProp(name: string, value: string): string {
  // Numeric (int or float, possibly negative).
  // Use parseFloat to canonicalise the value so leading zeros (e.g. "00.8")
  // do not produce an octal literal parse error in the emitted JSX.
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return `${name}={${parseFloat(value)}}`;
  }
  // Simple integer fraction (e.g. "1/5", "3/4") — emit as a JSX expression
  // so TypeScript sees a number, not a string.
  if (/^-?\d+\/-?\d+$/.test(value)) {
    return `${name}={${value}}`;
  }
  // Boolean
  if (value === "true") return `${name}={true}`;
  if (value === "false") return `${name}={false}`;
  // String
  return `${name}="${escapeAttr(value)}"`;
}

/** Indent each line of text by `depth * 2` spaces */
function indent(text: string, depth: number): string {
  const pad = "  ".repeat(depth);
  return text
    .split("\n")
    .map((l) => (l.trim() ? pad + l : l))
    .join("\n");
}

// ---------------------------------------------------------------------------
// Converter state
// ---------------------------------------------------------------------------

/**
 * A "def" macro: its variable names and its body nodes.
 * If `hasScript` is true, the def contains <script> blocks and cannot be
 * expanded automatically — refs to it become TODO comments.
 */
interface DefMacro {
  name: string;
  vars: string[]; // e.g. ["a_strength", "a_base"]
  body: XmlNode[];
  hasScript: boolean;
}

interface ConvertContext {
  defs: Map<string, DefMacro>; // all known def macros (global across included files)
  depth: number; // current JSX indentation depth
  entryStack: string[]; // stack of ancestor entry IDs (for $-N resolution)
}

// ---------------------------------------------------------------------------
// Core conversion
// ---------------------------------------------------------------------------

/** Check whether a node subtree contains a <script> element */
function containsScript(nodes: XmlNode[]): boolean {
  for (const n of nodes) {
    if (n.type === "element") {
      if (n.tag === "script") return true;
      if (containsScript(n.children)) return true;
    }
  }
  return false;
}

/** Resolve a $-N entry ID relative to the current parent */
function resolveId(id: string, entryStack: string[]): string {
  if (!id.startsWith("$-")) return id;
  const parent = entryStack[entryStack.length - 1];
  if (!parent) return id; // no parent — leave as-is
  return `${parent}-${id.slice(2)}`;
}

/** Render a single XML comment into a JSX comment line */
function renderComment(value: string): string {
  // A comment may be multi-line. Normalize.
  const trimmed = value.trim();
  // Replace irregular Unicode whitespace (e.g. ideographic space U+3000) with
  // a regular ASCII space so ESLint's no-irregular-whitespace rule is satisfied.
  const normalized = trimmed.replace(/[^\S\x20\t\n\r]/gu, " ");
  // Protect against */ inside comment content
  const safe = normalized.replace(/\*\//g, "* /");
  return `{/* ${safe} */}`;
}

/** Render attributes of an element as JSX props string (no newlines) */
function renderAttrs(
  attrs: Record<string, string>,
  exclude: string[] = [],
): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(attrs)) {
    if (exclude.includes(k)) continue;
    parts.push(formatProp(k, v));
  }
  return parts.join(" ");
}

/** Render a single <contributor> element as a <P.Contributor .../> JSX line */
function renderContributorChild(
  c: XmlElement,
  subst: Record<string, string>,
  pad: string,
): string {
  const id = escapeAttr(applySubst(c.attrs["id"] ?? "", subst));
  const rawFactor = applySubst(c.attrs["factor"] ?? "1", subst);
  // Emit factor as a JSX numeric expression (handles integers, floats, fractions)
  const factorProp = formatProp("factor", rawFactor);
  return `${pad}<P.Contributor id="${id}" ${factorProp} />`;
}

/**
 * Expand a <ref> invocation by substituting the macro's vars with the
 * supplied attribute values and returning the body nodes with substitutions
 * applied textually (we do a simple string replace on serialised XML-like
 * attribute values before rendering).
 *
 * Because we are rendering to text rather than transforming the AST, we
 * render the body with a modified attrs map passed through a substitution
 * function.
 */
function renderRef(
  refEl: XmlElement,
  ctx: ConvertContext,
  lines: string[],
): void {
  const name = refEl.attrs["name"];
  if (!name) {
    lines.push(`{/* WARNING: <ref> missing name attr */}`);
    return;
  }

  const def = ctx.defs.get(name);
  if (!def) {
    lines.push(`{/* WARNING: unknown ref "${name}" — no def found */}`);
    return;
  }

  if (def.hasScript) {
    // Emit TODO comment with original XML snippet
    const xmlSnippet = serializeNodeForComment(refEl);
    lines.push(
      `{/* TODO: manual port — ref "${name}" uses <script>:\n${xmlSnippet}\n*/}`,
    );
    return;
  }

  // Build substitution map: var name → supplied value
  const subst: Record<string, string> = {};
  for (const v of def.vars) {
    if (refEl.attrs[v] !== undefined) {
      subst[v] = refEl.attrs[v]!;
    }
  }

  // The <ref> element may itself have contributor/ref children (passed as
  // <children /> expansion). Collect them.
  const refChildren = refEl.children.filter(
    (n): n is XmlElement => n.type === "element",
  );

  // Render the def body with substitution
  renderNodes(def.body, ctx, lines, subst, refChildren);
}

/**
 * Apply variable substitutions to an attribute value string.
 * e.g. subst = {a_strength: "0.5"}, value = "a_strength" → "0.5"
 */
function applySubst(value: string, subst: Record<string, string>): string {
  // Replace exact-match variable names (the value IS the variable name)
  if (subst[value] !== undefined) return subst[value]!;
  // For quoted string variables like "a_era" the XML has the var name as the
  // literal value — replace it verbatim if it matches a key.
  for (const [k, v] of Object.entries(subst)) {
    // Replace whole-word occurrences only
    const re = new RegExp(`\\b${k}\\b`, "g");
    value = value.replace(re, v);
  }
  return value;
}

/** Produce a compact XML-ish string for embedding in a comment */
function serializeNodeForComment(node: XmlNode): string {
  if (node.type === "text") return node.value;
  if (node.type === "comment") return `<!-- ${node.value} -->`;
  if (node.type === "pi") return `<?${node.value}?>`;
  const el = node as XmlElement;
  const attrs = Object.entries(el.attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  const open = attrs ? `<${el.tag} ${attrs}` : `<${el.tag}`;
  if (el.children.length === 0) return `${open} />`;
  const inner = el.children.map(serializeNodeForComment).join("");
  return `${open}>${inner}</${el.tag}>`;
}

/**
 * Render a <source> element into a <Source> JSX component.
 * The children (mal, al, adb, ks, urls, vgmdb) become typed props.
 */
function renderSource(
  el: XmlElement,
  ctx: ConvertContext,
  lines: string[],
): void {
  const pad = "  ".repeat(ctx.depth);
  const props: string[] = [];

  // Comments before/between source children become line comments
  const commentLines: string[] = [];

  for (const child of el.children) {
    if (child.type === "comment") {
      commentLines.push(`${pad}  ${renderComment(child.value)}`);
      continue;
    }
    if (child.type !== "element") continue;
    const c = child as XmlElement;

    switch (c.tag) {
      case "mal":
        props.push(`mal={${c.attrs["id"]}}`);
        break;
      case "al":
        props.push(`al={${c.attrs["id"]}}`);
        break;
      case "adb":
        props.push(`adb={${c.attrs["id"]}}`);
        break;
      case "ks":
        props.push(`ks={${c.attrs["id"]}}`);
        break;
      case "vgmdb": {
        const vAttrs = renderAttrs(c.attrs);
        props.push(
          `vgmdb={{ ${vAttrs.replace(/=/g, ": ").replace(/{/g, "").replace(/}/g, "")} }}`,
        );
        break;
      }
      case "urls": {
        // Render urls as a urls prop with an array of objects
        const urlItems: string[] = [];
        for (const urlChild of c.children) {
          if (urlChild.type !== "element") continue;
          const u = urlChild as XmlElement;
          if (u.tag !== "url") continue;
          const urlProps = Object.entries(u.attrs)
            .filter(([k, v]) => {
              if (k !== "generatedBy") return true;
              // Drop machine-generated; keep user-supplied
              return normalizeGeneratedBy(v) !== null;
            })
            .map(([k, v]) => `${k}: "${escapeAttr(v)}"`)
            .join(", ");
          urlItems.push(`{ ${urlProps} }`);
        }
        if (urlItems.length > 0) {
          props.push(`urls={[${urlItems.join(", ")}]}`);
        }
        break;
      }
      default:
        // Unknown source child — emit as comment
        commentLines.push(
          `${pad}  {/* unknown source child: ${serializeNodeForComment(c)} */}`,
        );
    }
  }

  // Build the <P.Source> component
  const attrsStr = props.join(" ");
  if (commentLines.length > 0) {
    lines.push(`${pad}<P.Source`);
    lines.push(`${pad}  ${attrsStr}`);
    lines.push(`${pad}/>`);
    lines.push(...commentLines);
  } else {
    if (attrsStr) {
      lines.push(`${pad}<P.Source ${attrsStr} />`);
    } else {
      lines.push(`${pad}<P.Source />`);
    }
  }
}

/**
 * Collect all <contributor> element children from a node list.
 * Also collects contributor elements that come from <ref name="..."> children
 * when those refs are to defs that only contain contributors (no-var defs).
 */
function collectContributors(
  children: XmlNode[],
  defs: Map<string, DefMacro>,
): XmlElement[] {
  const result: XmlElement[] = [];
  for (const n of children) {
    if (n.type !== "element") continue;
    const el = n as XmlElement;
    if (el.tag === "contributor") {
      result.push(el);
    } else if (el.tag === "ref") {
      // Inline ref body contributors if the def is simple (no script, no vars)
      const name = el.attrs["name"];
      if (!name) continue;
      const def = defs.get(name);
      if (def && !def.hasScript) {
        result.push(...collectContributors(def.body, defs));
      }
    }
  }
  return result;
}

/**
 * Collect non-contributor, non-comment, non-validatorSuppress children
 * that are "impact children" inside an impact element.
 */
function collectImpactChildren(children: XmlNode[]): XmlNode[] {
  return children.filter((n) => {
    if (n.type !== "element") return false;
    const el = n as XmlElement;
    return (
      el.tag !== "contributor" && el.tag !== "children" && el.tag !== "script"
    );
  });
}

/**
 * Render a generic leaf impact/relation element as a JSX component.
 * Handles optional <contributor> children and <validatorSuppress> children.
 */
function renderImpactOrRelation(
  el: XmlElement,
  ctx: ConvertContext,
  lines: string[],
  subst: Record<string, string>,
): void {
  const pad = "  ".repeat(ctx.depth);
  const component = toPascalCase(el.tag);

  // Collect contributors from children
  const contributors = collectContributors(el.children, ctx.defs);
  // Collect validatorSuppress children
  const suppressChildren = el.children.filter(
    (n): n is XmlElement =>
      n.type === "element" && (n as XmlElement).tag === "validatorSuppress",
  );
  // Collect other children (non-contributor, non-suppress, non-script, non-children-placeholder)
  const otherChildren = collectImpactChildren(el.children).filter(
    (n): n is XmlElement =>
      n.type === "element" && (n as XmlElement).tag !== "validatorSuppress",
  );

  // Build attrs with substitution applied
  const attrParts: string[] = [];
  for (const [k, v] of Object.entries(el.attrs)) {
    const resolved = applySubst(v, subst);
    // Drop machine-generated generatedBy; keep user-supplied ones as-is.
    if (k === "generatedBy") {
      if (normalizeGeneratedBy(resolved) === null) continue;
      // generatedBy="user" — keep it (fall through to formatProp below)
    }
    // Translate legacy ProgressStatus values to the current union.
    const value = k === "status" ? normalizeProgressStatus(resolved) : resolved;
    attrParts.push(formatProp(k, value));
  }

  const hasChildren =
    contributors.length > 0 ||
    suppressChildren.length > 0 ||
    otherChildren.length > 0;

  const attrsInline = attrParts.length > 0 ? ` ${attrParts.join(" ")}` : "";

  if (!hasChildren) {
    lines.push(`${pad}<P.${component}${attrsInline} />`);
    return;
  }

  // Has children — open tag, render children, close tag
  lines.push(`${pad}<P.${component}${attrsInline}>`);
  const innerCtx = { ...ctx, depth: ctx.depth + 1 };
  const innerPad = "  ".repeat(innerCtx.depth);

  // Emit <P.Contributor> children first
  for (const c of contributors) {
    lines.push(renderContributorChild(c, subst, innerPad));
  }

  for (const child of el.children) {
    if (child.type === "comment") {
      lines.push(`${innerPad}${renderComment(child.value)}`);
      continue;
    }
    if (child.type !== "element") continue;
    const childEl = child as XmlElement;
    if (
      childEl.tag === "contributor" ||
      childEl.tag === "children" ||
      childEl.tag === "script"
    )
      continue;
    renderNode(childEl, innerCtx, lines, subst, []);
  }
  lines.push(`${pad}</P.${component}>`);
}

/**
 * Render all nodes in a list, applying variable substitutions.
 * refChildren are the children supplied at the <ref> call site (for <children/> expansion).
 */
function renderNodes(
  nodes: XmlNode[],
  ctx: ConvertContext,
  lines: string[],
  subst: Record<string, string> = {},
  refChildren: XmlElement[] = [],
): void {
  for (const node of nodes) {
    if (node.type === "comment") {
      lines.push(`${"  ".repeat(ctx.depth)}${renderComment(node.value)}`);
      continue;
    }
    if (node.type === "pi" || node.type === "text") continue;
    renderNode(node as XmlElement, ctx, lines, subst, refChildren);
  }
}

/**
 * Render a single element node.
 */
function renderNode(
  el: XmlElement,
  ctx: ConvertContext,
  lines: string[],
  subst: Record<string, string>,
  refChildren: XmlElement[],
): void {
  const pad = "  ".repeat(ctx.depth);

  switch (el.tag) {
    // ---- Structural: skip at render time (handled by caller) ----
    case "document":
    case "include":
      return;

    // ---- Macro definition: register, don't emit ----
    case "def": {
      const name = el.attrs["name"] ?? "";
      const varsStr = el.attrs["vars"] ?? "";
      const vars = varsStr
        ? varsStr.split(",").map((v) => v.split(":")[0]!.trim())
        : [];
      const hasScript = containsScript(el.children);
      ctx.defs.set(name, { name, vars, body: el.children, hasScript });
      return;
    }

    // ---- Macro invocation ----
    case "ref": {
      renderRef(el, ctx, lines);
      return;
    }

    // ---- <children/> placeholder inside a def body ----
    case "children": {
      // Expand refChildren here
      renderNodes(refChildren, ctx, lines, subst, []);
      return;
    }

    // ---- <script>: skip (handled by def/TODO logic) ----
    case "script":
      return;

    // ---- Entry element: flatten nested entries ----
    case "entry": {
      renderEntry(el, ctx, lines, subst);
      return;
    }

    // ---- Source block ----
    case "source": {
      renderSource(el, ctx, lines);
      return;
    }

    // ---- Elements with only <contributor> children at doc level ----
    // These are impact/relation elements; contributors come through as a prop
    case "cry":
    case "pads":
    case "cryPADS":
    case "maxAEIPADS":
    case "aei":
    case "nei":
    case "ehi":
    case "epi":
    case "waifu":
    case "meme":
    case "additional":
    case "music":
    case "visual":
    case "writing":
    case "dropped":
    case "jumpscare":
    case "sleeplessNight":
    case "politics":
    case "featureMusic":
    case "remix":
    case "killedBy":
    case "osuSong":
    case "animeConsumedProgress":
    case "musicConsumedProgress":
    case "bestGirl":
    case "role":
    case "contains":
    case "validatorSuppress":
      renderImpactOrRelation(el, ctx, lines, subst);
      return;

    // ---- Unknown / passthrough: PascalCase with attrs ----
    default: {
      const component = toPascalCase(el.tag);
      // Apply subst to all attrs
      const attrParts: string[] = [];
      for (const [k, v] of Object.entries(el.attrs)) {
        const resolved = applySubst(v, subst);
        if (k === "generatedBy" && normalizeGeneratedBy(resolved) === null)
          continue;
        const value =
          k === "status" ? normalizeProgressStatus(resolved) : resolved;
        attrParts.push(formatProp(k, value));
      }
      const attrsStr = attrParts.join(" ");

      // Check if the element has meaningful children
      const meaningfulChildren = el.children.filter(
        (n) => n.type === "element" || n.type === "comment",
      );

      if (meaningfulChildren.length === 0) {
        lines.push(`${pad}<P.${component}${attrsStr ? " " + attrsStr : ""} />`);
        return;
      }

      lines.push(`${pad}<P.${component}${attrsStr ? " " + attrsStr : ""}>`);
      const innerCtx = { ...ctx, depth: ctx.depth + 1 };
      renderNodes(el.children, innerCtx, lines, subst, refChildren);
      lines.push(`${pad}</P.${component}>`);
      return;
    }
  }
}

/**
 * Render an <entry> element.
 * Handles:
 * - $-N ID resolution
 * - Nested <entry> elements: flattened to siblings (written to `lines` directly),
 *   and a <Contains> is emitted inside the parent.
 */
function renderEntry(
  el: XmlElement,
  ctx: ConvertContext,
  lines: string[],
  subst: Record<string, string>,
): void {
  const pad = "  ".repeat(ctx.depth);

  // Resolve entry id
  const rawId = applySubst(el.attrs["id"] ?? "", subst);
  const entryId = resolveId(rawId, ctx.entryStack);

  const attrsForEntry = { ...el.attrs, id: entryId };

  // Separate nested <entry> elements from other children
  const nestedEntries: XmlElement[] = [];
  const otherChildren: XmlNode[] = [];

  for (const child of el.children) {
    if (child.type === "element" && (child as XmlElement).tag === "entry") {
      nestedEntries.push(child as XmlElement);
    } else {
      otherChildren.push(child);
    }
  }

  // Push this entry's ID onto the stack for nested $-N resolution
  ctx.entryStack.push(entryId);

  // Pre-resolve nested entry IDs (needed for <Contains> props)
  const resolvedNestedIds: string[] = nestedEntries.map((ne) => {
    const rawNeId = applySubst(ne.attrs["id"] ?? "", subst);
    return resolveId(rawNeId, ctx.entryStack);
  });

  // Build the parent <Entry ...> open tag
  const attrParts: string[] = [];
  for (const [k, v] of Object.entries(attrsForEntry)) {
    attrParts.push(formatProp(k, applySubst(v, subst)));
  }

  const hasChildren =
    otherChildren.some((n) => n.type === "element" || n.type === "comment") ||
    resolvedNestedIds.length > 0;

  if (!hasChildren) {
    lines.push(`${pad}<P.Entry ${attrParts.join(" ")} />`);
    ctx.entryStack.pop();
    return;
  }

  lines.push(`${pad}<P.Entry ${attrParts.join(" ")}>`);
  const innerCtx = { ...ctx, depth: ctx.depth + 1 };
  const innerPad = "  ".repeat(innerCtx.depth);

  // Emit <P.Contains> for each nested entry
  for (const nestedId of resolvedNestedIds) {
    lines.push(`${innerPad}<P.Contains id="${escapeAttr(nestedId)}" />`);
  }

  // Emit non-entry children
  renderNodes(otherChildren, innerCtx, lines, subst, []);

  lines.push(`${pad}</P.Entry>`);

  // Emit the nested entries as siblings (after the parent closing tag) while
  // the parent ID is still on the stack, so $-N resolution inside those
  // nested entries (and their own children) can find the correct parent.
  for (const ne of nestedEntries) {
    renderEntry(ne, ctx, lines, subst);
  }

  ctx.entryStack.pop();
}

// ---------------------------------------------------------------------------
// File-level conversion
// ---------------------------------------------------------------------------

/**
 * Convert a single XML source string to a TSX fragment string.
 * Returns the lines that go inside the <Document>...</Document>.
 */
function convertXmlToTsxBody(xmlSrc: string, ctx: ConvertContext): string[] {
  const nodes = parseXml(xmlSrc);
  const lines: string[] = [];

  // The root element is <document>
  let docEl: XmlElement | undefined;
  for (const n of nodes) {
    if (n.type === "element" && (n as XmlElement).tag === "document") {
      docEl = n as XmlElement;
      break;
    }
  }

  if (!docEl) {
    // No <document> root — try to render all top-level elements directly
    renderNodes(nodes, ctx, lines);
    return lines;
  }

  // Process top-level comments before iterating children
  for (const child of docEl.children) {
    if (child.type === "comment") {
      lines.push(`${"  ".repeat(ctx.depth)}${renderComment(child.value)}`);
    } else if (child.type === "element") {
      const childEl = child as XmlElement;
      if (childEl.tag === "def") {
        // Register def without emitting
        renderNode(childEl, ctx, lines, {}, []);
      } else if (childEl.tag === "include") {
        // Include is handled at file level — skip here
      } else {
        renderNode(childEl, ctx, lines, {}, []);
      }
    }
  }

  return lines;
}

// ---------------------------------------------------------------------------
// Main: walk all XML files and generate TSX files
// ---------------------------------------------------------------------------

const REPO_ROOT = resolve(import.meta.dir, "..");
const XML_ROOT = join(REPO_ROOT, ".temp_third_party/nrs-impl/nrs");
const OUT_ROOT = join(REPO_ROOT, "packages/nrs-impl/nrs");

const ALL_XML_FILES = [
  "NRSImplMain.xml",
  ...["franchises", "seasonal", "meme"].flatMap((dir) => {
    try {
      const entries = Bun.env; // unused — just ensuring bun context
      const files = require("fs").readdirSync(join(XML_ROOT, dir)) as string[];
      return files
        .filter((f: string) => f.endsWith(".xml"))
        .map((f: string) => `${dir}/${f}`);
    } catch {
      return [];
    }
  }),
];

// Global defs context shared across all files (defs with visibility="public"
// are globally accessible once defined in any file)
const globalCtx: ConvertContext = {
  defs: new Map(),
  depth: 2, // inside <Document>
  entryStack: [],
};

// We need to do two passes:
// 1. First pass: register all defs from all files
// 2. Second pass: generate TSX with all defs available

// Pass 1: register all defs
console.log("Pass 1: registering macros...");
for (const relPath of ALL_XML_FILES) {
  const xmlPath = join(XML_ROOT, relPath);
  if (!existsSync(xmlPath)) {
    console.warn(`  SKIP (not found): ${relPath}`);
    continue;
  }
  const src = readFileSync(xmlPath, "utf-8");
  const nodes = parseXml(src);
  let docEl: XmlElement | undefined;
  for (const n of nodes) {
    if (n.type === "element" && (n as XmlElement).tag === "document") {
      docEl = n as XmlElement;
      break;
    }
  }
  if (!docEl) continue;
  for (const child of docEl.children) {
    if (child.type === "element" && (child as XmlElement).tag === "def") {
      const defEl = child as XmlElement;
      const name = defEl.attrs["name"] ?? "";
      const varsStr = defEl.attrs["vars"] ?? "";
      const vars = varsStr
        ? varsStr.split(",").map((v) => v.split(":")[0]!.trim())
        : [];
      const hasScript = containsScript(defEl.children);
      globalCtx.defs.set(name, {
        name,
        vars,
        body: defEl.children,
        hasScript,
      });
    }
  }
}
console.log(`  Registered ${globalCtx.defs.size} macros.`);

// Pass 2: generate TSX files
console.log("Pass 2: generating TSX files...");

function generateTsxFile(relXmlPath: string): string {
  const xmlPath = join(XML_ROOT, relXmlPath);
  const src = readFileSync(xmlPath, "utf-8");

  const fileCtx: ConvertContext = {
    defs: globalCtx.defs, // share the global def registry
    depth: 2,
    entryStack: [],
  };

  const bodyLines = convertXmlToTsxBody(src, fileCtx);

  // Compute relative path to prelude.ts from the output file's directory.
  // relXmlPath is like "franchises/Foo.xml" or "NRSImplMain.xml".
  // prelude.ts lives at the root of the nrs/ output directory.
  const depth = relXmlPath.split("/").length - 1; // 0 for root, 1 for subdirs
  const prelPath = depth === 0 ? "./prelude" : "../".repeat(depth) + "prelude";

  const lines: string[] = [];
  lines.push(`/** @jsxImportSource @nrs-org/nrsx */`);
  lines.push(``);
  lines.push(`import * as P from "${prelPath}";`);
  lines.push(``);
  lines.push("export default (");
  lines.push("  <P.Document>");
  lines.push(...bodyLines);
  lines.push("  </P.Document>");
  lines.push(");");

  return lines.join("\n");
}

for (const relPath of ALL_XML_FILES) {
  const xmlPath = join(XML_ROOT, relPath);
  if (!existsSync(xmlPath)) continue;

  const relTsxPath = relPath.replace(/\.xml$/, ".tsx");
  const outPath = join(OUT_ROOT, relTsxPath);

  mkdirSync(dirname(outPath), { recursive: true });

  try {
    const tsx = generateTsxFile(relPath);
    writeFileSync(outPath, tsx, "utf-8");
    console.log(`  OK: ${relTsxPath}`);
  } catch (err) {
    console.error(`  ERROR: ${relPath}: ${err}`);
  }
}

console.log("Done.");
