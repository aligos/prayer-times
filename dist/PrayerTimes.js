"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config
var API = "https://www.muslimpro.com/";
var data = {
  country_code: "ID",
  country_name: "Indonesia",
  city_name: "undefined"
};

var PrayerTimes = function PrayerTimes(app) {
  var loadTimes = function loadTimes(req) {
    data.coordinates = req.params.coordinates;
    var url = "".concat(API).concat(data.country_code.toLowerCase(), "/search?").concat(_qs.default.stringify(data));
    return new Promise(function (resolve, reject) {
      _axios.default.get(url, {
        timeout: 7000
      }).then(function (res) {
        var $ = _cheerio.default.load(res.data);

        var times = $("table.prayer-times>tbody>tr#today>td");
        var degree = $("ul.qibla-direction>li>p.degree");
        var json = {
          qibla: degree.text(),
          day: times.eq(0).text(),
          Fajr: times.eq(1).text(),
          Sunrise: times.eq(2).text(),
          Dhuhr: times.eq(3).text(),
          Asr: times.eq(4).text(),
          Maghrib: times.eq(5).text(),
          Isha: times.eq(6).text()
        };
        resolve(json);
      }).catch(function (err) {
        resolve({
          error: "timeout",
          err: err
        });
      });
    });
  };

  app.get("/api/:coordinates", function (req, res) {
    loadTimes(req).then(function (data) {
      res.json(data);
    });
  });
  app.get("/", function (req, res) {
    res.send("Alhamdulillah");
  });
};

var _default = PrayerTimes;
exports.default = _default;