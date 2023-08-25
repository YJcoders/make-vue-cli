#! /usr/bin/env node

import { Command } from "commander";
import pkg from "../package.json" assert { type: "json" };
import create from "../lib/create.js";

const program = new Command();
program
  .name("make-vue")
  .version(pkg.version, "-v, --version", "查看版本")
  .option("-l, --list", "查看Vue模板列表") // 帮助命令提示
  .usage("<command> [option]"); // 修改查看帮助时的首行提示

program
  .command("create")
  .description("创建Vue项目")
  .action((name = "vue-project") => {
    create(name);
  });

program.parse();
