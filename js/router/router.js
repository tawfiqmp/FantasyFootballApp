(function(window, undefined) {
    "use strict";

    window.app = window.app || {};

    app.Game = Backbone.Model.extend({
        defaults: {
            service_name: "schedule",
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
            return this.fetch().then(function(model) {
                console.log(model);
                return model;
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
        render: function() {
            getNewSchedule();
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
    		this.GameViews = new app.Gameview();
    	},
        render: function() {
        	var self = this;
        	collection.forEach(function(e){

        	})
        }


    })

    app.Router = Backbone.Router.extend({
        routes: {
            "*default": "login"
        },
        login: function() {
            alert(1);
        },
        initialize: function() {
        	this.appLevelView = new app.AppView();
            Backbone.history.start();
        }
    })

})(window, undefined);
