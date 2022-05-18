import sqlite3 from "sqlite3";

const blogDB = new sqlite3.Database("./db/blogDB.sqlite");

blogDB.run(
  `CREATE TABLE IF NOT EXISTS
posts(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    author TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
  (error) => {
    if (error) throw error;
  }
);

export default blogDB;
