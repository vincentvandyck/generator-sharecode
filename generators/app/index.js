'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    var done = this.async()
    this.log(yosay(
      'Welcome to the ' + chalk.red('ShareCode Generator') + '!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'project',
        message: 'The name of the project you are working on.',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
      },
      {
        type: 'input',
        name: 'url',
        message: 'The full URL of the library you want to upload the files to.',
      },
      {
        type: 'input',
        name: 'username',
        message: 'Your SharePoint username.'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Your SharePoint password.',
      }
      ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    //Copy configuration files
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        project:this.props.project
      }
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copyTpl(
      this.templatePath('settings.js'),
      this.destinationPath('settings.js'),
      {
        username:this.props.username,
        password:this.props.password,
        url:this.props.url
      }
    )
    //Copy src files
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );
  },
  //Install dependencies
  install: function () {
    this.installDependencies();
  }
});
