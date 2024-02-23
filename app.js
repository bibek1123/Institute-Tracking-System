
const express = require("express");
const router = express.Router()
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const { PORT } = require('./config/config');
const logger = require("./utils/logger");
const authenticate = require("./middleware/authenticate");
const util = require("./utils/messages");
const dbService = require('./utils/dbService');
const validate = require("./middleware/validate");

require("./db/connection");
global.util = util;
global.baseDir = __dirname;
global.logger = logger;
global.dbService = dbService;
global.authenticate = authenticate;
global.validate = validate;
global._ = require("lodash");

app.use(express.json());
app.use(require("./router/index"));

app.listen(PORT, () => {
  logger.info(`Server is running at PORT ${PORT}`);
});
