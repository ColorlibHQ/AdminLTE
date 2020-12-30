// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../../addon/mode/simple"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineSimpleMode('wast', {
  start: [
    {regex: /[+\-]?(?:nan(?::0x[0-9a-fA-F]+)?|infinity|inf|0x[0-9a-fA-F]+\.?[0-9a-fA-F]*p[+\/-]?\d+|\d+(?:\.\d*)?[eE][+\-]?\d*|\d+\.\d*|0x[0-9a-fA-F]+|\d+)/, token: "number"},
    {regex: /mut|nop|block|if|then|else|loop|br_if|br_table|br|call(_indirect)?|drop|end|return(_call(_indirect)?)?|local\.(get|set|tee)|global\.(get|set)|i(32|64)\.(store(8|16)|(load(8|16)_[su]))|i64\.(load32_[su]|store32)|[fi](32|64)\.(const|load|store)|f(32|64)\.(abs|add|ceil|copysign|div|eq|floor|[gl][et]|max|min|mul|nearest|neg?|sqrt|sub|trunc)|i(32|64)\.(a[dn]d|c[lt]z|(div|rem)_[su]|eqz?|[gl][te]_[su]|mul|ne|popcnt|rot[lr]|sh(l|r_[su])|sub|x?or)|i64\.extend_[su]_i32|i32\.wrap_i64|i(32|64)\.trunc_f(32|64)_[su]|f(32|64)\.convert_i(32|64)_[su]|f64\.promote_f32|f32\.demote_f64|f32\.reinterpret_i32|i32\.reinterpret_f32|f64\.reinterpret_i64|i64\.reinterpret_f64|select|unreachable|current_memory|memory(\.((atomic\.(notify|wait(32|64)))|grow|size))?|type|\bfunc\b|param|result|local|global|module|start|elem|data|align|offset|import|export|i64\.atomic\.(load32_u|store32|rmw32\.(a[dn]d|sub|x?or|(cmp)?xchg)_u)|i(32|64)\.atomic\.(load((8|16)_u)?|store(8|16)?|rmw(\.(a[dn]d|sub|x?or|(cmp)?xchg)|(8|16)\.(a[dn]d|sub|x?or|(cmp)?xchg)_u))|v128\.(load|store|const|not|andnot|and|or|xor|bitselect)|i(8x16|16x8|32x4|64x2)\.(shl|shr_[su])|i(8x16|16x8)\.(extract_lane_[su]|((add|sub)_saturate_[su])|avgr_u)|(i(8x16|16x8|32x4|64x2)|f(32x4|64x2))\.(splat|replace_lane|neg|add|sub)|i(8x16|16x8|32x4)\.(eq|ne|([lg][te]_[su])|abs|any_true|all_true|bitmask|((min|max)_[su]))|f(32x4|64x2)\.(eq|ne|[lg][te]|abs|sqrt|mul|div|min|max)|[fi](32x4|64x2)\.extract_lane|v8x16\.(shuffle|swizzle)|i16x8\.(load8x8_[su]|narrow_i32x4_[su]|widen_(low|high)_i8x16_[su]|mul)|i32x4\.(load16x4_[su]|widen_(low|high)_i16x8_[su]|mul|trunc_sat_f32x4_[su])|i64x2\.(load32x2_[su]|mul)|(v(8x16|16x8|32x4|64x2)\.load_splat)|i8x16\.narrow_i16x8_[su]|f32x4\.convert_i32x4_[su]|ref\.(func|(is_)?null)|\bextern\b|table(\.(size|get|set|size|grow|fill|init|copy))?/, token: "keyword"},
    {regex: /\b(funcref|externref|[fi](32|64))\b/, token: "atom"},
    {regex: /\$([a-zA-Z0-9_`\+\-\*\/\\\^~=<>!\?@#$%&|:\.]+)/, token: "variable-2"},
    {regex: /"(?:[^"\\\x00-\x1f\x7f]|\\[nt\\'"]|\\[0-9a-fA-F][0-9a-fA-F])*"/, token: "string"},
    {regex: /\(;.*?/, token: "comment", next: "comment"},
    {regex: /;;.*$/, token: "comment"},
    {regex: /\(/, indent: true},
    {regex: /\)/, dedent: true},
  ],

  comment: [
    {regex: /.*?;\)/, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"},
  ],

  meta: {
    dontIndentStates: ['comment'],
  },
});

// https://github.com/WebAssembly/design/issues/981 mentions text/webassembly,
// which seems like a reasonable choice, although it's not standard right now.
CodeMirror.defineMIME("text/webassembly", "wast");

});
