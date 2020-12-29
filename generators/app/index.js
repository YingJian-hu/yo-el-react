var Generator = require('yeoman-generator');

module.exports = class extends Generator {};

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
    }

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

    initPackage() {
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
      this.npmInstall(['react', 'react-dom'], {'save-dev': false});
      this.npmInstall(['@babel/core', 'babel-loader', '@babel/preset-react', '@babel/preset-env', 'css-loader', 'extract-text-webpack-plugin@next', 'html-webpack-plugin', 'webpack'], {'save-dev': true})
    }
    
    async copyFiles() {
      //  webpack.config.js
      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'),
      )

      //  .gitignore
      this.fs.copyTpl(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore'),
      )

      //  index.jsx
      this.fs.copyTpl(
        this.templatePath('./app/build/index.jsx'),
        this.destinationPath('/app/build/index.jsx'),
      )

      //  main.less
      this.fs.copyTpl(
        this.templatePath('./app/build/style/main.less'),
        this.destinationPath('/app/build/style/main.less'),
      )

       //  index.html
       this.fs.copyTpl(
        this.templatePath('./app/build/views/index.html'),
        this.destinationPath('/app/build/views/index.html'),
        { title: this.answers.name }
      );
    }
  };