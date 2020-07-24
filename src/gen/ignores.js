module.exports.ignores = [
  /\.CodeMirror/,
  /\.cm-/, // CodeMirror
  /\.pl-/, // GitHub Pretty Lights Syntax highlighter
  /^h[1-6] a$/, // conflicting styles from docs.github.com
  /^\.CircleBadge$/,
  /^\.CircleBadge--github::after$/,
  /^table$/,
  /^.markdown-body del$/, // this in not main page style
  /:(before|after).+/, // invalid pseudo-elements, they must come last in a chain of
  /:not\(li\.moved\)/, // invalid :not content (not a simple selector)
];
