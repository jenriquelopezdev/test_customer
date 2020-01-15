const Joi = require('@hapi/joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    SERVER_PORT: Joi.number()
        .default(4040),
    SQL_HOST: Joi.string().required()
        .description('DB host url'),
    SQL_USER: Joi.string().required()
        .description('DB host USER'),
    SQL_PASSWORD: Joi.string().required()
        .description('DB host PASS')
}).unknown()
    .required();

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    port: envVars.SERVER_PORT,
    db: {
        host: envVars.SQL_HOST,
        user: envVars.SQL_USER,
        pass: envVars.SQL_PASSWORD
    },
};

module.exports = config;
