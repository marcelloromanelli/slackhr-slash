var rp = require('request-promise');
var querystring = require('querystring');
var moment = require('moment');
var config = require('../config.json');

var baseUrl = 'https://cake.hr/api/';

// Prameters are mapped 1-1 to the official API
// see here for more information: http://docs.cakehr.apiary.io/
function getTimeOff(parameters) {
	var endpoint = '/calendar/?';

	return rp({
		uri: baseUrl + config.cakehrToken + endpoint,
		qs: parameters,
		json: true
	});
};

function timeOffsToString(timeOffs, separator) {
	separator = separator || '\n';
	var text = [];
	for (var i = timeOffs.length - 1; i >= 0; i--) {
		var current = timeOffs[i];
		
		var from = moment(current.from, "YYYY-MM-DD");
		var to = moment(current.to, "YYYY-MM-DD");
		var duration = to.diff(from, 'days') + 1;

		text.push(
			current.user.first + ' ' + 
			current.user.last + ' - ' + 
			duration + ' ' +
			((duration>1)?'days':'day') +
			' - from ' + from.format('MMMM Do YYYY') + ' until ' + to.format('MMMM Do YYYY'));
	}
	return text.join(separator);
};

module.exports = {
  getTimeOff: getTimeOff,
  timeOffsToString: timeOffsToString
};