const chalk = require('chalk');
const checkName = require('./checkName');
const downloadTemplate = require('./downloadTemplate');
const changeTemplate = require('./changeTemplate');

module.exports = async function initTemplateDefault(customContent, gitUrl) {
  console.log(chalk.bold.cyan('jsshiCli: ') + '将开始创建一个新的项目模板');
  const {projectName = ''} = customContent;

  try {
    await checkName(projectName);
    await downloadTemplate(gitUrl, projectName);
    await changeTemplate(customContent);

    console.log(chalk.green('模板下载完成'));
    console.log(chalk.bold.cyan('jsshiCli: ') + '一个新的项目模板已经被创建');
  } catch (error) {
    console.log(chalk.red(error));
  }
};
