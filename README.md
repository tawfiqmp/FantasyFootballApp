# NFL FF API

## authentication with the NFL app

You can make a `$.get()` to `/nfl/auth/login` with the following query parameters. After that, you can use the auth token and user id returned in this request all other api calls, directly to the NFL API.

query params to include (after the `?`):

- username
- password

example query:

```js
$.get("/nfl/auth/login?username=matt&password=test").then(function(data){
    console.log(data); // { authToken: "...", userId: ... }
})
```

**Note:** You may want to save this authToken and userId in local storage.

## All other requests

> from http://api.fantasy.nfl.com/ ...

- format (use `"json"`)
- callback (use `'?'` as jQuery does the rest)

example:

- http://api.fantasy.nfl.com/v1/docs/service?serviceName=leaguePlayers

> GET'ing data for league players: http://api.fantasy.nfl.com/league/players?leagueId=1&authToken=MTIzNCYxJjEyNjgwODg4NTY=

- http://api.fantasy.nfl.com/v1/docs/service?serviceName=leagueTeamAddPlayer

> POST'ing data to add a player to league: http://api.fantasy.nfl.com/league/team/addplayer?leagueId=1&teamId=1&addPlayerId=1355&authToken=MTIzNCYxJjEyNjgwODg4NTY=