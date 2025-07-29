window.onload = function() {
  // Cambiar la ruta del fetch para que busque 'navbar.html' desde la carpeta 'html'
  fetch('navbar.html')  // Sin 'html/' en la ruta, ya que estamos en la carpeta 'html'
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;

      const menuToggle = document.querySelector('.menu-toggle');
      const navbarLinks = document.querySelector('.navbar-links');
      const body = document.body;

      if (menuToggle && navbarLinks) {
        menuToggle.addEventListener('click', () => {
          navbarLinks.classList.toggle('active');
          body.classList.toggle('nav-open');
        });

        document.addEventListener('click', (event) => {
          if (!navbarLinks.contains(event.target) && !menuToggle.contains(event.target) && navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
            body.classList.remove('nav-open');
          }
        });

        window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
            if (navbarLinks.classList.contains('active')) {
              navbarLinks.classList.remove('active');
              body.classList.remove('nav-open');
            }
            body.style.marginLeft = '220px';
          } else {
            body.style.marginLeft = '0';
          }
        });

        if (window.innerWidth > 768) {
          body.style.marginLeft = '220px';
        } else {
          body.style.marginLeft = '0';
        }
      } else {
        console.error('Elementos .menu-toggle o .navbar-links no encontrados después de cargar la navbar.');
      }
    })
    .catch(error => {
      console.error('Error cargando la barra de navegación:', error);
    });
};