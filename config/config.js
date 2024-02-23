const logger = require("../utils/logger");
module.exports = {
    MONGODB: {
        DB_CONNECTION: process.env.DB_CONNECTION || "mongodb",
        DB_HOST: process.env.DB_HOST || "localhost",
        DB_PORT: process.env.DB_PORT == "" ? process.env.DB_PORT : process.env.DB_PORT ? `:${process.env.DB_PORT}` : `:27017`,
        DB_DATABASE: process.env.DB_DATABASE || "",
        DB_USERNAME: process.env.DB_PASSWORD ? `${process.env.DB_USERNAME}:` : "",
        DB_PASSWORD: process.env.DB_PASSWORD ? `${process.env.DB_PASSWORD}@` : ""
    },

    PORT: process.env.PORT || 8000,

    JWT: {
        SECRET_KEY: process.env.SECRET_KEY || 'eyJjbGciOiJIUzI1NiIInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5b',
        JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE || '1d'
    },

}

