import fetchService from "../services/index.js";
import * as cheerio from "cheerio";

export const getAllTransfer = async (req, res) => {
  try {
    const response = await fetchService("/transfer", res);
    const $ = cheerio.load(response);
    const element = $("div.offset-lg-1 .position-relative");
    let data = [];
    element.find(".transfer-card").each((i, el) => {
      let date = $(el).find(".col-lg-2 .text-center").text().trim();
      let name = $(el).find(".col-lg-4 div div").eq(0).text().trim();
      let role = $(el).find(".col-lg-4 div div").eq(1).text().trim();
      let logo1 = $(el).find(".col-lg-6").find("img").eq(0).attr("src");
      let teamName1 = $(el).find(".col-lg-6").find(".team-name").eq(0).text().trim().replace(/\s+/g, " ");
      let logo2 = $(el).find(".col-lg-6").find("img").eq(1).attr("src");
      let teamName2 = $(el).find(".col-lg-6").find(".team-name").eq(1).text().trim().replace(/\s+/g, " ");

      data.push({
        date,
        player: {
          name,
          role,
        },
        from: {
          team_name: teamName1,
          logo: logo1 ? logo1 : null,
        },
        to: {
          team_name: teamName2,
          logo: logo2 ? logo2 : null,
        },
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
