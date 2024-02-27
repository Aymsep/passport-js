const passport = require('passport');
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy(
    function(username, password, done) {
     if(username == 'admin' && password == 'admin'){
        return done(null,{username: username, id:Date.now()})
     }else{
        return done(null,false,{message: 'Invalid username or password'})
     }
    }
  ));

passport.serializeUser((user,done)=>{
    return done(null,user)
})

passport.deserializeUser((user,done)=>{
    return done(null,user)
})
