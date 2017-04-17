'use strict';

//const app = require('./app.js');
const api = require('./api.js');
const ui = require('./ui.js');
let toggling = true;
let wodarView = false;

const onDisplayLeagueData = function(data) {
	api.displayLeagueData(data)
	.done(ui.displayLeagueDataSuccess)
	.fail(console.error());
};

const onWodar = function(e) {
	console.log('WODAR!');
	e.preventDefault();
	if (wodarView) {
		$('.container-fluid').css('background-color', '#00cc00')
		wodarView = !wodarView
	} else {
		$('.container-fluid').css('background-color', '#336699')
		wodarView = !wodarView
	}
}

const onZipFileUpload = function(e) {
	console.log('click!');
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
	.fail();
};

const displayLeagueMembers = function() {
	$('.division-name').children().toggle();
};

const onDisplayAllSchedule = function() {
	api.displayAllSchedule()
	.done(ui.showAllScheduleSuccess)
	.fail(function(e) {console.log(e)});
};

const expandOrCollapseAllTabs = function() {
	$('.expand-collapse').on('click', function () {
    if(toggling) {
    $('#accordion .panel-collapse').collapse('show');
    toggling = false;
  } else {
    $('#accordion .panel-collapse').collapse('hide');
    toggling = true;
  }
});
};

const onDisplayWeeklySchedule = function() {
  let startDate = new Date('2017-04-15');
  let today = new Date();
  let leagueWeek = Math.abs(today - startDate) / 86400000;
  leagueWeek = parseInt(leagueWeek / 7 + 1);
  console.log(leagueWeek);
  api.displayAWeek(leagueWeek)
  .done(ui.displayThisWeeksSchedule).fail(console.log('whoops!'));
};

const addHandlers = function() {
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
module.exports = {
	addHandlers,
};
