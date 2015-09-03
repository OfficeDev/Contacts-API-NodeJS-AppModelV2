var express = require('express');
var router = express.Router();
var authHelper = require('../authHelper.js');
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.TOKEN_CACHE_KEY === undefined)
    res.redirect('/login');
  else {
    //get data
    authHelper.getTokenFromRefreshToken(req.cookies.TOKEN_CACHE_KEY, function(token) {
      if (token !== null) {
        getJson('outlook.office.com', '/api/v1.0/me/contacts', token.access_token, function(contacts) {
          if (contacts.error && contacts.error.code === 'MailboxNotEnabledForRESTAPI')
            res.render('index', { title: 'My Contacts', contacts: [], restDisabled: true });
          else
            res.render('index', { title: 'My Contacts', contacts: contacts['value'], restDisabled: false });
        });
      }
      else {
        //TODO: handle error
      }
    });
  }
});

router.get('/login', function(req, res, next) {
  //look for code from AAD reply
  if (req.query.code !== undefined) {
    //use the code to get a token
    authHelper.getTokenFromCode(req.query.code, function(token) {
      //check for null token
      if (token !== null) {
        res.cookie(authHelper.TOKEN_CACHE_KEY, token.refresh_token);
        res.redirect('/');
      }
      else {
        //TODO: handle error
      }
    });
  }
  else {
    res.render('login', { title: 'Login', authRedirect: authHelper.getAuthUrl });  
  }
});

//perform a fet based on parameters and return a JSON object
function getJson(host, path, token, callback) {
  var options = {
    host: host, 
    path: path, 
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  https.get(options, function(res) {
    var body = '';
    res.on('data', function(d) {
      body += d;
    });
    res.on('end', function() {
      callback(JSON.parse(body));
    });
    res.on('error', function(e) {
      callback(null);
    });
  });
};

module.exports = router;
