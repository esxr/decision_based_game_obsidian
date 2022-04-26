const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

// console.log(path.join(__dirname, 'sampleFile.md'))
var state = {}

async function getState() {
    // delete all option buttons
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    fetch('/state')
        .then(response => response.json())

        // populate prompt
        .then(data => { textElement.innerText = data.prompt; return data })

        // populate options
        .then(data => {
            // set option-buttons from the data
            data.options.forEach(option => {

                // create option button
                const button = document.createElement('button');
                button.classList.add('btn');
                button.classList.add('btn-one');
                button.innerText = option;

                button.addEventListener('click', async () => {
                    var res = await changeState(option)
                    await getState()
                });
                optionButtonsElement.appendChild(button);
            });
        })
}

async function changeState(opt) {
    let option = opt

    // handle finish
    if (option == 'finish') {
        // insert code to finish
        option = 'start'
    }

    // handle retry
    if (option == 'retry') {
        // insert code to finish
        option = 'start'
    }

    await fetch('/state', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filePath: option })
    }).then(res => {
        if (res.status == 200) return true
    })
}

function startGame() {
    getState()

    // reset game on reload
    window.onbeforeunload = async function () {
        await changeState('start')
    }
}


startGame()