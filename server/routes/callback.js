var express = require('express');
var router = express.Router();
const request = require('superagent');
require('dotenv').config()

/* Handle LinkedIn OAuth callback and return user profile. */
router.get('/', function(req, res, next) {
  requestAccessToken(req.query.code,req.query.state)
  .then((response) => {
    requestProfile(response.body.access_token)
    .then(response => {
      console.log("AAAAAAAAAAAAAAA CHE JAVAB",response.body)
      
      res.render('callback',{ profile: response.body})
    })
  })
  .catch((error) => {
    res.status(500).send(`${error.message}`)
    console.log("error ma ave che")
    console.error(error)
  })
});

function requestAccessToken(code,state) {
  return request.post('https://www.linkedin.com/oauth/v2/accessToken')
    .send('grant_type=authorization_code')
    .send(`redirect_uri=http://localhost:8000/callback`)
    .send(`client_id=86spba3c71kv6z`)
    .send(`client_secret=qyx79IaizTd0D7SS`)
    .send(`code=${code}`)
    .send(`state=${state}`)
}

function requestProfile(token) {
  return request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
  .set('Authorization', `Bearer ${token}`)
}

module.exports = router;
