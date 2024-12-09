exports.toCamelCase = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

exports.removeCodeBlockMarkers = (code) => {
  return code.split('\n')
    .filter(line => !line.startsWith('```'))
    .join('\n')
    .trim();
};
