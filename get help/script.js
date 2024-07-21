document.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('type');
    const form = document.getElementById('ad-form');
    const adsContainer = document.getElementById('ads');
    const sortOrderSelect = document.getElementById('sort-order');
    
    typeSelect.addEventListener('change', updateFormFields);
    
    function updateFormFields() {
        const selectedType = typeSelect.value;
        const extraFieldsContainer = document.getElementById('extra-fields');
        extraFieldsContainer.innerHTML = '';

        if (selectedType === 'support-request') {
            extraFieldsContainer.innerHTML = `
                <input type="date" id="birthdate" placeholder="Birthdate" required>
                <textarea id="project-info" placeholder="Provide information about the project" required></textarea>
                <input type="number" id="estimated-amount" placeholder="Estimated amount" required>
            `;
        } else if (selectedType === 'can-support') {
            extraFieldsContainer.innerHTML = `
                <input type="date" id="birthdate" placeholder="Birthdate" required>
                <textarea id="reason" placeholder="Why do you want to help?" required></textarea>
                <input type="number" id="budget" placeholder="Your budget" required>
            `;
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const birthdate = document.getElementById('birthdate').value;
        const contact = document.getElementById('contact').value;
        const type = document.getElementById('type').value;
        const timestamp = new Date().toISOString(); // Current timestamp

        const age = calculateAge(birthdate);
        
        let description;
        let amount;
        if (type === 'support-request') {
            description = document.getElementById('project-info').value;
            amount = document.getElementById('estimated-amount').value;
        } else if (type === 'can-support') {
            description = document.getElementById('reason').value;
            amount = document.getElementById('budget').value;
        }

        const ad = {
            name,
            age,
            contact,
            description,
            amount,
            type,
            timestamp
        };

        // Save ad to localStorage
        saveAdToLocalStorage(ad);

        // Show notification
        alert('Ad submitted!');

        // Clear the form
        form.reset();
        updateFormFields(); // Reset extra fields

        // Display the updated ads
        displayAds('newest');
    });

    updateFormFields(); // Initialize form fields based on default selection

    sortOrderSelect.addEventListener('change', () => {
        const sortOrder = sortOrderSelect.value;
        displayAds(sortOrder);
    });

    function displayAds(sortOrder) {
        adsContainer.innerHTML = ''; // Clear current ads

        const ads = JSON.parse(localStorage.getItem('ads')) || [];

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
            adDate.textContent = `Date: ${new Date(ad.timestamp).toLocaleString('en-GB')}`;

            adFooter.appendChild(adDate);

            adContainer.appendChild(adType);
            adContainer.appendChild(adName);
            adContainer.appendChild(adAge);
            adContainer.appendChild(adContact);
            adContainer.appendChild(adDescription);
            adContainer.appendChild(adAmount);
            adContainer.appendChild(adFooter);

            adsContainer.appendChild(adContainer);
        });
    }

    displayAds('newest'); // Default sorting

    // Save ad to localStorage
    function saveAdToLocalStorage(ad) {
        const ads = JSON.parse(localStorage.getItem('ads')) || [];
        ads.push(ad);
        localStorage.setItem('ads', JSON.stringify(ads));
    }

    // Calculate age based on birthdate
    function calculateAge(birthdate) {
        const birthDate = new Date(birthdate);
        const difference = Date.now() - birthDate.getTime();
        const ageDate = new Date(difference);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
});
function resetLocalStorage() {
    localStorage.removeItem('ads');
    ads = [];
    displayAds();
    alert("Tüm ilanlar başarıyla silindi!");
}