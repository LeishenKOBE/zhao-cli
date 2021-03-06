#!/usr/bin/env node

// 使用Node开发命令行工具所执行的JavaScript脚本必须在顶部加入 #!/usr/bin/env node 声明
const program = require('commander');
const packageData = require('./package.json');
const inquirer = require('inquirer');
const initTemplateDefault = require('./initTemplateDefault');

const templates = {
  'js-webpack': {
    url: 'https://bitbucket.org/shidongzhao/my-simple-repo',
    downloadUrl: 'https://github.com:LeishenKOBE/js-webpack-simple#master',
    description: '调试代码的模板',
  },
  'vue3-webpack5': {
    url: 'https://bitbucket.org/shidongzhao/my-simple-repo',
    downloadUrl:
      'https://bitbucket.org:shidongzhao/my-simple-repo#vue3-webpack5',
    description: 'Webpack5和Vue3模板',
  },
  'vue-module': {
    url: 'https://github.com/pdsuwwz/nzoth',
    downloadUrl: 'https://github.com:pdsuwwz/nzoth#main',
    description: 'vue组件库模板',
  },
  'vite-vue': {
    url: 'https://bitbucket.org/shidongzhao/my-simple-repo',
    downloadUrl: 'https://bitbucket.org:shidongzhao/my-simple-repo#vite-module',
    description: '尤大神的vite模板',
  },
  'vite-js': {
    url: 'https://bitbucket.org/shidongzhao/my-simple-repo',
    downloadUrl: 'https://bitbucket.org:shidongzhao/my-simple-repo#vite-js',
    description: '简单的vite开发js模板',
  },
  'vite-vue2': {
    url: 'https://bitbucket.org/shidongzhao/my-simple-repo',
    downloadUrl: 'https://bitbucket.org:shidongzhao/my-simple-repo#vite-vue2',
    description: 'vue2版本的vite环境',
  },
  'vue-plugin': {
    url: 'https://bitbucket.org/shidongzhao/my-simple-repo',
    downloadUrl: 'https://bitbucket.org:shidongzhao/my-simple-repo#vue-plugin',
    description: 'vue2插件模板',
  },
  'vite-svelte': {
    url: 'https://bitbucket.org/shidongzhao/my-simple-repo',
    downloadUrl: 'https://bitbucket.org:shidongzhao/my-simple-repo#vite-svelte',
    description: 'vite-svelte模板',
  },
};
program
  .version(packageData.version)
  .option('-i, --init', '初始化项目')
  .option('-V, --version', '查看版本号信息')
  .option('-l, --list', '查看可用模版列表');
program.parse(process.argv);

if (program.opts() && program.opts().init) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称',
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入项目简介',
      },
      {
        type: 'input',
        name: 'author',
        message: '请输入作者名称',
      },
      {
        type: 'list',
        name: 'template',
        message: '选择其中一个作为项目模版',
        choices: [
          'js-webpack (简单js开发模板)',
          'vue3-webpack5 模板',
          'vue-module 组件库模板',
          'vite-vue 模板',
          'vite-js 模板',
          'vite-vue2 模板',
          'vue-plugin 插件模板',
          'vite-svelte 模板',
        ],
      },
    ])
    .then((answers) => {
      // 把采集到的用户输入的数据解析替换到 package.json 文件中
      let url = templates[answers.template.split(' ')[0]].downloadUrl;
      initTemplateDefault(answers, url);
    });
}

if (program.opts() && program.opts().list) {
  // 查看可用模版列表
  for (let key in templates) {
    console.log(`${key} : ${templates[key].description}`);
  }
}
