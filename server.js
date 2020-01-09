const express = require("express");
const httpError = require("http-errors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");
const boom = require("express-boom");

const app = express();
const config = require("./config/config");
const routes = require("./routes/index.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(boom());

app.use("/api/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.boom.notFound(); // Responds with a 404 status code
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

app.listen(config.port, () => {
  console.info(`server started on port ${config.port})`);
});
