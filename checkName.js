const fs = require('fs');

module.exports = function checkName(projectName) {
  return new Promise((resolve, reject) => {
    fs.readdir(process.cwd(), (err, data) => {
      if (err) {
        return reject(err);
      }
      if (data.includes(projectName)) {
        return reject(new Error(`${projectName} already exists!`));
      }
      resolve();
    });
  });
};
