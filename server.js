var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs').promises;

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// state management
var state = {

}

function game() {
    state = getStateFromFile(path.join(__dirname, 'start'))
}

function changeState(option) {
    state = getStateFromFile(option)
}

function getCurrentState() {
    return state
}

app.get('/state',
    async function (req, res) {
        res.send(await getCurrentState())
    }
)

app.post('/state',
    async function (req, res) {
        if (req.body.filePath)
            changeState(req.body.filePath)

        res.sendStatus(200);
    }
)

async function getStateFromFile(filePath) {
    var fileData = await fs.readFile(filePath + '.md', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
    })
    console.log(fileData)
    var prompt = fileData.split('___')[0]

    var options = fileData.split('___')[1]

    // temp fix
    if (!options) return
    if (options.length > 1) {
        try {
            options = options.trim('\r')
        } catch (e) { }

        options = options.split('\n')
    }

    options = options.map(element => element.trim('\r'))
    options = options.map(element => element.replace(/[\[\]']+/g, ''))
    // options = options.map(i => i + '.md');

    return { prompt, options }
}

app.listen(80);
game()
console.log('Listening on port 80');