import { calculateTimeDifference } from './helpers.js';

let state = {
    "money": {
        "value": 200,
        "isUnlocked": true,
        "price": function(level){return 0;}
    },
    "wood": {
        "value": 0,
        "isUnlocked": true,
        "price": function(level){return 0;}
    },
    "chopper": {
        "value": 0,
        "isUnlocked": false,
        "price": function(level){return 10 + 5 * level;},
        "production": "wood",
        "efficiency": 1
    },
    "seller": {
        "value": 0,
        "isUnlocked": false,
        "price": function(level){return 10;}
    },
    "wood-price": {
        "value": 1,
        "isUnlocked": false,
        "price": function(level){return 10;}
    }
}

let time_state = {
    "startTime": new Date()
}

main();


export function main(){
    console.log("Starting game");

    loadScreen();
    setInterval(mainTickLoop, 1000);
    setInterval(updateScreen, 50);
}


function loadScreen(){
    //Add button key press to all html elements with corresponding id
    for (let resource in state) {
        const buyButton = document.getElementById(resource + "-button");
        if (buyButton){
            buyButton.addEventListener('click', function () {
                const level = state[resource]["value"];
                if (state["money"]["value"] >= state[resource]["price"](level)){
                    state[resource]["value"] += 1;
                    state["money"]["value"] -= state[resource]["price"](level);
                }
            });
        }
        const sellButton = document.getElementById(resource + "-sell-button");
        if (sellButton){
            sellButton.addEventListener('click', function () {
                const resource_amount = state[resource]["value"];
                if (resource_amount >= 0){
                    state[resource]["value"] -= resource_amount;
                    state["money"]["value"] += resource_amount * state[resource + "-price"]["value"];
                }
            });
        }
    }
}

function mainTickLoop(){
    const currentTime = new Date();
    const inGameTimeString = calculateTimeDifference(time_state.startTime, currentTime);
    console.log("Current time elapsed: " + inGameTimeString);
    //console.log(state);
    for (let resource in state) {
        if (state[resource]["production"]){
            const target_resource = state[resource]["production"];
            state[target_resource]["value"] += Math.round(
                state[resource]["value"] * state[resource]["efficiency"]
            );
        }
    }
}

function updateScreen(){
    for (let resource in state) {
        document.getElementById(resource).innerHTML = state[resource]["value"];
    }
}


