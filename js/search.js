(function(window, undefined) {
    "use strict";

    window.app = window.app || {};

    app.NewSearch = Backbone.Model.extend({
        defaults: {
            response_format: "json",
            sport: "football",
            version: "3.0",
            name: "smith",

        },

        urlRoot: function() {
            return [
                "/cbs/search/",
                "?version=",
                this.get("version"),
                "&SPORT=",
                this.get("sport"),
                "&response_format=",
                this.get("response_format"),
                "&name=",
                this.get("name")
            ].join("");
        },

        getPlayers: function() {
            var self = this;
            return this.fetch().then(function(model) {
                console.log(model.body.players);
                return model.body.players;
            })
        }

    })


    app.SearchView = Backbone.View.extend({
        el: $('#'),

        events: {
            'change #teamFilter': 'filterTeamSelect'
        },

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

})(window, undefined);
