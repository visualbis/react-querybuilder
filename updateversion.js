const fs = require('fs');
let packageJSON = require('./package.json');

const buildNumber = process.env.buildNumber || '';
const branch = process.env.branch || '';



function getVersion() {
    let version = packageJSON.version;

    if (buildNumber) {
        version = version.replace(/-rc\w*/g, '');
        const versionParts = version.split('.');
        versionParts[2] = versionParts[2] + (branch == "development" ? '-rc' + buildNumber : '-alpha' + buildNumber);
        version = versionParts.join('.');
    }
    return version;
}

function updateVersionNumber() {
    const versionNumber = getVersion();
    packageJSON.version = versionNumber;
    fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 4));
}

function logVersionNumber() {
    console.log(`yarn install @visualbi/react-querybuilder@${packageJSON.version}`.blue);
}

async function main() {
    updateVersionNumber();
    logVersionNumber();

}

main();