const argv = require('yargs').argv;

//Setting up global variables
global.appBase = __dirname;
global.RUN_MODE = argv.mode ? argv.mode.toLowerCase() : null;

module.exports = () => {
  //Handling main configuration for different running modes
  let config;
  if(!global.RUN_MODE || global.RUN_MODE == "p" || global.RUN_MODE == "prod" || global.RUN_MODE == "production"){
    config = require("../configs/config.json");
  } else if(global.RUN_MODE == "d" || global.RUN_MODE == "dev" || global.RUN_MODE == "development"){
    config = require("../configs/config-dev.json");
  } else {
    console.error("Wrong running mode name!");
    process.exit();
  }
  return config;
}