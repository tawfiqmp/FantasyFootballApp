(function(window, undefined) {
    "use strict";

    window.app = window.app || {};

    app.NewSearch = Backbone.Model.extend({
        defaults: {
            response_format: "json",
            sport: "football",
            version: "3.0",

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

        
    })

})(window, undefined);
