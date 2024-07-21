document.addEventListener('DOMContentLoaded', () => {
    const adsContainer = document.getElementById('ads');
    const sortOrderSelect = document.getElementById('sort-order');

    let ads = JSON.parse(localStorage.getItem('ads')) || [];

    sortOrderSelect.addEventListener('change', () => {
        const sortOrder = sortOrderSelect.value;
        displayAds(sortOrder);
    });

    function displayAds(sortOrder) {
        adsContainer.innerHTML = ''; // Clear current ads

        const sortedAds = ads.slice().sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        sortedAds.forEach(ad => {
            const adContainer = document.createElement('div');
            adContainer.classList.add('ad');

            const adType = document.createElement('div');
            adType.classList.add('type', ad.type === 'support-request' ? 'support-request' : 'can-support');
            adType.textContent = ad.type === 'support-request' ? 'Support Needed' : 'Can Help';

            const adName = document.createElement('div');
            adName.classList.add('name');
            adName.textContent = `Name: ${ad.name}`;

            const adAge = document.createElement('div');
            adAge.classList.add('age');
            adAge.textContent = `Age: ${ad.age}`;

            const adContact = document.createElement('div');
            adContact.classList.add('contact');
            adContact.textContent = `Contact: ${ad.contact}`;

            const adDescription = document.createElement('div');
            adDescription.classList.add('description');
            adDescription.innerHTML = `<strong>About:</strong> ${ad.description}`;

            const adAmount = document.createElement('div');
            adAmount.classList.add('amount');
            adAmount.textContent = `Total Budget: ${ad.amount}`;

            const adFooter = document.createElement('div');
            adFooter.classList.add('ad-footer');

            const adDate = document.createElement('div');
            adDate.classList.add('date');
            adDate.textContent = `Date: ${new Date(ad.timestamp).toLocaleString()}`;

            adContainer.appendChild(adType);
            adContainer.appendChild(adName);
            adContainer.appendChild(adAge);
            adContainer.appendChild(adContact);
            adContainer.appendChild(adDescription);
            adContainer.appendChild(adAmount);
            adContainer.appendChild(adFooter);

            adFooter.appendChild(adDate);

            adsContainer.appendChild(adContainer);
        });
    }

    displayAds('newest'); // Default sorting
});
