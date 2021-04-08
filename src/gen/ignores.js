module.exports = async () => [
  /\.CodeMirror/,
  /\.cm-/, // CodeMirror
  /\.pl-/, // GitHub Pretty Lights Syntax highlighter
  /^\.CircleBadge$/,
  /^\.CircleBadge--github::after$/,
  /:(before|after).+/, // invalid pseudo-elements, they must come last in a chain of
  /:not\(li\.moved\)/, // invalid :not content (not a simple selector)
  /&\[open\]/, // invalid css from gitako
  /^.Header$/,
  /^.bg-gray-dark$/,
  /^hr$/,
  /^\.stars[0-9]*(::after)?$/, // seems to change a lot
  /.qr-code/, // must not invert qr codes
];
