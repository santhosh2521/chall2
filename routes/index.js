const path       = require('path');
const express    = require('express');
const router     = express.Router();
var cookieParser = require('cookie-parser');
const { encode } = require('punycode');
const sanitize = require('sanitize-html')
var idd=0;
const response = data => ({ message: data });
/* GET home page. */
router.get('/', function(req, res, next) { //to see login page
  res.cookie('user','');
  res.sendFile(path.resolve('views/login.html'));
});

router.post('/',function(req,res,next) //when users login
{
      if(req.body.username===''|| req.body.password==='')
      {
        res.status(500).send(response("Something's wrong!! Try again"));
      }
      else if(req.body.username==='admin' && req.body.password!=='$up3R_$3cR3T$$123')
      {
        res.status(500).send(response("Something's wrong!! Try again"));
      }
      else
      {

        var jstring = JSON.stringify({user:sanitize(req.body.username),id:++idd})
        var encoded = btoa(jstring);
        res.cookie('user',encoded);
        res.json({"message":"Logging in!!"});
      }
});

router.get('/user',function(req,res,next) //the page for normal users
{
    if(req.cookies.user==="")
    {
      res.send(response("Bruhh!!! Login again"))
    }
    var jstring = atob(req.cookies.user);
    var parsed = JSON.parse(jstring);
    if(parsed.user ==="admin" && parsed.id===0)
    {
      res.sendFile(path.resolve('views/admin.html'));
    }
    else{
      res.sendFile(path.resolve('views/user.html'));
    }
});


module.exports = router;
