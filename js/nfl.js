(function(window, undefined) {
    "use strict";

var nfl = Backbone.Model.extend({
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
})

var teams = Backbone.collections.extend({

})

var nflView = Backbone.view.extend({
	model: document.querySelector:('body')


})










})(window, undefined);