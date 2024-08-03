// import apiRoute from './api/routes/apiRoute';

const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4000;

//google cal API setup
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

//read google creds
const credentials = JSON.parse(fs.readFileSync('C:/uhapm/uhapm-client/credentials.json'));

const oAuth2Client = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
);

//google Oauth2 authentication route
app.get('/auth/google', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    res.redirect(authUrl);
});

//oauth2 callback route - handle callback after use authenticated with google
app.get('/callback', (req, res) => {
    const code = req.query.code;
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      res.redirect('/');
    });
  });

//route for google calendar events
app.get('/events', async (req, res) => {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
  
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, response) => {
      if (err) return console.error('The API returned an error: ' + err);
      res.json(response.data.items);
    });
});
  
//static files
app.use(express.static(path.join(__dirname, '..', 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
});


app.listen(PORT, () => console.log('Server started'));

// app.use('/api/apiRoute', apiRoute));
