'use strict';

const app = require('./app.js');

const ui = require('./ui.js');


const displayLeagueData = function() {
  return $.ajax({
    url: app.host + '/league/',
      method: 'GET',
    });
};

const zipFileUpload = function(data) {
	return $.ajax({
		url: app.host + '/parse/',
		method: 'POST',
		data: data,

	});
};

const displayPlayerSchedule = function(player) {
	return $.ajax({
		url: app.host + '/player/' + player + '/matches',
			method: 'GET',
	});
};

const displayAllSchedule = function() {
  console.log("displayAllSchedule called");
	return $.ajax({
		url: app.host + '/match/all',
		method: 'GET',
	});

};

module.exports = {
	displayLeagueData,
	displayPlayerSchedule,
	displayAllSchedule,
  zipFileUpload,
};
