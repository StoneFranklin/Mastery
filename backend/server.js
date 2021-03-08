require('dotenv').config({path: '../.env'});
const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

mongoose.connect(process.env.MONGO, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const userSchema = new Schema({
    googleID: String,
    skills: [
        {
            name: String, 
            totalSeconds: Number,
            dateLastPracticed: Date
        }
    ]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.BACK_END_URL}/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleID: profile.id }, function(err, user) {
            return done(err, user);
        });
    }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', 
    { 
        failureRedirect: `${process.env.FRONT_END_URL}/login`, 
        successRedirect: `${process.env.FRONT_END_URL}/skills` 
    })
);

app.get('/api/skills', function(req, res) {
    if(req.isAuthenticated()) {
        User.findById(req.user.id, function(err, foundUser) {
            if(err) {
                console.log(err);
            } else {
                if(foundUser) {
                    res.send(foundUser.skills);
                }
            }
        })
    } 
    else {
        console.log('redirecting to login');
        res.send('false');
    }
});

app.post('/api/skills', function(req, res) {
    const name = req.body.name;
    const newSkill = {
        name: name,
        totalSeconds: 0
    }

    if(req.isAuthenticated()) {
        User.findByIdAndUpdate(req.user.id, { $push: { skills: newSkill } }, function(err, foundUser) {
            if(err) {
                console.log(err);
            } else {
                res.send(foundUser);
            }
        });
    }
});

app.post('/api/skill', function(req,res) {
    User.findById(req.user.id, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {        
            foundUser.skills.forEach(item => {
                if(item.id === req.body.id) {
                    res.send(item);
                }
            });
        }
    });
});

app.patch('/api/skill', function(req, res) {
    User.updateOne({ 'skills._id': req.body.id }, { '$set': { 'skills.$.totalSeconds': req.body.newSeconds }}, function(err, doc) {
        if(err) {
            console.log(err);
        } 
    })
})


app.delete('/api/skills/:skillID', function(req, res) {
    User.findByIdAndUpdate(req.user.id, { $pull: { skills: { _id: req.params.skillID } } }, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            res.send(foundUser);
        }
    });
});

app.get('/api/skills/:skillID', function(req, res) {
    if(req.isAuthenticated()) {
        User.findById(req.user.id, function(err, foundUser) {
            if(err) {
                console.log(err);
            } else {        
                foundUser.skills.forEach(item => {
                    console.log('skill');
                    if(item.id === req.params.skillID) {
                        res.send(item);
                        console.log(item);
                    }
                });
            }
        });
    } else {
        res.send('false')
    }
})

app.get('/api/logout', function(req, res) {
    req.logout();
    res.send('logged out');
    if(req.isAuthenticated()) {
        console.log('Still logged in');
    } else {
        console.log('Logged out');
    } 
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server running on port 8080.');
})