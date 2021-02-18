const path = require('path');
const fs = require('fs');

module.exports = async function changeTemplate(customContent) {
  // name description author
  const {projectName = '', description = '', author = ''} = customContent;
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(process.cwd(), projectName, 'package.json'),
      'utf8',
      (err, data) => {
        if (err) {
          return reject(err);
        }
        let packageContent = JSON.parse(data);
        packageContent.name = projectName;
        packageContent.author = author;
        packageContent.description = description;
        fs.writeFile(
          path.resolve(process.cwd(), projectName, 'package.json'),
          JSON.stringify(packageContent, null, 2),
          'utf8',
          (err, data) => {
            if (err) {
              return reject(err);
            }
            resolve();
          }
        );
      }
    );
  });
};
