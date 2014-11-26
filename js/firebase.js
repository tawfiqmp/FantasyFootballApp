(function(window, undefined) {
    "use strict";

var Login = Backbone.Firebase.Model.extend({
	firebase: new Firebase("https://fantasyfbapp.firebaseio.com/"),
	defaults: {
		username: "anonymous",
		password: "",
	},
	validate: function(attrs){
		var checks = {
			usename: "You forgot to enter a username!"
			password: "You forgot to enter a password!"
		}

	}

	var results = _.filter(checks, function(error_message, key)) 








})

var LoginView = Backbone.view.extend({
	model: document.querySelector:('body')


})










})(window, undefined);