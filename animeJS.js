let currentCharacterIndex = 0;
let characters = [];

document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput) {
        const apiUrl = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(searchInput)}&limit=5`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                characters = data.data;
                if (characters.length > 0) {
                    currentCharacterIndex = 0;
                    displayCharacter(characters[currentCharacterIndex]);
                    document.getElementById('navigationButtons').style.display = characters.length > 1 ? 'block' : 'none';
                } else {
                    displayError("Character not found.");
                    document.getElementById('navigationButtons').style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching the character data:', error);
                displayError("Failed to retrieve character data.");
            });
    } else {
        displayError("Please enter a character name.");
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    clearDisplay();
});

document.getElementById('prevButton').addEventListener('click', function() {
    if (characters.length > 0 && currentCharacterIndex > 0) {
        currentCharacterIndex--;
        displayCharacter(characters[currentCharacterIndex]);
    }
});

document.getElementById('nextButton').addEventListener('click', function() {
    if (characters.length > 0 && currentCharacterIndex < characters.length - 1) {
        currentCharacterIndex++;
        displayCharacter(characters[currentCharacterIndex]);
    }
});

function displayCharacter(character) {
    const characterDisplay = document.getElementById('characterDisplay');
    characterDisplay.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.images.jpg.image_url}" alt="${character.name}">
        <p>${character.about ? character.about : "No additional information available."}</p>
    `;
}

function displayError(message) {
    const characterDisplay = document.getElementById('characterDisplay');
    characterDisplay.innerHTML = `<p style="color: red;">${message}</p>`;
    document.getElementById('navigationButtons').style.display = 'none';
}

function clearDisplay() {
    const characterDisplay = document.getElementById('characterDisplay');
    characterDisplay.innerHTML = ''; // Clear the displayed content
    document.getElementById('searchInput').value = ''; // Clear the input field
    document.getElementById('navigationButtons').style.display = 'none'; // Hide navigation buttons
}
