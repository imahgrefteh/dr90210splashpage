var config = {};

config.mailgun = {};
config.mailgun.api_key = process.env.MAILGUN_API_KEY || 'MAIL_GUN_API_KEY';
config.mailgun.domain = process.env.MAILGUN_DOMAIN || 'DOMAIN';
config.mailgun.from_who = process.env.MAILGUN_FROM_WHO || 'fromME';
config.mailgun.send_to = process.env.MAILGUN_TO || 'TO';

config.web = {};
config.web.port = process.env.PORT || 8080;
module.exports = config;