var config = {};
config.gmail = {};

config.gmail.user_name = process.env.gmail.user_name || "USERNAME";
config.gmail.password = process.env.gmail.password || "PASSWORD";
config.gmail.to = process.env.gmail.to || "TO_ADDRESS";

config.web = {};
config.web.port = process.env.WEB_PORT || 8080;
module.exports = config;