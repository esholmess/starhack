document.getElementById('nasa-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const query = document.getElementById('query').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Önceki sonuçları temizle

    fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.collection && data.collection.items.length > 0) {
                data.collection.items.forEach(item => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.addEventListener('click', () => {
                        window.open(`https://images.nasa.gov/details-${item.data[0].nasa_id}`, '_blank');
                    });

                    const title = document.createElement('h3');
                    title.textContent = item.data[0].title;
                    resultItem.appendChild(title);

                    if (item.links && item.links[0].href) {
                        const img = document.createElement('img');
                        img.src = item.links[0].href;
                        resultItem.appendChild(img);
                    }

                    const description = document.createElement('p');
                    description.textContent = item.data[0].description || 'No description available';
                    resultItem.appendChild(description);

                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.textContent = 'No results found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsContainer.textContent = 'An error occurred. Please try again later.';
        });
});
