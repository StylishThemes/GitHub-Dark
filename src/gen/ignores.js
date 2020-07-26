module.exports.ignores = [
  /\.CodeMirror/,
  /\.cm-/, // CodeMirror
  /\.pl-/, // GitHub Pretty Lights Syntax highlighter
  /^\.CircleBadge$/,
  /^\.CircleBadge--github::after$/,
  /:(before|after).+/, // invalid pseudo-elements, they must come last in a chain of
  /:not\(li\.moved\)/, // invalid :not content (not a simple selector)
];
