var word = "";
let percent_move = 0;
console.log("Starting script.js");
var trial = 0;
// String.prototype.replaceAt = function(index, replacement) {
//     return this.substring(0, index) + replacement + this.substring(index + replacement.length);
// }

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
function indexing(word,letter){
    let indexToReplace = [];
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) == letter) {
            indexToReplace.push(i);
        }
    }
    return indexToReplace;
}
function checkFinish(underlines,percent){
    if (underlines.includes("_")) {
        console.log("Game is not finished");
    }else{
        console.log("Game is finished");
        alert("You won!");
        trial += 1;
        while(document.getElementById("guessdiv").firstChild){
            console.log("in check statement")
            document.getElementById("guessdiv").removeChild(document.getElementById("guessdiv").firstChild);
            console.log("inner html" +document.getElementById("guessdiv").innerHTML)
        }
    }
    if(percent >= 100){
        alert("You lost!");
    }
}
function contains(word,letter){
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) == letter) {
            return true;
        }
    }
    return false;
}
function initiate(word,length){
    let num_given_letter = Math.ceil(length * 0.3);
    let ind_given_letter = [];
    for (let i = 0; i < num_given_letter; i++) {
        let rand = Math.floor(Math.random() * length);//give a random index in the word to be given
        while(ind_given_letter.includes(rand)){//if the index is already given, give another index
            rand = Math.floor(Math.random() * length);
        }
        ind_given_letter.push(rand);
    }
    let underlines = "";
    for (let i = 0; i < length; i++) {
        if (ind_given_letter.includes(i)) {
            underlines += word.charAt(i) + " ";
        }else{
            underlines += "_ ";
        }
    }
    return underlines;
}

function mouse_proceed(length){
    let num_given_chance = Math.floor(length * 0.5);
    var percent = 100/num_given_chance;
    return percent;
}

$.ajax(
    "/word",
    {type: "GET",
    dataType: "text",
    success: function (json) {
        word = json;
        trial += 1;
        // $("#underline").html(json)
    },
    error: function (jqXHR, textStatus, errorThrown) {
    alert("Error: " + jqXHR.responseText);
    alert("Error: " + textStatus);
    alert("Error: " + errorThrown);
    }
})
$("#start").on("click", function(e){
    document.getElementById("mouse").style.left =  "0%";
    console.log("Start button clicked");
    e.preventDefault();
    console.log("word: " + word);
    let length = word.length;
    var initiated = initiate(word,length);
    console.log("initiated: " + initiated);
    // add_stairs(length);
    $("#underline").text(initiated);
});

$("#check").on("click",() => {
    console.log("Checking");
    let input_letter = document.getElementById("input").value;
    let underlines = $("#underline").text();
    // console.log("input_letter: " + document.getElementById("input").value);
    // console.log("word: " + word);
    // console.log("word.includes(input_letter): " + word.includes(input_letter));
    // console.log("contains: " + contains(word,input_letter));
    let index = indexing(word,input_letter);
    if(contains(word,input_letter) != false){
        console.log("Letter is in word:" + word);
        //chech at which index does the letter appear
        console.log("index: " + index);
        //replace the underscore at that index with the letter
        console.log("before replace" + underlines);
        for (let i = 0; i < index.length; i++) {
            underlines = setCharAt(underlines,2*index[i],input_letter);
        }
        console.log("after replace" + underlines);
        $("#underline").html(underlines); 
        
    }else{
        console.log("Letter is not in word" + word);
        alert("Letter is not in word");
        $("#guessdiv").append( "<p>"+input_letter+"</p>");
        percent_move += mouse_proceed(word.length);
        if (percent_move >= 100) {
            percent_move = 88;
            document.getElementById("mouse").style.left = percent_move + "%";
            alert("You lost! The word was: " + word + "");
        }else{
            document.getElementById("mouse").style.left = percent_move + "%";
        }
    }
    $("#input").val("");
    checkFinish(underlines);
});

$("#restart").on("click",function(e){
    document.getElementById("mouse").style.left =  "0%";
    while(document.getElementById("guessdiv").firstChild){
        console.log("in check statement")
        document.getElementById("guessdiv").removeChild(document.getElementById("guessdiv").firstChild);
        console.log("inner html" +document.getElementById("guessdiv").innerHTML)
    }
    e.preventDefault();
    console.log("Start button clicked");
    $.ajax(
        "/word",
        {type: "GET",
        dataType: "text",
        success: function (json) {
            word = json;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + jqXHR.responseText);
        alert("Error: " + textStatus);
        alert("Error: " + errorThrown);
        }
    })
    let length = word.length;
    var initiated = initiate(word,length);
    $("#underline").text(initiated);
    console.log("check statement " + document.getElementById("guessdiv").firstChild);
    alert("Game restarted");
});


console.log("Ending script.js");


