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
        name: 'Project Name',
        message: 'The name of the project you are working on.',
      },
      {
        type: 'input',
        name: 'SharePoint library URL',
        message: 'The full URL of the library you want to upload the files to.',
      },
      {
        type: 'input',
        name: 'SharePoint Username',
        message: 'Your SharePoint username.'
      },
      {
        type: 'password',
        name: 'SharePoint Password',
        message: 'Your SharePoint password. (it will not be displayed)',
      }
      ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
