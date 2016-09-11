'use strict';

const handleBarsLeague = require('../scripts/templates/leagues.handlebars');
const events = require('./events.js');
const handlebarsplayer = require('../scripts/templates/player.handlebars');
const handebarsSchedule = require('../scripts/templates/schedule.handlebars');



const displayLeagueDataSuccess = function(data) {
	 let league = data.list.leagues;
	$('#league-data').html(handleBarsLeague(league));
};


const zipFileUploadSuccess = function() {
	console.log("file sent to the butt!");
};

const displayPlayerScheduleSuccess = function(data) {
	let matches = data.matches;
	console.log(matches);
	$('#player-schedule').html(handlebarsplayer(matches));
};

const showAllScheduleSuccess = function(data) {
  let schedule = data;
  $('#schedule').html(handebarsSchedule(schedule));
};

module.exports = {
	displayLeagueDataSuccess,
	displayPlayerScheduleSuccess,
	showAllScheduleSuccess,
	zipFileUploadSuccess,
};
