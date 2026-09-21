async function getAnimalFact() {
    const factbox = document.getElementById('animal-fact');
    factbox.innerText = 'Facts are loading from api...';
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        factbox.innerText = data.fact;
    }
    catch (error) {
        console.error('Error fetching animal fact:', error);
        factbox.innerText = 'Failed to load fact. Please try again later.';
    }
}