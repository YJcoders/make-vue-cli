import fs from "fs";
import path from "path";
import inquirer from "inquirer";
// import download from "download.js";

// 判断目录是否存在
const isExistDir = (dir) => {
  return fs.existsSync(dir) && fs.readdirSync(dir)(dir).length > 0;
};
// 删除目录
const deleteDir = (dir, dirCallback, fileCallback) => {
  for (const file of fs.readdirSync(dir)) {
    const filepath = path.resolve(dir, file);
    if (fs.lstatSync(filepath).isDirectory()) {
      deleteDir(filepath);
    } else {
      fs.unlinkSync(filepath);
    }
  }
};

const create = (name) => {
  console.log(name);
  const question = [
    {
      name: "name",
      type: "input",
      message: "项目名称",
      default: "vue-project",
    },
    {
      name: "overwrite",
      type: "confirm",
      message: (prev) => {
        return `此目录下已存在 ${prev.name} 项目，是否要移出并重新创建？`;
      },
      when: (prev) => {
        // 当重名时，提示
        if (isExistDir(prev.name)) return true;
        return false;
      },
    },
    {
      name: "overwriteCheck",
      type: null,
      when: (prev) => {
        if (isExistDir(prev.name)) {
          // 重新创建，继续下一步
          if (prev.overwrite) return false;
          // 取消创建，退出
          throw new Error("operation cancelled");
        }
        return false;
      },
    },
    {
      name: "type",
      type: "list",
      message: "请选择创建版本",
      default: "Vue3",
      choices: [
        { name: "Vue3.x", value: "Vue3" },
        { name: "Vue2.x", value: "Vue2" },
      ],
    },
    // {
    //   name: "confirm",
    //   type: "confirm",
    //   message: "确定创建?",
    // },
  ];
  // inquirer 交互式命令
  inquirer
    .prompt(question)
    .then((answers) => {
      console.log(answers);
      // 获取交互完成之后的，用户所选择的值
      const { name, type, overwrite } = answers;

      if (overwrite) {
        // 清空已有重名文件
        const dir = path.join(process.cwd(), name);
        deleteDir(dir);
      }
      console.log(name, type, overwrite, 11111);
      fs.mkdir("q");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default create;
