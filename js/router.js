(function(window, undefined) {
    "use strict";

    window.app = window.app || {};

    app.Player = Backbone.Model.extend({
        defaults: {
            response_format: "json",
            sport: "football",
            version: "3.0",
            pro_team: "BUF"
            //api_key: "480558CD-C3AE-45E2-82F9-32AC35CCD91E",
        },
        urlRoot: function() {
            return [
                "/cbs/search",
                "?version=",
                this.get("version"),
                "&SPORT=",
                this.get("sport"),
                "&response_format=",
                this.get("response_format"),
                "&pro_team=",
                this.get("pro_team")
            ].join("");
        },
        getPlayers: function() {
            var self = this;
            return this.fetch().then(function(model) {
                console.log(model.body.players);
                return model.body.players;
            })
        }

    });

    app.Players = Backbone.Collection.extend({
        model: app.Player,

        parse: function(response) {
            return response.body.players
        },


        url: "http://api.cbssports.com/fantasy/players/search"


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
        template: "<div class='image'></div>",

        events: {
            "change #form": "filterData"
        },

        initialize: function() {
            this.model = new app.Player({
                pro_team: this.proTeam,
            });
            this.options = _.extend({}, {
                $container: $('div.grid')
            },
        this.options.$container.append(this.el)
        this.render();
        },

        render: function() {
            this.filterData();
            this.el.innerHTML = _.template(this.template, this.options)

        },

        filterData: function(event) {
            var self = this;
            this.model.getPlayers().then(function(url){
                self.el.querySelector('.image').innerHTML = "<img src=" + url.model.body.players.photo + ">";
            });
            this.proTeam = $("option:selected", event.target).val()
        },

    })

    app.GameView + Backbone.View.extend({


    })

    app.AppView = Backbone.View.extend({
        el: document.querySelector('body'),
        initialize: function() {
            this.PlayerView = new app.PlayerView();
        },
        events: {
        },
        render: function() {
            var self = this;

        }


    })

    app.Router = Backbone.Router.extend({
        routes: {
            //"search": "page2"
            "*default": "page1"

        },
        login: function() {
            //alert(1);
        },
        initialize: function() {
            this.AppView = new app.AppView();
            Backbone.history.start();
        }
    })

    var PlayerView = app.PlayerView;

})(window, undefined);
