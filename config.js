var config = {};
config.gmail = {};

config.gmail.user_name = process.env.GMAIL_USERNAME || "USERNAME";

config.gmail.password = process.env.GMAIL_PASSWORD || "PASSWORD";
config.gmail.to = process.env.GMAIL_TO || "TO_ADDRESS";

config.web = {};
config.web.port = process.env.PORT || 8080;
module.exports = config;