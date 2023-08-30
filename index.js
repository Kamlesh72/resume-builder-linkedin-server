import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.post("/api/get-linkedin-data", async (req, res, next) => {
  const data = req.body.params;
  try {
    const reqAxios = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      data,
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );
    const TOKEN = reqAxios.data.access_token;
    const userResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const userData = userResponse.data;
    res.send({ userData });
  } catch (err) {
    console.log("SOME ERROR OCCURRED");
    res.send({ userData: "" });
  }
});

app.listen(8080, () => {
  console.log("Server listening on PORT", 8080);
});
