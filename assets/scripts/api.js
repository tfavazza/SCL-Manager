'use strict';

const app = require('./app.js');


const displayLeagueData = function() {
  return $.ajax({
    url: app.host + '/league/',
      method: 'GET',
    });
};

const zipFileUpload = function(data) {
	return $.ajax({
		url: app.host + '/match/parse',
		method: 'POST',
		data: data,
		contentType: false,
    	processData: false,
	});
};

const getLastUpdated = function() {
  return $.ajax({
    url: app.host + '/match/last',
    method: 'GET',
  });
};

const displayPlayerSchedule = function(player) {
	return $.ajax({
		url: app.host + '/player/' + player + '/matches',
		method: 'GET',
	});
};

const displayAllSchedule = function() {
	return $.ajax({
		url: app.host + '/match/all',
		method: 'GET',
	});
};

const displayAWeek = function(weekNumber) {
	return $.ajax({
		url: app.host + '/match/week/' + weekNumber,
		method: 'GET'
	});
};

const getGameRecap = function(id) {
  return $.ajax({
    url: app.host + '/match/' + id,
    method: 'GET'
  });
};

const forfeitAGame = function(data) {
  return $.ajax({
    url: app.host + '/match/' + data.id + '/forfeit',
    method: 'PUT',
    data: {
      winnerName: data.winnerName,
      text: data.text,
      password: 'root'
    },
    contentType: false,
    processData: false,
  });
};

module.exports = {
	displayLeagueData,
	displayPlayerSchedule,
	displayAllSchedule,
  zipFileUpload,
  displayAWeek,
  getGameRecap,
  getLastUpdated,
};
