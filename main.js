import { calculateTimeDifference, displayVersion } from './helpers.js';

let state = {
    "money": {
        "value": 10000,
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

let place_state = {
    "bank": {
        "isUnlocked": true
    },
    "forest": {
        "isUnlocked": true
    },
    "shop": {
        "isUnlocked": false
    }
}

let time_state = {
    "startTime": new Date(),
    "ticksPerSecond": 20,
    "lastLogTime": new Date()
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
    //Logging state every 5 seconds
    if (((currentTime - time_state.lastLogTime) / 1000) >= 5){
        console.log(state);
        time_state.lastLogTime = currentTime;
        //console.log("Current time elapsed: " + inGameTimeString);
    }
    //Compute production for each resources
    for (let resource in state) {
        if (state[resource].production){
            const produced_resource = state[resource].production;
            const increase_per_tick = state[resource].value * state[resource].efficiency / time_state.ticksPerSecond;
            // Add integer part to produced resource value
            state[produced_resource].value += Math.trunc(increase_per_tick);
            // Add floating part to produced resource digits value
            state[produced_resource].valueDigits += increase_per_tick % 1;
            if (Math.abs(state[produced_resource].valueDigits) >= 1){
                state[produced_resource].value += Math.trunc(state[produced_resource].valueDigits);
                state[produced_resource].valueDigits -= Math.trunc(state[produced_resource].valueDigits);
            }
        }
    }
    checkUnlock();
}

function checkUnlock(){
    for (let resource in state) {
        if (state[resource].isUnlocked == false){
            switch (resource){
                case 'money':
                    //state[resource].isUnlocked == true;
                    break;
                case 'wood':
                    //state[resource].isUnlocked == true;
                    break;
                case 'chopper':
                    if (state["wood"].value >= 10){
                        state[resource].isUnlocked = true;
                        console.log(resource += " unlocked !");
                    }
                    break;
                case 'seller':
                    break;
                case 'wood-price':
                    break;
                default:
                    break;
            }
        }
    }
    for (let place in place_state) {
        if (place_state[place].isUnlocked == false){
            switch (place){
                case 'bank':
                    //state[resource].isUnlocked == true;
                    break;
                case 'forest':
                    //state[resource].isUnlocked == true;
                    break;
                case 'shop':
                    if (state["chopper"].value >= 10){
                        place_state[place].isUnlocked = true;
                        state["wood-price"].isUnlocked = true;
                        state["seller"].isUnlocked = true;
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

function updateScreen(){
    for (let resource in state) {
        document.getElementById(resource + '-value').innerHTML = state[resource].value;
        if (state[resource].isUnlocked == true){
            document.getElementById(resource).style.display = "block";
        } else if (state[resource].isUnlocked == false) {
            document.getElementById(resource).style.display = "none";
        }
    }
    for (let place in place_state) {
        if (place_state[place].isUnlocked == true){
            document.getElementById(place).style.display = "block";
        } else if (place_state[place].isUnlocked == false) {
            document.getElementById(place).style.display = "none";
        }
    }
}


