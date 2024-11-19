document.addEventListener('DOMContentLoaded', () => {

    // Selectarea elementelor
    const contactForm = document.getElementById('contact-form');
    const response = document.getElementById('response');

    // Validarea datelor din formular
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validarea folosind expresii regulate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            response.textContent = 'Email invalid';
            response.style.color = 'red';
            return;
        }

        // Stocarea datelor în localStorage
        const contactData = {
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleString()
        };
        localStorage.setItem('contactData', JSON.stringify(contactData));

        response.textContent = 'Mesaj trimis cu succes!';
        response.style.color = 'green';
        contactForm.reset();
    });

    // Modificarea stilului unui element
    setTimeout(() => {
       document.querySelector('h2').style.color = 'blue';
    }, 5000);
    

    // Manevrarea DOM-ului (creare și ștergere de elemente)
    const newElement = document.createElement('p');
    newElement.textContent = 'Mulțumim pentru mesaj!';
    document.body.appendChild(newElement);
    setTimeout(() => {
        newElement.remove();
    }, 5000);

    // Evenimente generate de mouse și tastatură
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            alert('Ai apăsat tasta Escape!');
        }
    });

    // Modificarea proprietăților
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.addEventListener('mouseover', () => {
        submitButton.style.backgroundColor = 'lightblue';
    });
    submitButton.addEventListener('mouseout', () => {
        submitButton.style.backgroundColor = '';
    });

    // Schimbarea random a valorilor unor proprietăți
    setInterval(() => {
        document.body.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }, 10000);

    // Folosirea classList, target, currentTarget
    contactForm.addEventListener('click', (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            event.target.classList.add('active');
        }
        console.log(`Target: ${event.target.tagName}, CurrentTarget: ${event.currentTarget.tagName}`);
    });

    // Folosirea metodelor getComputedStyle și stopPropagation
    const contactSection = document.getElementById('contact2');
    contactSection.addEventListener('click', (event) => {
        const style = getComputedStyle(contactSection);
        console.log(`Background color: ${style.backgroundColor}`);
        event.stopPropagation();
    });
});

// Extragerea și afișarea datelor din localStorage
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('contactData');
    if (savedData) {
        const contactData = JSON.parse(savedData);
        console.log('Contact Data:', contactData);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const response = document.getElementById('response');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
            response.textContent = data;
            contactForm.reset();
        })
        .catch(error => {
            response.textContent = 'A apărut o eroare. Vă rugăm să încercați din nou.';
            console.error('Eroare:', error);
        });
    });
});