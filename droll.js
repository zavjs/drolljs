const fs = require('fs');
const colors = require('colors');

const timestamp = () => {
  let now = new Date();
  return `[${now.getHours()}:${now.getMinutes()}]`;
};

const consoleDateMessage = (message, color = 'red') => 
  console.log(colors[color](`${timestamp()} - ${message}`));

module.exports = {
  _tasks: {},
  _curVal: null,
  src: function (file) {
    this._curVal = fs.readFileSync(file);
    return this;
  },
  dist: function (path) {
    consoleDateMessage(`${path} was created`, 'blue');
    fs.writeFileSync(path, this._curVal);
    return this;
  },
  task: function (taskName, cb) {
    this._tasks[taskName] = cb; 
    return this;
  },
  execute: function (taskName) {
    this._tasks[taskName]();
    return this;
  },
  pipe: function (func) {
    this._curVal = Buffer.from(func(this._curVal.toString()));
    return this;
  },
  watch: function (location, cb) {
    consoleDateMessage(`listening for changes in ${location}...`, 'green');
    fs.watch(location, (eventType, filename) => {
      if(eventType === 'change') {
        consoleDateMessage(`${filename} was changed`, 'red');
        cb({ event: eventType, filename });
      }
    });
  }
};

