const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

// console.log(path.join(__dirname, 'sampleFile.md'))

function startGame() {
    fetch('/state')
    .then(response => response.json())
    .then(data => { textElement.innerText = data.prompt })
}


startGame()