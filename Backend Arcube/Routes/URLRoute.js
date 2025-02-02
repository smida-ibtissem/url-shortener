const express = require("express");
const shortid = require("shortid");
const Url = require("../Models/urlModel");

const router = express.Router();

// POST /shorten - Shorten a URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "URL is required" });

  try {
    let url = await Url.findOne({ originalUrl });

    if (!url) {
      const shortId = shortid.generate();
      url = new Url({ originalUrl, shortId });
      await url.save();
    }

    res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortId}` });  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /:shortId - Redirect to the original URL
router.get("/:shortId", async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;