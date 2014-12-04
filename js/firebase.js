(function(window, undefined) {
    "use strict";

    var Login = Backbone.Firebase.Model.extend({
        firebase: new Firebase("https://fantasyfbapp.firebaseio.com/"),
        ref.createUser({
            email: "bobtony@firebase.com",
            password: "correcthorsebatterystaple"
        }, function(error) {
            if (error === null) {
                console.log("User created successfully");
            } else {
                console.log("Error creating user:", error);
            }
        });
        defaults: {
            username: "anonymous",
            password: "",
        },
        validate: function(attrs) {
            var checks = {
                username: "You forgot to enter a username!"
                password: "You forgot to enter a password!"
            }
            // var results = _.filter(checks, function(error_message, key))
        }
    })

    var LoginView = Backbone.view.extend({
        tagname: model: document.querySelector: ('body')
    })

})(window, undefined);
