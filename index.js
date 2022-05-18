import express from "express";
import blogDB from "./db/blogDB.js";

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello there!"));

app.get("/posts", (req, res) => {
  blogDB.all("SELECT * FROM posts;", (error, rows) => {
    if (error) {
      res.json({ error: error.message });
    }
    res.json(rows);
  });
});

app.post("/posts", (req, res) => {
  const {
    body: { title, body, author },
  } = req;
  if (!title || !body || !author) {
    return res.status(400).json({ error: "Nope!" });
  }
  blogDB.run(
    `INSERT INTO 
            posts (title, body, author)
            values ($title, $body, $author)
            `,
    {
      $title: title,
      $body: body,
      $author: author,
    },

    function (error) {
      if (error) {
        res.json({ error: error.message });
      }
      blogDB.get(
        "SELECT * FROM posts WHERE id = $id",
        { $id: this.lastID },
        (error, row) => {
          if (error) {
            res.json({ error: error.message });
          }
          res.json(row);
        }
      );
    }
  );
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
