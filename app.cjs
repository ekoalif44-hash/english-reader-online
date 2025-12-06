// app.cjs – server translate EN -> ID pakai MyMemory + Express
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// middleware
app.use(cors());
app.use(express.json());

// fungsi bantu pilih pasangan bahasa
function getLangPair(sourceLang) {
  // sekarang kita pakai Inggris -> Indonesia saja
  return "en|id";
}

app.post("/api/translate", async (req, res) => {
  try {
    const { text, sourceLang } = req.body || {};
    const cleanText = (text || "").trim();
    const lang = sourceLang || "en";

    if (!cleanText) {
      return res.status(400).json({ error: "Text kosong" });
    }

    const langpair = getLangPair(lang);
    const url =
      "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(cleanText) +
      "&langpair=" +
      langpair;

    const fetchRes = await fetch(url);
    if (!fetchRes.ok) {
      throw new Error("HTTP " + fetchRes.status);
    }

    const data = await fetchRes.json();
    const translated =
      data?.responseData?.translatedText || "(tidak ada hasil terjemahan)";

    res.json({
      sourceLang: lang,
      original: cleanText,
      translated: translated,
      raw: data,
    });
  } catch (err) {
    console.error("ERROR /api/translate:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

app.listen(PORT, () => {
  console.log("Translate server running at http://localhost:" + PORT);
});