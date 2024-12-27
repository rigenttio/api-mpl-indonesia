import fetchService from "../services/index.js";
import * as cheerio from "cheerio";

export const getAllStatisticTeam = async (req, res) => {
  try {
    const response = await fetchService("/statistics", res);
    const $ = cheerio.load(response);
    const element = $(".table-team-statistics tbody");
    let data = [];
    element.find("tr").each((i, el) => {
      let name = $(el).find("td").eq(0).find(".team-name .d-none").text().trim();
      let logo = $(el).find("td").eq(0).find(".team-logo img").attr("src");
      let kills = $(el).find("td").eq(1).text().trim();
      let deaths = $(el).find("td").eq(2).text().trim();
      let assists = $(el).find("td").eq(3).text().trim();
      let gold = $(el).find("td").eq(4).text().trim();
      let damage = $(el).find("td").eq(5).text().trim();
      let lord = $(el).find("td").eq(6).text().trim();
      let tortois = $(el).find("td").eq(7).text().trim();
      let tower = $(el).find("td").eq(8).text().trim();

      data.push({
        team: {
          name,
          logo,
        },
        kills,
        deaths,
        assists,
        gold,
        damage,
        lord,
        tortois,
        tower,
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

export const getAllStatisticPlayer = async (req, res) => {
  try {
    const response = await fetchService("/statistics", res);
    const $ = cheerio.load(response);
    const element = $(".table-players-statistics tbody");
    let data = [];
    element.find("tr").each((i, el) => {
      let teamName = $(el)
        .find("td")
        .eq(0)
        .find("img")
        .attr("src")
        .match(/\/data\/teams\/(.*?)(?:\-|$)/)[1];
      let logo = $(el).find("td").eq(0).find("img").attr("src");
      let name = $(el).find("td").eq(0).find(".player-name").text().trim();
      let lanes = $(el).find("td").eq(1).text().trim();
      let total_games = $(el).find("td").eq(2).text().trim();
      let total_kills = $(el).find("td").eq(3).text().trim();
      let avg_kills = $(el).find("td").eq(4).text().trim();
      let total_deaths = $(el).find("td").eq(5).text().trim();
      let avg_deaths = $(el).find("td").eq(6).text().trim();
      let total_assists = $(el).find("td").eq(7).text().trim();
      let avg_assists = $(el).find("td").eq(8).text().trim();
      let avg_kda = $(el).find("td").eq(9).text().trim();
      let kill_participation = $(el).find("td").eq(10).text().trim();

      data.push({
        player: {
          name,
          team: {
            name: teamName,
            logo,
          },
        },
        lanes,
        total_games,
        total_kills,
        avg_kills,
        total_deaths,
        avg_deaths,
        total_assists,
        avg_assists,
        avg_kda,
        kill_participation,
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
