#! /usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
// const ora = require("ora");
const figlet = require("figlet");

program
  .version(`${require("../package.json").version}`)
  .command("init <name>")
  .description("init a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .option("-v, --version", `${require("../package.json").version}`)
  .usage("<command> [option]")
  .action((name, options) => {
    require("../lib/create.js")(name, options);
    // console.log(
    //   "Tristana " + chalk.green(`v${require("../package.json").version}`)
    // );
    // console.log();
    // // 打印命令行输入的值
    // console.log(chalk.green("Tristana即将创建一个新项目 !"));
    // console.log(
    //   "Need Help? Go and open issue: https://github.com/xuya227939/tristana/issues/new"
    // );
  });

program
  // 监听 --help 执行
  .on("--help", () => {
    // 使用 figlet 绘制 Logo
    console.log(
      "\r\n" +
        // figlet.textSync("React", {
        //   font: "Ghost",
        //   horizontalLayout: "default",
        //   verticalLayout: "default",
        //   width: 80,
        //   whitespaceBreak: true,
        // })
        figlet.textSync("React")
    );
    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`
    );
  });

// program
//   .command("-v")
//   .description("output the version number")
//   .option("-v, --version", `${require("../package.json").version}`)
//   .usage("<command> [option]")
//   .action((option) => {
//     console.log(
//       "Tristana " + chalk.green(`v${require("../package.json").version}`)
//     );
//   });

program.parse();
