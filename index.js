import express from "express";
import pg from "pg";

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'book-notes',
    password: '123456',
    port: 5432
});
db.connect();

var app = express();
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");
const port = 3000;

// GET the main page
app.get("/", async(req, res) => {
    const result = await db.query("SELECT * FROM books");
    res.render("index.ejs", {books: result.rows});
});

// GET books sorted by either title, date or rating
app.get("/books", async(req, res) =>{
    var sortType = req.query.sort;
    if(sortType == "date"){
        const result = await db.query("SELECT * FROM books ORDER BY date DESC");
        res.render("index.ejs", {books: result.rows});
    }
    if(sortType == "rating"){
        const result = await db.query("SELECT * FROM books ORDER BY rating DESC");
        res.render("index.ejs", {books: result.rows});
    }
    if(sortType == "title"){
        const result = await db.query("SELECT * FROM books ORDER BY title ASC");
        res.render("index.ejs", {books: result.rows});
    }
});

app.listen(port, ()=>{
    console.log(`Sever running on http://localhost:${port}`);
});