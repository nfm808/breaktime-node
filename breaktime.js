// load our dependencies
const chalk = require('chalk')
const inquirer = require('inquirer');
const figlet = require('figlet');
const open = require('open');
const fs = require('fs');

// reads the assets folder
function readAssets() {
  const assets = [];
  // reads the contents of the assets/ directory
  // and pushes the contents to the assets array
  fs.readdirSync('assets/', {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => assets.push(item.name.toString()));
  filterMediaTypes(assets);
}

// validates the media types in the assets
// folder
function filterMediaTypes(assets) {
  const validExt =  [
    '.gif', '.jpg', '.jpeg',
    '.png', '.mp3', '.mp4', 
    '.wma', '.mpg', '.mpeg', 
    '.avi', '.mp4'
  ]
  const validExtStr = new RegExp("(" + validExt.join("|") + ")" + "$");
  let isValid =  false;
  for (let i = 0; i < assets.length; i++) {
    if (!validExtStr.test(i)) {
      isValid = false;
    }
    else isValid = true;
  }  
  if(isValid) {
    return console.log(`assets may only be one of: 
    '.gif', '.jpg', '.jpeg',
    '.png', '.mp3', '.mp4', 
    '.wma', '.mpg', '.mpeg', 
    '.avi', '.mp4'`)
  };
  createBanner(assets);
}

// creates the console title text
function createBanner(assets) {
  figlet.text('Breaktime!', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, function(err, data) {
    if (err) {
      console.log('Well that did not work');
      return;
    }
    console.log(data);
  })
  createUserPrompt(assets);
}

function createUserPrompt(assets) {
  // prompts the user for how long they would like
  // between breaks.  timeout is to sync the prompt
  // with figlet. 
  setTimeout(() => { 
  inquirer
    .prompt([
      {
        type: 'number',
        message: chalk.magenta('How many minutes between breaks?'),
        name: 'time',
      }
    ])
    .then(answers => {
      breakTime(answers.time, 1, assets);
    });
  }, 100);
}

// creates a loop to randomly select one of the assets
// in the assets directory to be displayed by whatever
// os the user is using
function breakTime(num, interval, assets) {
  const delay = 1000 * 60 * num;
  setTimeout(() => {
    (async () => {
      await open(`./assets/${assets[Math.floor(Math.random() * assets.length)]}`, {wait: true});
      console.log(`Break Interval: ${interval}`);
      breakTime(num, interval + 1, assets);
    })();
  }, delay);
};

readAssets();