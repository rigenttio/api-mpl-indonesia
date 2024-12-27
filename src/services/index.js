import axios from "axios";
import { baseUrl } from "../config.js";

const fetchService = async (path, res) => {
  try {
    const response = await axios.get(`${baseUrl}${path}`);
    return response.data;
  } catch (error) {
    res.status(500).json({
      error: "Bad request",
      message: error.message,
      data: null,
    });
  }
};

export default fetchService;
