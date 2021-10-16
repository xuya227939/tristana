// lib/create.js

const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const Generator = require("./generator");

function createFolder(name, targetAir) {
  console.log(
    "Tristana " + chalk.green(`v${require("../package.json").version}`)
  );
  console.log();
  console.log(chalk.green("Tristana 即将创建一个新项目 !"));
  console.log(
    "Need Help? Go and open issue: https://github.com/xuya227939/tristana/issues/new"
  );

  // 使用 figlet 绘制 Logo
  console.log("\r\n" + figlet.textSync("Tristana"));

  inquirer
    .prompt([
      {
        name: "description",
        message: "请输入项目描述!",
      },
      {
        name: "author",
        message: "请输入作者",
      },
    ])
    .then((answers) => {
      // 创建项目
      const generator = new Generator(
        name,
        targetAir,
        answers.description,
        answers.author
      );
      // 开始创建项目
      generator.create();
    });
}

module.exports = async function (name, options) {
  const cwd = process.cwd();
  const targetAir = path.join(cwd, name);
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "目录已存在，请选择以下操作:",
          choices: [
            {
              name: "Overwrite",
              value: "overwrite",
            },
            {
              name: "取消",
              value: false,
            },
          ],
        },
      ]);

      if (!action) {
        return;
      } else if (action === "overwrite") {
        console.log(`Removing...`);
        await fs.remove(targetAir);

        createFolder(name, targetAir);
      }
    }
  } else {
    createFolder(name, targetAir);
  }
};
