const express = require('express');
const server = express();
const port = 3000;
const session = require('express-session');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config()





server.set('view engine', 'ejs');






passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
    })

  



server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))

server.use(passport.initialize())
server.use(passport.session())

// server.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));



  server.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

server.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));


server.get('/dashboard',isAuth,(req,res) => {
    console.log('data user',req.user)
    res.send(JSON.stringify(req.user))
})


function isAuth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

























server.get('/login',(req, res) => {
    res.render('login')
})


server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
