import { calculateTimeDifference } from './helpers.js';

let state = {
    "money": {
        "value": 200,
        "isUnlocked": true,
        "price": function(){return 10;}
    },
    "wood": {
        "value": 0,
        "isUnlocked": true,
        "price": function(){return 10;}
    },
    "chopper": {
        "value": 0,
        "isUnlocked": true,
        "price": function(){return 10;}
    }
}

let time_state = {
    "startTime": new Date()
}

main();

function updateScreen(){
    for (let resource in state) {
        document.getElementById(resource).innerHTML = state[resource]["value"];
    }
}

function loadScreen(){
    //Add button key press to all html elements
    for (let resource in state) {
        const buyButton = document.getElementById(resource + "-button");
        if (buyButton != null){
            buyButton.addEventListener('click', function () {
                if (state["money"]["value"] >= state[resource]["price"]()){
                    state[resource]["value"] += 1;
                    state["money"]["value"] -= state[resource]["price"]();
                }
            });
        }
    }
}

function mainTickLoop(){
    const currentTime = new Date();
    const inGameTimeString = calculateTimeDifference(time_state.startTime, currentTime);
    console.log("Current time elapsed: " + inGameTimeString);
    console.log(state);
    state.money.value += 1;
    
    //updateScreen();
}

export function main(){
    console.log("Starting game");

    loadScreen();
    setInterval(mainTickLoop, 1000);
    setInterval(updateScreen, 50);
}

