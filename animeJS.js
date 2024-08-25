document.getElementById('searchButton').addEventListener('click', function() {
    /* Store data here */ = document.getElementById('searchInput').value.trim();
    if (searchInput) {
        /* Store data here II */ = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(/*Handle data stored here*/)}&limit=1`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const character = data.data[0];
                if (character) {
                    /* Pick the HTML in which data will be displayed and store it. */
                    characterDisplay.innerHTML = `
                        <h2>${character.name}</h2>
                        <img src="${character.images.jpg.image_url}" alt="${character.name}">
                        <p>${character.about ? character.about : "No additional information available."}</p>
                    `;
                } else {
                    displayError("Character not found.");
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

function displayError(message) {
    const characterDisplay = document.getElementById('characterDisplay');
    characterDisplay.innerHTML = `<p style="color: red;">${message}</p>`;
}
