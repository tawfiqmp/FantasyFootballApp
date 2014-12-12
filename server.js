/**
 * Module dependencies.
 */

function startServer() {
    var express = require('express'),
        http = require('http'),
        path = require('path'),
        app = express(),
        methodOverride = require('method-override'),
        request = require('request'),
        _ = require('lodash'),
        port = process.argv[3] || (process.env && process.env.PORT) || 3000,
        passport = require('passport'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        _ = require('lodash'),
        md5 = require('./js/md5.js').md5;

    var config = {
        session: {
            // some big random secret password
            secret: 'ASDHBA LSBDADQ(*H 9eh;8eh3henAS D*(ASAdada8sdaID NASJDASJSD adan kh )#R(#)NSfj dfnsdfsf'
        },
        nfl: {
            // http://api.fantasy.nfl.com/
            appKey: "...", // TBD
            appSecret: "..."
        }
    }

    if (process.env.NODE_ENV === "production") {
        // config.yahoo.callback = "http://fantasyfootballapp.herokuapp.com/auth/yahoo/callback"
    }

    function querify(queryParamsObject) {
        return '?' + _.map(queryParamsObject || {}, function(val, key) {
            return key + '=' + val
        }).join('&');
    }

    // adds a new rule to proxy a localUrl -> webUrl
    // i.e. proxify ('/my/server/google', 'http://google.com/')
    function proxify(localUrl, webUrl, extras) {
        var _extras = _.extend({}, extras);
        _.forEach(_extras, function(val, key){
            if(typeof val === "function"){
                _extras[key] = val(_extras);
            }
        })
        app.get(localUrl, function(req, res) {
            var url = [
                webUrl,
                querify( _.extend({}, req.query, _extras) )
            ].join("");

            console.log(url);

            req.pipe(request(url)).pipe(res);
        });
    }

    // add your proxies here.
    //
    // examples:
    // proxify('/yummly/recipes', 'http://api.yummly.com/v1/api/recipes');
    // proxify('/brewery/styles', 'https://api.brewerydb.com/v2/styles');
    proxify('/cbs/fantasy', 'http://api.cbssports.com/fantasy/players/list');
    proxify('/cbs/search', 'http://api.cbssports.com/fantasy/players/search');
    // proxify('/nfldata/trial/', 'http://api.nfldata.apiphany.com/trial/json/players/{team}');
    // proxify('/nfl/auth/login', "http://api.fantasy.nfl.com/auth/login", {
    //     appKey: config.nfl.appKey,
    //     timestamp: function(){ return Math.round((+new Date())/1000) },
    //     format: "json",
    //     signature: function(extras){ return md5([extras.appKey, extras.username, extras.password, extras.timestamp, config.nfl.appSecret].join("")) }
    // })

    // all environments
    app.set('port', port);
    app.use(methodOverride());

    /**
     * stuff for passportjs (OAuth Node.js library)
     * - I literally copy pasted this
     */
    // app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: config.session.secret
    })); // session secret

    /**
     * Setting Auth Endpoints
     */

    // route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }


    // stays the last "route" mentioned
    app.use(express.static(path.join(__dirname, '')));
    http.createServer(app).listen(port, function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
}

module.exports.startServer = startServer;
