var config = require('./config.json');
var cakehr = require('./lib/cakehr.js');

var chrono = require('chrono-node');
var moment = require('moment');

function getDate(message) {
  
  var parsedMessage = chrono.parse(message);
  if(parsedMessage.length === 0) return false;
  
  parsedMessage = parsedMessage[0];
  var start = parsedMessage.start.date();
  var end = start;
  if(parsedMessage.end){
    end = parsedMessage.end.date();
  }

  return {
    'from': start,
    'to': end
  };
};

exports.handler = function(event, context) {
  var message = event.text ? event.text.trim() : null;

  console.log('[EVENT] ', event);
  console.log('[MESSAGE] ', message);

  if(event.token !== config.slashCommandToken) {
    return context.fail('Unauthorized request. Check config.slashCommandToken.');
  }

  var parsedDates = getDate(message);
  console.log('[DATE] ', parsedDates);

  if(!parsedDates){
    return context.fail('I don\'t understand what you mean');
  }

  var from = moment(parsedDates.from);
  var to = moment(parsedDates.to);

  cakehr.getTimeOff({
    'from': from.format('YYYY-MM-DD'),
    'to': to.format('YYYY-MM-DD'),
    'approval': 'approved'
  }).then(function (cakehrTimeOffs) {
    var response = {
      "response_type": "ephemeral",
      "text": "Times-offs between " + from.format('MMMM Do YYYY') + " and " + to.format('MMMM Do YYYY'),
      "attachments":[
        {
          "text": cakehr.timeOffsToString(cakehrTimeOffs)
        }
      ]
    };

    context.succeed(response);
  }).catch(function(reason) {
    console.log('[FAIL] Unable to get time offs: ', reason);
    context.fail('Unable to get time offs.');
  });

};