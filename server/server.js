import express from "express";
import cors from "cors";
import words from "./words.js";
const PORT=4000;
const app = express();

app.use(cors());

app.get("/words", (req, res) => {
    res.json(words);

})
app.get("/search", (req, res) => {
    const searchWord = req.query.word.trim().toLowerCase(); 
    const foundKey = Object.keys(words).find(key => key.toLowerCase() === searchWord); 
    const definition = words[foundKey]; 

    if (definition) {
        res.json({ word: foundKey, definition }); 
    } else {
        res.status(404).json({ error: "Word not found" }); 
    }
});
app.get("/suggestions", (req, res) => {
    const prefix = req.query.pre.trim().toLowerCase(); 
    
    if (prefix.length === 0) {
      res.json({ suggestions: [] });
    } else {
      const suggestions = Object.keys(words).filter((word) =>
        word.toLowerCase().startsWith(prefix)
      ); 
  
      res.json({ suggestions });
    }
  });

app.listen(PORT, () => console.log("Server started on port ", PORT))