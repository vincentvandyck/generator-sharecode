#Working with this generator
##Description
A yeoman generator to create a project that allows you to work on js and css files locally and immediately upload them to a SharePoint library for testing and developping the solution.
##Usage

###Installation
make sure you have node and npm installed on your system, you can use ```node -v``` & ```npm -v``` to check the installation.
 
 ```npm i -g gulp yo```
install gulp and yeoman globally
 ```yo sharecode```
start scaffolding the current directory

###Gulp Commands

 ```gulp styles```
minify all the css files in src/css and copy them to dist/

 ```gulp scripts```
concat, minify and ulgify al the js files in src/js and place the output file in dist/

 ```gulp upload-styles-dev```
execute the style task and upload all dist/*.css files to SharePoint

 ```gulp upload-scipts-dev```
execute the script task and upload all dist/*.js files to SharPoint


 ```gulp upload-dev```
execute both the script and style task and upload all files in the dist/ folder to SharePoint


 ```gulp clean```
Clear the content of the dist folder


 ```gulp lint-scripts```
Run a preconfigured eslinter over the javascript files in the src/js folder


 ```gulp watch-dev```
watch dist/css & dist/js for changes and on a change, the appropriate build and upload task will run


 ```gulp (default)```
execute the upload-dev task and start the watch-dev task


 ```gulp upload-styles-dist```
execute the style task and upload all dist/*.css files to SharePoint


 ```gulp upload-scipts-dist```
execute the script task and upload all dist/*.js files to SharPoint


 ```gulp upload-dist```
execute both the script and style task and upload all files in the dist/ folder to SharePoint
