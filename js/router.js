(function(window, undefined) {
    "use strict";

    window.app = window.app || {};

    app.Game = Backbone.Model.extend({
        defaults: {
            response_format: "json",
            sport: "football",
            version: "3.0",
            //api_key: "480558CD-C3AE-45E2-82F9-32AC35CCD91E",
        },
        urlRoot: function() {
            return [
                "/cbs/fantasy",
                "?version=",
                this.get("version"),
                "&SPORT=",
                this.get("sport"),
                "&response_format=",
                this.get("response_format")
            ].join("");
        },
        getSchedule: function() {
            var self = this;
            return this.fetch().then(function(model) {
                console.log(model.body.players);
                return model.body.players;
            })
        }

    });

    app.Games = Backbone.Collection.extend({
        model: app.Game
    })

    app.Player = Backbone.Model.extend({
        defaults: {
            service_name: "players",
            format: "json",
            api_key: "c9vfqacmcegz"
        },
        urlRoot: function() {
            return [
                "/ffnerd/service/",
                this.get("service_name"),
                "/",
                this.get("format"),
                "/",
                this.get("api_key")
            ].join("");
        },
        getSchedule: function() {
            var self = this;
            return this.fetch().then(function(data) {
                console.log(data);
                return data;
            })
        }

    })

    app.Players = Backbone.Collection.extend({
        model: app.Player
    })

    app.GameView = Backbone.View.extend({
        initialize: function() {
            this.model = new app.Game({

            });
            this.render();
        },
        render: function() {
            this.getNewSchedule();
        },
        getNewSchedule: function() {
            var self = this;
            this.model.getSchedule().then(function(data) {
            	console.log(data);
            	return data;
            })

        }
    })

    app.AppView = Backbone.View.extend({
    	el: document.querySelector('body'),
    	initialize: function() {
            this.render();
            this.GameView = new app.GameView();
    	},
        render: function() {
        	var self = this;
        	// //this.collection.forEach(function(e){

        	// })
        }


    })

    app.Router = Backbone.Router.extend({
        routes: {
            "*default": "login"
        },
        login: function() {
            //alert(1);
        },
        initialize: function() {
        	this.AppView = new app.AppView();
            Backbone.history.start();
        }
    })

    var AppView = app.AppView;

})(window, undefined);
