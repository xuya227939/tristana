#! /usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
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
  });

program.on("--help", () => {
  // 使用 figlet 绘制 Logo
  console.log("\r\n" + figlet.textSync("Tristana"));
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`);
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
