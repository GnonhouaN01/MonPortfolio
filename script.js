// Filtrage des projets
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectItems = document.querySelectorAll('.subProject');

    // Fonction de filtrage
    function filterProjects(filter) {
        projectItems.forEach(project => {
            const projectTags = project.getAttribute('data-tags');
            
            if (filter === 'all' || projectTags.includes(filter)) {
                project.style.display = 'flex';
                project.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Gestion des clics sur les boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la valeur du filtre
            const filterValue = this.getAttribute('data-filter');
            
            // Appliquer le filtre
            filterProjects(filterValue);
        });
    });

    // Animation pour le fadeIn
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Dark/Light mode toggle
    const modeToggle = document.querySelector('header button');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const icon = modeToggle.querySelector('i');
            if (document.body.classList.contains('dark')) {
                icon.classList.replace('fa-sun', 'fa-moon');
                document.body.style.backgroundColor = '#1a202c';
                document.body.style.color = '#f0f9ff';
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
                document.body.style.backgroundColor = '#ffffff';
                document.body.style.color = '#1a202c';
            }
        });
    }

    // Smooth scrolling pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Gestion de la soumission du formulaire de contact
    const contactForm = document.querySelector('.contact-section form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            // Validation simple
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Ici, vous pourriez ajouter un appel AJAX pour envoyer les données
            console.log('Formulaire soumis:', { name, email, message });
            
            // Feedback à l'utilisateur
            alert('Merci pour votre message! Je vous répondrai dès que possible.');
            
            // Réinitialisation du formulaire
            this.reset();
        });
    }

    // Initialisation - afficher tous les projets par défaut
    filterProjects('all');
});