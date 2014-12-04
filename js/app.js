
window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./bower_components/normalize.css/normalize.css"},
        {url: "./bower_components/typeplate-starter-kit/css/typeplate.css"},
        {url: "./dist/style.css"},

        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},
        {url: "./bower_components/backbone/backbone.js"},
        // {url: "./bower_components/firebase/firebase.js"},
        // {url: "./bower_components/backfire/dist/backbonefire.min.js"},

        // {url: "./js/firebase.js"},
        // {url: "./js/nerd.js"},
        // {url: "./js/cbs.js"},
        
        // {url: "./js/views/login.js"},
        
        {url: "./js/router/router.js"}
    ).then(function(){
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;
        document.body.style.opacity = 1;
        // start app?
        // 
        var router = new app.Router();
    })

}
    
