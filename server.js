const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3002;
const app = express();

// Set up Handlebars engine
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure session middleware
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 300000 },
  store: new (require('connect-session-sequelize')(session.Store))({
    db: sequelize,
  }),
};
app.use(session(sess));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use(routes);

// Start server and synchronize with database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
