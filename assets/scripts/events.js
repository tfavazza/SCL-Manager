'use strict';


const api = require('./api.js');
const ui = require('./ui.js');
let toggling = true;

const onDisplayLeagueData = function() {
  api.displayLeagueData()
  .done(ui.displayLeagueDataSuccess)
  .fail(console.error());
};

const onWodar = function(e) {
  e.preventDefault();
  let backgroundHex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  let buttonColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  let panelColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  $('.container-fluid').css('background-color', backgroundHex);
  $('.btn').css('background-color', buttonColor);
  $('.panel').css('background-color', panelColor);
}

const onZipFileUpload = function(e) {
  e.preventDefault();
  let formData = new FormData();
  formData.append('file', $('input[type=file]')[0].files[0])
  api.zipFileUpload(formData)
  .done(ui.zipFileUploadSuccess)
  .fail(ui.zipFileUploadFailure);
};

const onDisplayPlayerSchedule = function(event) {
  event.preventDefault();
  let player = event.target.id;
  api.displayPlayerSchedule(player)
  .done(ui.displayPlayerScheduleSuccess)
  .fail(console.error);
};

const displayLeagueMembers = function() {
  $('.division-name').children().toggle();
};

const onDisplayAllSchedule = function() {
  api.displayAllSchedule()
  .done(ui.showAllScheduleSuccess)
  .fail(console.error);
};

const expandOrCollapseAllTabs = function() {
  $('.expand-collapse').on('click', function () {
    if(toggling) {
      $('#accordion .collapse').collapse('show');
      toggling = false;
    } else {
      $('#accordion .collapse').collapse('hide');
      toggling = true;
    }
  });
};

const onDisplayWeeklySchedule = function() {
  let startDate = new Date('2017-05-03');
  let today = new Date();
  let leagueWeek = Math.abs(today - startDate) / 86400000;
  leagueWeek = parseInt(leagueWeek / 7 + 1);
  api.displayAWeek(leagueWeek)
  .done(ui.displayThisWeeksSchedule);
};

const onscrollUp = function(){
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
      $('#back-to-top').tooltip('hide');
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

    $('#back-to-top').tooltip('show');
  };

const onDisplayRecap = function(event) {
  event.preventDefault();
  console.log(event.target);
  let id = event.target.id;
  api.getGameRecap(id)
  .done(ui.displayGameRecap)
}


const addHandlers = function() {
  $(document).on('click', '.game-details', onDisplayRecap);
  $(document).ready(onscrollUp);
  $('.division-name').on('click', displayLeagueMembers);
  $('#zip-file').on('click', onZipFileUpload);
  $(document).ready(onDisplayLeagueData);
  $(document).ready(onDisplayAllSchedule);
  $(document).ready(onDisplayWeeklySchedule);
  $(document).on('click', '.btn-info', onDisplayPlayerSchedule);
  $(document).ready(ui.getDate);
  $(document).ready(expandOrCollapseAllTabs);
  $('#wodar-button').on('click', onWodar);
};
$(document).ready(ui.displayPlayoffGames);
module.exports = {
  addHandlers,
  onDisplayLeagueData,
  onDisplayAllSchedule,
  onDisplayWeeklySchedule,
};
