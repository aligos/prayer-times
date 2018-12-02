"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _PrayerTimes = _interopRequireDefault(require("./PrayerTimes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.server = _http.default.createServer(app);
app.use((0, _cors.default)());
app.use(_bodyParser.default.json({
  limit: "1024kb"
}));
(0, _PrayerTimes.default)(app);
app.server.listen(process.env.PORT || 3000);
console.log("PrayerTimes::: ".concat(app.server.address().port));