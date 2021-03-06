const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    var reqDate = new Date().toString();
    var log = (`${reqDate}: ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("error");
        }
    })
    next();
});

// app.use((req,res,next)=>{
//     res.render("maintenance.hbs");
// })

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("css", () => {
    const css =
        `
        body {
            background-color: black;
            color: white;
        }
        `

    return css
});

app.get('/', (req, res) => {
    res.render("home.hbs", {
        pageTitle: "hello helo",
        date: new Date(),
        img: `
        http://cdn2.spiegel.de/images/image-1389679-300_poster_16x9-nryv-1389679.jpg
        `


    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {

    })

})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: `unable to handle request`,
    })
});

app.listen(port, () => {
    console.log(`server is up at port ${port}`);
});