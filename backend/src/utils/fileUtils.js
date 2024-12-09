const fs = require('fs').promises;

exports.ensureDirExists = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};
