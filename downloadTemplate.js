
const path = require("path");
const ora = require("ora");
const download = require("download-git-repo");

module.exports = function downloadTemplate(gitUrl, projectName) {
  const spinner = ora("download template......").start();

  return new Promise((resolve, reject) => {
    download(
      gitUrl,
      path.resolve(process.cwd(), projectName),
      { clone: true },
      function (err) {
        if (err) {
          return reject(err);
          spinner.fail(); // 下载失败提示
        }
        spinner.succeed(); // 下载成功提示
        resolve();
      }
    );
  });
};
