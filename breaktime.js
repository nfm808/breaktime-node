// load our dependencies
const chalk = require('chalk')
const inquirer = require('inquirer');
const figlet = require('figlet');
const open = require('open');
const fs = require('fs');

// used to store the assets for use
const assets = [];

// reads the contents of the assets/ directory
// and pushes the contents to the assets array
fs.readdirSync('assets/', {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => assets.push(item.name))

// creates the console title text
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
    breakTime(answers.time, 1);
  });
}, 100);

// creates a loop to randomly select one of the assets
// in the assets directory to be displayed by whatever
// os the user is using
function breakTime(num, interval) {
  const delay = 1000 * 60 * num;
  
  setTimeout(() => {
    (async () => {
      await open(`./assets/${assets[Math.floor(Math.random() * assets.length)]}`, {wait: true});
      console.log(`Break Interval: ${interval}`);
      breakTime(num, interval + 1);
    })();
  }, delay);
};