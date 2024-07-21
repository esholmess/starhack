let ads = JSON.parse(localStorage.getItem('ads')) || [];

function showForm(type) {
    const form = document.getElementById('form');
    const conditionalFields = document.getElementById('conditional-fields');
    form.style.display = 'block';
    conditionalFields.innerHTML = '';

    if (type === 'need-help') {
        const projectLabel = document.createElement('label');
        projectLabel.setAttribute('for', 'project');
        projectLabel.innerText = 'Proje Bilgisi:';
        const projectInput = document.createElement('input');
        projectInput.type = 'text';
        projectInput.id = 'project';
        projectInput.className = 'input-field';
        conditionalFields.appendChild(projectLabel);
        conditionalFields.appendChild(projectInput);
    } else if (type === 'help') {
        const personalLabel = document.createElement('label');
        personalLabel.setAttribute('for', 'personal');
        personalLabel.innerText = 'Kişisel Bilgi:';
        const personalInput = document.createElement('input');
        personalInput.type = 'text';
        personalInput.id = 'personal';
        personalInput.className = 'input-field';
        conditionalFields.appendChild(personalLabel);
        conditionalFields.appendChild(personalInput);
    }

    form.dataset.type = type;
}

function submitForm() {
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const budget = document.getElementById('budget').value;
    const email = document.getElementById('email').value;
    const type = document.getElementById('form').dataset.type;
    const projectOrPersonal = type === 'need-help' ? document.getElementById('project').value : document.getElementById('personal').value;
    const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    const ad = { name, dob, budget, email, date, type, projectOrPersonal };
    ads.push(ad);
    localStorage.setItem('ads', JSON.stringify(ads));
    alert("İlan başarıyla verildi!");
    document.getElementById('form').reset();
    document.getElementById('form').style.display = 'none';
}

function displayAds() {
    const adsContainer = document.getElementById('ads');
    adsContainer.innerHTML = '';

    ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.classList.add(ad.type === 'need-help' ? 'need-help' : 'help');
        adElement.innerHTML = `
            <p><strong>İsim:</strong> ${ad.name}</p>
            <p><strong>Doğum Tarihi:</strong> ${ad.dob}</p>
            <p><strong>${ad.type === 'need-help' ? 'Proje Bilgisi' : 'Kişisel Bilgi'}:</strong> ${ad.projectOrPersonal}</p>
            <p><strong>Toplam Bütçe Miktarı:</strong> ${ad.budget}</p>
            <p><strong>E-posta:</strong> ${ad.email}</p>
            <p><strong>İlanın Verilme Tarihi:</strong> ${ad.date}</p>
        `;
        adsContainer.appendChild(adElement);
    });
}

function sortAds(order) {
    if (order === 'newest') {
        ads.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        ads.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    displayAds();
}

function resetLocalStorage() {
    localStorage.removeItem('ads');
    ads = [];
    displayAds();
    alert("Tüm ilanlar başarıyla silindi!");
}

if (window.location.pathname.includes('ads.html')) {
    displayAds();
}
