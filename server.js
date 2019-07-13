const helmet = require('helmet');
const favicon = require('serve-favicon');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express();
app.use(
  bodyParser.json({
    type: ["json", "application/csp-report"]
  })
);

app.use(compression());
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

app.use(express.static(path.join(__dirname, "build")));
app.use(favicon(path.join(__dirname, "./build/favicon.ico")));

// app.post("/report-violation", (req, res) => {
//   if (req.body) {
//     console.log("CSP Violation: ", req.body);
//   } else {
//     console.log("CSP Violation: No data received!");
//   }
//   res.status(204).end();
// });

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, function() {
  console.log("The server is running on port", PORT);
});

