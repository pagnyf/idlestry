//This functions are only used server-side for development CI/CD
const fs=require('fs');

updateVersion();

function updateVersion(){
    
    fs.readFile('package.json', 'utf8', (err, data) => {
        if (err) {
          console.log("package.json version could not be updated");
          console.error(err);
          return;
        }
        const jsonData = JSON.parse(data);
        const versionParts = jsonData.version.split('.')
        const newVersion = versionParts.slice(0,-1).join('.')
            + '.' + (parseInt(versionParts.slice(-1)) + 1).toString();

        jsonData.version = newVersion;
        jsonData.lastUpdate = new Date().toISOString();

        fs.writeFile('package.json', JSON.stringify(jsonData,null,"  "), 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('package.json version updated successfully');
        });
    }); 
}

