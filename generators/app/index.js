var Generator = require('yeoman-generator');

module.exports = class extends Generator {};

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
    }

    //  获取当前项目状态，获取基本配置参数等
    initianlizing() {
      const pkgJson = {
        "name": this.answers.name,
        "version": "1.0.0",
        "description": this.answers.description,
        "scripts": {
          "dev": "webpack -w",
        },
        "devDependencies": {

        },
        "dependencies": {

        }
      };
  
      // Extend or create package.json file in destination path
      this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }

    //  向用户展示交互式问题收集关键参数
    async prompting() {
      this.answers = await this.prompt([
        {
          type: "input",
          name: "name",
          message: "Your project name",
          default: this.appname
        }
      ])
    };

    //  保存配置相关信息且生成配置文件（名称多为'.'开头的配置文件）  
    configuring() {
      this.fs.copyTpl(
        this.sourceRoot(),
        this.destinationRoot(),
        { appname: this.answers.name }
      )
    }

    //  未匹配任何生命周期方法的非私有方法均在此环节*自动*执行
    default() {}

    //  依据模板进行新项目结构的写操作
    writing() {
      var htmlTpl = this.fs.read(this.templatePath('./app/build/views/index.html'));
      this.fs.write(this.destinationPath('./app/build/views/index.html'), htmlTpl.replace(/&lt/g, '<').replace(/&gt/g, '>'));
    }

    //  依赖安装
    install() {
      this.npmInstall(['react', 'react-dom'], {'save-dev': false});
      this.npmInstall(['@babel/core', 'babel-loader', '@babel/preset-react', '@babel/preset-env', 'css-loader@3.4.2', 'style-loader', 'extract-text-webpack-plugin@next', 'html-webpack-plugin', 'webpack@4.1.0', 'webpack-cli'], {'save-dev': true})
    }

    //  结束动作，如清屏，输出结束信息等
    end() {}
  };