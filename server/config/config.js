const env = process.env.NODE_ENV || 'development'; // if NODE_ENV does not exist, default will be 'development'

// NODE_ENV is set on by Heroku!

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  Object
    .keys(envConfig)
    .forEach(key => process.env[key] = envConfig[key]);
}

