'use strict';

const handleBarsLeague = require('../scripts/templates/leagues.handlebars');
const events = require('./events.js');
const handlebarsPlayer = require('../scripts/templates/player.handlebars');
const handebarsSchedule = require('../scripts/templates/schedule.handlebars');
const handlebarsWeek = require('../scripts/templates/week.handlebars');
const handlebarsConfirmation = require('../scripts/templates/confirmation.handlebars');
const handlebarsRecap = require('../scripts/templates/recap.handlebars');
const handlebarsRules = require('../scripts/templates/rules.handlebars');
const handlebarsLastUpdated = require('../scripts/templates/lastUpdated.handlebars');

const startDate =  new Date('2017-05-13');

const organizeFullSchedule = function(rawSchedule) {
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

        // "Championship": []
    };
    const buildAWeek = function(week) {
        let weekSchedule = {
            "id": rawSchedule[week].id,
            "week": rawSchedule[week].week,
            "league": rawSchedule[week].league,
            "player1": rawSchedule[week].player1.name,
            "player1country": rawSchedule[week].player1.country,
            "player2": rawSchedule[week].player2.name,
            "player2country": rawSchedule[week].player2.country,
            "status": "Not played",
            "completedFlag": rawSchedule[week].status,
            "forfeitFlag": null,
            "matchUrl": rawSchedule[week].matchUrl,
            "weekdate": null,
            "forfeitWinner": '',
            "forfeitText": '',
        };
        if(rawSchedule[week].status === 1) {
        	weekSchedule.status = "Completed";
        }
        else if (rawSchedule[week].status === 2) {
            weekSchedule.forfeitFlag = 1;
            weekSchedule.completedFlag = 1;
            weekSchedule.status = "Forfeited";
            weekSchedule.forfeitWinner = rawSchedule[week].forfeitWinner;
            weekSchedule.forfeitText = rawSchedule[week].forfeitText;
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
                // for championships, coming soon
            // case 11: 
            //     fixedSchedule["Week-11"].push(buildAWeek(i));
            // case 12: 
            //     fixedSchedule["Week-12"].push(buildAWeek(i));
        }
    }
    // adds dates to the week button
    for (let i = 1; i < 11; i++) {
        fixedSchedule["Week-" + i][0]["weekdate"] = 
        `${new Date(startDate.setDate(startDate.getDate() + 1)).toString().slice(3,10)} 
        - ${new Date(startDate.setDate(startDate.getDate() + 6)).toString().slice(3,10)}`
     }
    return fixedSchedule;
};

const displayThisWeeksSchedule = function(weeklySchedule) {
  $('#weekly-schedule').html(handlebarsWeek(weeklySchedule));
};

const displayLeagueDataSuccess = function(data) {
    let league = data.list.leagues;
    $('#league-data').html(handleBarsLeague(league));
};

const displayLastUpdated = function(match) {
  $('#last-updated').html(handlebarsLastUpdated(match));
}


const zipFileUploadSuccess = function(response) {
    console.log(response);
    $('#confirmation').html(handlebarsConfirmation(response));
    events.onDisplayLeagueData;
    events.onDisplayAllSchedule;
    events.onDisplayWeeklySchedule;
    events.onLastUpdated;

};

const zipFileUploadFailure = function(response) {
    let error = response.responseJSON.errorMessage;
  $('#confirmation').html(
    '<div class="container"><div class="alert alert-info"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Oh no!</strong> Something went wrong! ' + error + '</div></div>');
};

const displayPlayerScheduleSuccess = function(data) {
    let matches = data.matches;
    $('#player-schedule').html(handlebarsPlayer(matches));
};

const showAllScheduleSuccess = function(data) {
    let schedule = organizeFullSchedule(data);
    $('#schedule').html(handebarsSchedule(schedule));
};

const displayRules = function() {
    $('#results').html(handlebarsRules);
}

const displayGameRecap = function(recap) {
    $('#recap-results').html(handlebarsRecap(recap))
}


module.exports = {
    displayLeagueDataSuccess,
    displayPlayerScheduleSuccess,
    showAllScheduleSuccess,
    zipFileUploadSuccess,
    zipFileUploadFailure,
    displayThisWeeksSchedule,
    displayRules,
    displayGameRecap,
    displayLastUpdated
};
