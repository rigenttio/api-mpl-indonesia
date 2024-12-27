import fetchService from "../services/index.js";
import * as cheerio from "cheerio";

export const getAllTeam = async (req, res) => {
  try {
    const response = await fetchService("/teams", res);
    const $ = cheerio.load(response);
    const element = $("div.d-flex.mt-xl-4");
    let data = [];
    element.find(".team-card-outer").each((i, el) => {
      let logo = $(el).find(".team-image").find("img").attr("src");
      let name = $(el).find(".team-name").text().trim();

      data.push({
        name,
        logo,
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

export const getRoasterByTeam = async (req, res) => {
  const teams = ["ae", "aura", "btr", "dewa", "evos", "geek", "onic", "rbl", "rrq"];
  try {
    const teamName = req.params.teamName.toLowerCase();
    if (!teams.includes(teamName)) {
      return res.status(422).json({
        error: "Invalid team name",
        message: `Team name must be one of: ${teams.join(" | ")}`,
        data: null,
      });
    }
    const response = await fetchService(`/team/${teamName}`, res);
    const $ = cheerio.load(response);
    const element = $("div.row");
    let data = [];
    element.find(".col-md-3.col-6").each((i, el) => {
      let image = $(el).find(".player-image-bg").find("img").attr("src");
      let name = $(el).find(".player-name").text().trim();
      let role = $(el).find(".player-role").text().trim();

      data.push({
        name,
        role,
        image,
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
