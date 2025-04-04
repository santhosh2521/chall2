const path       = require('path');
const express    = require('express');
const router     = express.Router();
var cookieParser = require('cookie-parser');


const response = data => ({ message: data });
/* GET home page. */
router.get('/', function(req, res, next) { //to see login page
  res.sendFile(path.resolve('views/login.html'));
});

router.get('/register',function(req,res,next) //to see register page
{
  res.sendFile(path.resolve('views/register.html'));
});

router.post('/register',function(req,res,next) //when users register
{
      console.log(req.body);
      console.log(req.body.username);
      if(req.body.username==='' || req.body.password==='')
      {
        res.status(404).send(response("no username or password"));
      }
      else
      {
        res.status(200).send(response("Registered"));
      }
})

router.post('/',function(req,res,next) //when users login
{
      console.log(req.body);
      console.log(req.cookies);
      if(req.body.username===''|| req.body.password==='' || !req.cookies.user)
      {
        res.status(500).send(response("Something's wrong!! Try again"));
      }
      else if(req.cookies.user==="admin")
      {
          res.status(200).send(response("admin"));
      }
      else
      {
        res.status(200).send(response("user"));
      }
});

router.get('/user',function(req,res,next) //the page for normal users
{
    res.sendFile(path.resolve('views/user.html'));
});

router.get('/admin',function(req,res,next) //the page for admins
{

    if(req.cookies.user==="admin")
    {
       res.send(response("ctf{flag}"));
    }
    else
    {
        res.send(response("Not admin"));
    }

});

module.exports = router;
