const bodyParser = require('body-parser');
const fs = require("fs");
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
var timeout = require('connect-timeout'); //express v4
const ComputerComponent = require('./controllers/ComputerComponent');
const SoundController = require('./controllers/SoundController');

var computer = new ComputerComponent();
var soundController = new SoundController();


const http = `http://${computer.getIp()}:${port}`

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(timeout(120000));
app.use(haltOnTimedout);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
}

app.get("/hello", (req, res) => {
    let data = fs.readFileSync('./assets/images.jpg');
    res.json({ hello: "Hello there", ip: http, name: "Adrikus server", image: "data:image/jpeg;base64," + data.toString("base64") });
    console.log("Anyone calls me");
});
app.get('/pause', (req, res) => res.json({ hello: computer.pressSpace() }));
app.get('/tabulator', (req, res) => res.json({ hello: computer.pressTabulator() }));
app.get('/right', (req, res) => res.json({ hello: computer.pressRight() }));
app.get('/left', (req, res) => res.json({ hello: computer.pressLeft() }));
app.get('/enter', (req, res) => res.json({ hello: computer.pressEnter() }));
app.get("/up", (req, res) => res.json({ hello: computer.pressUp() }));
app.get("/down", (req, res) => res.json({ hello: computer.pressDown() }));
app.get('/getVolume', (req, res) => res.json({ volume: soundController.getVolume() }));
app.get('/nextSong', (req, res) => res.json({hello: computer.nextSong()}));
app.get('/closeActualWindow', (req, res) => res.json({hello: computer.closeActualWindow()}));
app.get('/previousSong', (req, res) => res.json({hello: computer.previousSong()}));
app.get('/pauseAudio', (req, res) => res.json({hello: computer.pauseAudio()}));
app.post("/setVolume", (req, res) => {
    var volume = req.body.volume;
    soundController.setVolume(volume);
    res.json({ volume: soundController.getVolume() });
});
app.get('/moveMouseLeft', (req, res) => {
    res.json({hello: computer.moveMouseToLeft()});
});
app.get('/moveMouseRight', (req, res) => {
    res.json({hello: computer.moveMouseToRight()});
});
app.get('/moveMouseUp', (req, res) => {
    res.json({hello: computer.moveMouseToUp()});
});
app.get('/moveMouseDown', (req, res) => {
    res.json({hello: computer.moveMouseToDown()});
});
app.get('/rightClick', (req, res) => {
    res.json({hello: computer.rightClick()});
});
app.get('/leftClick', (req, res) => {
    res.json({hello: computer.leftClick()});
});

app.listen(port, () => console.log(`Example app listening on port ${http}!`));