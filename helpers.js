
export function calculateTimeDifference(date1, date2) {
    const diffMs = Math.floor((date2 - date1) / 1000); // seconds between dates

    const diffDays = Math.floor(diffMs / 86400); // days
    const diffHrs = Math.floor((diffMs % 86400) / 3600); // hours
    const diffMins = Math.floor(((diffMs % 86400) % 3600) / 60); // minutes
    const diffSecs = Math.floor(((diffMs % 86400) % 3600) % 60); // seconds

    return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes, "  + diffSecs + " seconds" ;
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
            versionDateElement.innerHTML = packageJson.lastUpdated;
        }
    });
}
