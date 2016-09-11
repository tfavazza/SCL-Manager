'use strict';

const app = require('./app.js');
const api = require('./api.js');
const ui = require('./ui.js');


const onDisplayLeagueData = function(data) {
	api.displayLeagueData(data)
	.done(ui.displayLeagueDataSuccess)
	.fail(console.error());
};

const onZipFileUpload = function(data) {
	api.zipFileUpload(data)
	.done(ui.zipFileUploadSuccess)
	.fail(console.log("JK no butt"));

};

const onDisplayPlayerSchedule = function(event) {
	event.preventDefault();
	let player = event.target.id;
	console.log(player);
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
	.fail(console.error("something went wrong"));
};



const addHandlers = function() {
$('.division-name').on('click', displayLeagueMembers);
$('#zip-file').on('click', onZipFileUpload);
$(document).ready(onDisplayLeagueData);
$(document).ready(onDisplayAllSchedule);
$(document).on('click', '.btn', onDisplayPlayerSchedule);

};
module.exports = {
	addHandlers,
};
