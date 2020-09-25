const path = require('path')
const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const httpErrors = require('http-errors')
const cors = require('cors')
const passport = require('passport')
const persist = require('node-persist');
const request = require('request-promise');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const fileStore = sessionFileStore(session);
require('dotenv').config()
const gConfig = require('./config/google')
const indexRouter = require('./routes/index')
const onesRouter = require('./routes/typeones')
const authRouter = require('./routes/auth')
const apisRouter = require('./routes/apis')
const uploadRouter = require('./routes/upload')

const sessionMiddleware = session({
    resave: true,
    saveUninitialized: true,
    store: new fileStore({}),
    secret: 'photo frame sample',
  });
// const twosRouter = require('./routes/typetwos')

const app = express()

app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter)
app.use('/typeones', onesRouter)
app.use('/api/auth', authRouter)
app.use('/apis', apisRouter)
app.use('/upload', uploadRouter)
// app.use('/typetwos', twosRouter)

const gAuth = require('./config/gPassport');
gAuth(passport);

app.get('/auth/google', passport.authenticate('google', {
    scope: gConfig.scopes,
    failureFlash: true, 
    session: true,
  }));
  
app.get(
    '/auth/google/callback',
    passport.authenticate('google', {failureRedirect: 'http://localhost:3000', failureFlash: true, session: true}),
    (req, res) => {
      if (!req.user.name) {
        console.log(`redirecting from google login, name ${req.user.name} and gId ${req.user.gId}`)
        return res.redirect(`http://localhost:3000/google/${req.user.gId}`);
      }
      console.log(`user has logged in no update, name ${req.user.name} and gId ${req.user.gId}`)
      res.redirect('http://localhost:3000/addPhotos');
    });

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res, next) => next(httpErrors(404)))
app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app