(function(window, undefined) {
    "use strict";

    window.app = window.app || {};

    app.Player = Backbone.Model.extend({
        defaults: {
            response_format: "json",
            sport: "football",
            version: "3.0",
            pro_team: "SF",
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
        getPlayers: function() {
            var self = this;
            return this.fetch().then(function(model) {
                console.log(model.body.players[350]);
                return model.body.players;
            })
        }

    });

    app.Players = Backbone.Collection.extend({
        model: app.Player,

        findPlayerByTeam: function(pro_team) {
                return _(this.models.filter(function(c){
                    console.log(c.get('[0].pro_team' == 'BUF'))
                    return c.get('[0].pro_team') == 'BUF';
                }));
        }
    })

    app.Game = Backbone.Model.extend({
        defaults: {
            response_format: "json",
            sport: "football",
            version: "3.0",
            //api_key: "480558CD-C3AE-45E2-82F9-32AC35CCD91E",
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
        getGame: function() {
            var self = this;
            return this.fetch().then(function(data) {
                console.log(data);
                return data;
            })
        }

    })

    app.Games = Backbone.Collection.extend({
        model: app.Game

    })

    app.PlayerView = Backbone.View.extend({

        initialize: function() {
            this.model = new app.Player({

            });
            this.render();
        },
        render: function() {
            this.getNewPlayers();
        },
        getNewPlayers: function() {
            var self = this;
            this.model.getPlayers().then(function(data) {
                console.log(data);
                return data;
            })

        }
    })

    app.GameView + Backbone.View.extend({

    })

    app.AppView = Backbone.View.extend({
        el: document.querySelector('body'),
        initialize: function() {
            this.render();
            this.PlayerView = new app.PlayerView();
        },
        events: {
            "click a.findRoster": function(e) {
                this.render(e);
            }
        },
        render: function() {
            var self = this;

            this.collection = new app.Players({

            })

            this.collection.findPlayerByTeam().then(function(data) {
                    console.log(data);
                    return data;
                })
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
