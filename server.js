var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs').promises;

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.get('/state',
    async function (req, res) {
        res.send(await getStateFromFile(path.join(__dirname, 'sampleFile.md'))
        )
    }
)

async function getStateFromFile(filePath) {
    var fileData = await fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
    })
    console.log(fileData)
    var prompt = fileData.split('___')[0]

    var options = fileData.split('___')[1]
    options = options.trim('\r')
    options = options.split('\n')
    options = options.map(element => element.trim('\r'))
    options = options.map(element => element.replace(/[\[\]']+/g, ''))
    options = options.map(i => i + '.md');

    return { prompt, options }
}

app.listen(80);
console.log('Listening on port 80');