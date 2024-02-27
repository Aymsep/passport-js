const express = require('express');
const server = express();
const port = 3000;
const session = require('express-session');
const passport = require('passport');

server.set('view engine', 'ejs');


require('./libs/localStrategy')


server.use(express.json());
server.use(express.urlencoded({ extended: true }));




server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))

server.use(passport.initialize())
server.use(passport.session())






  server.post('/login', 
  passport.authenticate('local',
   { 
    failureRedirect: '/home',
    successRedirect: '/dashboard' 
}))




server.get('/login',(req, res) => {
    res.render('login')
})

server.get('/dashboard',isAuth,(req, res) => {
    console.log(req.session)
    res.render('dashboard')
})


function isAuth(req, res,next) {
    console.log(req.isAuthenticated())
     if(req.isAuthenticated()){
        return next()
     }
     return res.redirect('/login')
}








server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
