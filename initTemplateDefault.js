const chalk = require("chalk");
const checkName = require("./checkName")
const downloadTemplate = require("./downloadTemplate");
const changeTemplate = require("./changeTemplate")

module.exports = async function initTemplateDefault(customContent, gitUrl) {
  console.log(
    chalk.bold.cyan("CosenCli: ") + "will creating a new project starter"
  );
  const { projectName = "" } = customContent;

  try {
    await checkName(projectName);
    await downloadTemplate(gitUrl, projectName);
    await changeTemplate(customContent);

    console.log(chalk.green("template download completed"));
    console.log(
      chalk.bold.cyan("CosenCli: ") + "a new project starter is created"
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
};
