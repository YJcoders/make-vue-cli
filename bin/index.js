#! /usr/bin/env node
const { Command } = require("commander");
const chalk = require("chalk");
const pkg = require("../package.json");
const create = require("../lib/create.js");

const program = new Command();
program
  .name("make-vue")
  .version(pkg.version, "-v, --version", "查看版本")
  .option("-l, --list", "查看Vue模板列表") // 命令选项
  .option("create [project-name]", "创建Vue项目") // 命令选项
  .usage("<command> [option]") // 定义 查看帮助时的首行提示
  .parse();

// 展示 模板列表
const options = program.opts();
if (options.list) {
  console.log(
    chalk.green("模板列表：") + "\n",
    chalk.cyanBright("Vue3 + Vite + Antd") + "\n",
    chalk.blueBright("Vue2 + webpack5 + Element")
  );
  return;
}
// command("create <project-name>") <> 表示参数必填，[] 表示可选项
program
  .command("create [project-name]")
  .description("创建Vue项目")
  .action((name = "vue-project") => {
    create(name);
  });

// 报错后，的追加提示
program.showHelpAfterError("(使用  make-vue -h 查看多使用方法)");

program.parse();
