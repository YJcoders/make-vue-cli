const ora = require("ora");
const chalk = require("chalk");
const { promisify } = require("util");
const templateList = require("./template");

const downloadRepo = async (templateName, projectName) => {
  const spinner = ora("正在加载...").start();
  const { downloadUrl } = templateList[templateName];
  if (downloadUrl) {
    const download = promisify(require("download-git-repo"));
    await download(downloadUrl, projectName);
    spinner.color = "green";
    spinner.text = "🎉🎉🎉🎉🎉 模板下载成功";
    spinner.succeed();
    console.log(
      chalk.blueBright(` cd ${projectName}`) + "\n",
      chalk.blueBright("npm install")
    );
  } else {
    spinner.color = "red";
    spinner.text = "模板中没有配置对应项目仓库，请先配置";
  }
};

module.exports = downloadRepo;
