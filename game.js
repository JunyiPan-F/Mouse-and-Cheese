import fs from 'fs';
import express from 'express';
import fetch from "node-fetch";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import path from 'path';
const app = express();

app.use(express.static(__dirname + '/public'))
app.listen(3000, () =>
  console.log("Starting up Mouse and Cheese!"),
);

var arr = [];

function selectWord(){
    console.log("Starting game.js");
    //read text file
    // var array = fs.readFileSync('./public/dictionary/usa.txt', 'utf-8').toString().split("\n");
    const contents = fs.readFileSync('./public/dictionary/20k.txt', 'utf-8');
    let resultArray = [];
    resultArray = contents.split(/\r?\n/).filter(element => element);
    // arr = contents.split(/\r?\n/);
    arr = resultArray;
    // console.log(arr[0]);
}

app.get('/word', (req, res) => {
    console.log("Starting word");
    //a random number
    var rand = 0;
    rand = Math.floor(Math.random() * arr.length);
    // let word = arr[rand];
    // while(word.length < 5){
    //     rand = Math.floor(Math.random() * arr.length);
    //     word = arr[rand];
    // }

    console.log(arr[rand]);
    res.end(arr[rand]);
});

selectWord();