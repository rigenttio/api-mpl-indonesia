import fetchService from "../services/index.js";
import * as cheerio from "cheerio";

export const getAllStanding = async (req, res) => {
  try {
    const response = await fetchService("/schedule", res);
    const $ = cheerio.load(response);
    const element = $(".table tbody");
    let data = [];
    element.find("tr").each((i, el) => {
      let rank = $(el).find("div.team-rank").text().trim();
      let logo = $(el).find("div.team-logo").children("img").attr("src");
      let name = $(el).find("div.team-name").children("span.d-none").text().trim();
      let matchPoint = $(el).find("td").eq(1).text().trim();
      let matchWL = $(el).find("td").eq(2).children("div").text().trim().replace(/\s+/g, " ");
      let netGameWin = $(el).find("td").eq(3).text().trim();
      let gameWl = $(el).find("td").eq(4).text().trim().replace(/\s+/g, " ");

      data.push({
        rank,
        team: {
          name,
          logo,
        },
        match_point: matchPoint,
        match_wl: matchWL,
        net_game_win: netGameWin,
        game_wl: gameWl,
      });
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
