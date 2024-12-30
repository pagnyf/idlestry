import { calculateTimeDifference, displayVersion } from './helpers.js';

let state = {
    "money": {
        "value": 500,
        "valueDigits": 0,
        "isUnlocked": true,
        "price": function(level){return 0;}
    },
    "wood": {
        "value": 0,
        "valueDigits": 0,
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
        "valueDigits": 0,
        "isUnlocked": false,
        "price": function(level){return 10;}
    },
    "wood-price": {
        "value": 1,
        "valueDigits": 0,
        "isUnlocked": false,
        "price": function(level){return 10;}
    }
}

let time_state = {
    "startTime": new Date(),
    "ticksPerSecond": 20
}

main();


export function main(){
    console.log("Starting game");

    loadScreen();
    setInterval(mainTickLoop, 1000 / time_state.ticksPerSecond);
    setInterval(updateScreen, 50);
}


function loadScreen(){

    displayVersion();
    //Add button key press to all html elements with corresponding id
    for (let resource in state) {
        const buyButton = document.getElementById(resource + "-button");
        if (buyButton){
            buyButton.addEventListener('click', function () {
                const level = state[resource].value;
                if (state.money.value >= state[resource].price(level)){
                    state[resource].value += 1;
                    state.money.value -= state[resource].price(level);
                }
            });
        }
        const sellButton = document.getElementById(resource + "-sell-button");
        if (sellButton){
            sellButton.addEventListener('click', function () {
                const resource_amount = state[resource].value;
                if (resource_amount >= 0){
                    state[resource].value -= resource_amount;
                    state.money.value += resource_amount * state[resource + "-price"].value;
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
    for (let resource in state) {
        if (state[resource].production){
            const target_resource = state[resource].production;
            const increase_per_tick = state[resource].value * state[resource].efficiency / time_state.ticksPerSecond;
            // Add integer part to resource value
            state[target_resource].value += Math.trunc(increase_per_tick);
            // Add floating part to resource digits value
            state[target_resource].valueDigits += increase_per_tick % 1;
            if (Math.abs(state[target_resource].valueDigits) >= 1){
                state[target_resource].value += Math.trunc(state[target_resource].valueDigits);
                state[target_resource].valueDigits -= Math.trunc(state[target_resource].valueDigits);
            }
        }
    }
}

function updateScreen(){
    for (let resource in state) {
        document.getElementById(resource).innerHTML = state[resource].value;
    }
}


