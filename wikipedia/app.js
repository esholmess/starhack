document.getElementById('nasa-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const query = document.getElementById('query').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`)
        .then(response => response.json())
        .then(data => {
            if (data.query && data.query.search.length > 0) {
                data.query.search.forEach(item => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');

                    const title = document.createElement('h3');
                    title.textContent = item.title;
                    resultItem.appendChild(title);

                    const snippet = document.createElement('p');
                    snippet.innerHTML = item.snippet + '...';
                    resultItem.appendChild(snippet);

                    const link = document.createElement('a');
                    link.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`;
                    link.textContent = 'Read more';
                    link.target = '_blank';
                    resultItem.appendChild(link);

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
