import fetchService from "../services/index.js";
import * as cheerio from "cheerio";

export const getAllSchedule = async (req, res) => {
  try {
    const response = await fetchService("/schedule", res);
    const $ = cheerio.load(response);
    const element = $("div.outer-tabs-schedule");
    const length = element.children("div").length;
    let data = [];

    for (let i = 1; i <= length; i++) {
      let weeks = element.find(`#t-week-${i}`);
      let col = [];

      weeks.find("div.col-lg-4").each((i, el) => {
        let date = $(el).find("div.match.date").text().trim();
        let matches = [];

        $(el)
          .find(".match.position-relative")
          .each((i, el) => {
            let team1 = $(el).find(".team1");
            let team2 = $(el).find(".team2");
            let score = $(el).find(".score.font-primary");
            let time = $(el).find(".time .pt-1").text().trim();
            let replay = $(el).find("a.replay").attr("href");

            matches.push({
              team1: {
                name: team1.find(".name").text().trim(),
                logo: team1.find("img").attr("src"),
                score: score.eq(0).text().trim() ? score.eq(0).text().trim() : null,
              },
              team2: {
                name: team2.find(".name").text().trim(),
                logo: team2.find("img").attr("src"),
                score: score.eq(1).text().trim() ? score.eq(1).text().trim() : null,
              },
              time,
              replay: replay ? replay : null,
            });
          });

        col.push({
          date,
          matches,
        });
      });

      data.push({
        week: i,
        schedules: col,
      });
    }

    res.status(200).json({
      error: null,
      message: "Successful in getting data",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getScheduleByWeek = async (req, res) => {
  try {
    const week = req.params.week;
    const response = await fetchService("/schedule", res);
    const $ = cheerio.load(response);
    const element = $("div.outer-tabs-schedule");
    const length = element.children("div").length;
    if (isNaN(week) || week > length || week < 1) {
      return res.status(422).json({
        error: "Invalid week params",
        message: `Week params must be number and max value ${length}`,
        data: null,
      });
    }
    let data = [];
    const weeks = element.find(`#t-week-${week}`);
    let col = [];

    weeks.find("div.col-lg-4").each((i, el) => {
      let date = $(el).find("div.match.date").text().trim();
      let matches = [];

      $(el)
        .find(".match.position-relative")
        .each((i, el) => {
          let team1 = $(el).find(".team1");
          let team2 = $(el).find(".team2");
          let score = $(el).find(".score.font-primary");
          let time = $(el).find(".time .pt-1").text().trim();
          let replay = $(el).find("a.replay").attr("href");

          matches.push({
            team1: {
              name: team1.find(".name").text().trim(),
              logo: team1.find("img").attr("src"),
              score: score.eq(0).text().trim() ? score.eq(0).text().trim() : null,
            },
            team2: {
              name: team2.find(".name").text().trim(),
              logo: team2.find("img").attr("src"),
              score: score.eq(1).text().trim() ? score.eq(1).text().trim() : null,
            },
            time,
            replay: replay ? replay : null,
          });
        });

      col.push({
        date,
        matches,
      });
    });

    data.push({
      week: parseInt(week),
      schedules: col,
    });

    res.status(200).json({
      error: null,
      message: "Successful in getting data",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
