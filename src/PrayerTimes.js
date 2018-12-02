import axios from "axios";
import cheerio from "cheerio";
import qs from "qs";

// config
const API = "https://www.muslimpro.com/";
const data = {
  country_code: "ID",
  country_name: "Indonesia",
  city_name: undefined
};

const PrayerTimes = app => {
  let loadTimes = req => {
    data.coordinates = req.params.coordinates;
    let url = `${API}${data.country_code.toLowerCase()}/search?${qs.stringify(
      data
    )}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, { timeout: 7000 })
        .then(res => {
          let $ = cheerio.load(res.data);
          let times = $("table.prayer-times>tbody>tr#today>td");
          let degree = $("ul.qibla-direction>li>p.degree");
          let json = {
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
        })
        .catch(function(err) {
          resolve({ error: "timeout", err: err });
        });
    });
  };
  app.get("/:coordinates", (req, res) => {
    loadTimes(req).then(data => {
      res.json(data);
    });
  });
};

export default PrayerTimes;
