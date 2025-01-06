
export function loadScreen(state){
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

export function updateScreen(state, place_state){
    for (let resource in state) {
        console.log()
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

export function displayVersion(){
    const versionElement = document.getElementById("version");
    const versionDateElement = document.getElementById("version-date");

    fetch('package.json').then(
        response => response.json()
    ).then(function(packageJson){
        if (versionElement){
            versionElement.innerHTML = packageJson.version;
        }
        if (versionDateElement){
            const lastUpdate = new Date(packageJson.lastUpdate);
            const formattedDate = lastUpdate.toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              });
            versionDateElement.innerHTML = formattedDate;
        }
    });
}