'use strict';

const handleBarsLeague = require('../scripts/templates/leagues.handlebars');
const events = require('./events.js');
const handlebarsplayer = require('../scripts/templates/player.handlebars');
const handebarsSchedule = require('../scripts/templates/schedule.handlebars');
const Handlebars = require('handlebars');


Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

const organizeFullSchedule = function(rawSchedule) {
	let fixedSchedule = {
		"Week-1": [],
		"Week-2": [],
		"Week-3": [],
		"Week-4": [],
		"Week-5": [],
		"Week-6": [],
		"Week-7": [],
		"Week-8": [],
		"Week-9": [],
		"Week-10": [],

	}
	for(let i=0; i < rawSchedule.length; i++) {
			console.log(rawSchedule[i]);
		switch(rawSchedule[i].week) {
			case 1:
			fixedSchedule["Week-1"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;
			case 2:
			fixedSchedule["Week-2"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;
			case 3: 
			fixedSchedule["Week-3"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;		
			case 4:
			fixedSchedule["Week-4"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;
			case 5:
			fixedSchedule["Week-5"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;
			case 6:
			fixedSchedule["Week-6"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;
			case 7:
			fixedSchedule["Week-7"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;
			case 8:
			fixedSchedule["Week-8"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;
			case 9:
			fixedSchedule["Week-9"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;
			case 10:
			fixedSchedule["Week-10"].push({
				"player1": rawSchedule[i].player1.name,
				"player1country": rawSchedule[i].player1.country,
				"player2": rawSchedule[i].player2.name,
				"player2country": rawSchedule[i].player2.country,
			}
				);
			break;			
		}
	}
	console.log(fixedSchedule);

	return fixedSchedule;
};

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
  let schedule = organizeFullSchedule(data);  
  $('#schedule').html(handebarsSchedule(schedule));
};

module.exports = {
	displayLeagueDataSuccess,
	displayPlayerScheduleSuccess,
	showAllScheduleSuccess,
	zipFileUploadSuccess,
};
