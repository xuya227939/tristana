// lib/Generator.js

const ora = require("ora");
const path = require("path");
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs-extra");
const downloadGitRepo = require("download-git-repo");
const chalk = require("chalk");
const handlebars = require("handlebars");

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail("Request failed, refetch ...");
  }
}

class Generator {
  constructor(name, targetDir, description, author) {
    this.name = name;
    this.targetDir = targetDir;
    this.description = description;
    this.author = author;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async getRepo() {
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: [
        {
          name: "js",
          value: "js",
        },
        {
          name: "snowpack",
          value: "snowpack",
        },
        {
          name: "vite",
          value: "vite",
        },
        {
          name: "webpack5",
          value: "webpack5",
        },
        {
          name: "取消",
          value: false,
        },
      ],
      message: "请选择模板",
    });

    return repo;
  }

  async download(repo) {
    const requestUrl = `xuya227939/tristana/#/${repo}`;

    await wrapLoading(
      this.downloadGitRepo,
      "正在从远端拉取模板，请稍等...",
      requestUrl,
      path.resolve(process.cwd(), this.targetDir)
    );
  }

  async removeGit() {
    console.log("Initialized empty Git repository");
  }

  async create() {
    const repo = await this.getRepo();
    if (!repo) return;

    await this.download(repo);

    const fileName = `${this.name}/package.json`;
    const meta = {
      name: this.name,
      description: this.description,
      author: this.author,
    };
    if (fs.existsSync(fileName)) {
      const content = fs.readFileSync(fileName).toString();
      const result = handlebars.compile(content)(meta);
      fs.writeFileSync(fileName, result);
    }

    await this.removeGit();

    console.log(chalk.green(`创建项目 ${this.name} 🍬 成功！`));
    console.log(chalk.green(`cd ${this.name}`));
    console.log(chalk.green(`npm i || yarn`));
    console.log(chalk.green("npm run start"));
  }
}

module.exports = Generator;
