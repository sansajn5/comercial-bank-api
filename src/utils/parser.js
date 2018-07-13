const fs = require('mz/fs')
const parseString = require('xml2js').parseString;

const parseFromXML = async(name) => {
    return await fs.readFile(`${__dirname}/../../db/input/${name}`)
    .then(data => {
        return data.toString();
    })
    .then(data2 => {
        let cbContent;
        parseString(data2, (err, result) => {
            cbContent = result.analyticsOfStatements
        })
        return cbContent
    })
    .then(data3 => data3)
    .catch(err => console.log(err))
}


module.exports = {
    parseFromXML
}