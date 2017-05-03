'use strict';

const handleBarsLeague = require('../scripts/templates/leagues.handlebars');
const events = require('./events.js');
const handlebarsplayer = require('../scripts/templates/player.handlebars');
const handebarsSchedule = require('../scripts/templates/schedule.handlebars');
const handlebarsWeek = require('../scripts/templates/week.handlebars');
const confirmation = require('../scripts/templates/confirmation.handlebars');

const getDate = function() {
    let utc = new Date().toJSON().slice(5, 10) + '-' + new Date().toJSON().slice(0,4);
    $("#date").html(`Last Updated: ${utc}`);
    $("#week-date").html(`For the week of ${utc}`);
};

const organizeFullSchedule = function(rawSchedule) {
    console.log(rawSchedule);
    let  fixedSchedule = {
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
    };
    const buildAWeek = function(week) {
        let weekSchedule = {
            "week": rawSchedule[week].week,
            "league": rawSchedule[week].league,
            "player1": rawSchedule[week].player1.name,
            "player1country": rawSchedule[week].player1.country,
            "player2": rawSchedule[week].player2.name,
            "player2country": rawSchedule[week].player2.country,
            "status": "Not played",
            "completedFlag": rawSchedule[week].status, 
            "matchUrl": rawSchedule[week].matchUrl
        };
        if(rawSchedule[week].status === 1) {
        	weekSchedule.status = "Completed";
        }
        return weekSchedule;
    };
    for (let i = 0; i < rawSchedule.length; i++) {
        switch (rawSchedule[i].week) {
            case 1:
                fixedSchedule["Week-1"].push(buildAWeek(i));
                break;
            case 2:
                fixedSchedule["Week-2"].push(buildAWeek(i));
                break;
            case 3:
                fixedSchedule["Week-3"].push(buildAWeek(i));
                break;
            case 4:
                fixedSchedule["Week-4"].push(buildAWeek(i));
                break;
            case 5:
                fixedSchedule["Week-5"].push(buildAWeek(i));
                break;
            case 6:
                fixedSchedule["Week-6"].push(buildAWeek(i));
                break;
            case 7:
                fixedSchedule["Week-7"].push(buildAWeek(i));
                break;
            case 8:
                fixedSchedule["Week-8"].push(buildAWeek(i));
                break;
            case 9:
                fixedSchedule["Week-9"].push(buildAWeek(i));
                break;
            case 10:
                fixedSchedule["Week-10"].push(buildAWeek(i));
                break;
        }
    }
    return fixedSchedule;
};

const displayThisWeeksSchedule = function(weeklySchedule) {
    console.log(weeklySchedule);
  $('#weekly-schedule').html(handlebarsWeek(weeklySchedule));
};

const displayLeagueDataSuccess = function(data) {
    let league = data.list.leagues;
    $('#league-data').html(handleBarsLeague(league));
};


const zipFileUploadSuccess = function(response) {
    console.log(response);
    $('#confirmation').html(confirmation(response));
};

const zipFileUploadFailure = function(response) {
    let error = response.responseJSON.errorMessage;
    console.log(response.responseJSON.errorMessage);
    //response.responseText
  $('#confirmation').html(
    '<div class="alert alert-info"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Oh no!</strong> Something went wrong! ' + error + '.</div>');
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

const displayPlayoffGames = function() {
    $('#results').html('<center><div class="h3">Coming Soon!™</div></center>');
}

module.exports = {
    displayLeagueDataSuccess,
    displayPlayerScheduleSuccess,
    showAllScheduleSuccess,
    zipFileUploadSuccess,
    zipFileUploadFailure,
    getDate,
    displayThisWeeksSchedule,
    displayPlayoffGames
};
