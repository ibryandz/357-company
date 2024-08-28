window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 10) {
        nav.classList.add("shrink");
    } else {
        nav.classList.remove("shrink");
    }
});

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleWindowResize);

const spansSlow = document.querySelectorAll('.spanSlow');
const spansFast = document.querySelectorAll('.spanFast');

let width = window.innerWidth;

function handleMouseMove(e) {
    let normalizedPosition = e.pageX / (width / 2) - 1;
    let speedSlow = 100 * normalizedPosition;
    let speedFast = 200 * normalizedPosition;

    spansSlow.forEach((span) => {
        span.style.transform = `translate(${speedSlow}px)`;
    });

    spansFast.forEach((span) => {
        span.style.transform = `translate(${speedFast}px)`;
    });
}

function handleWindowResize() {
    width = window.innerWidth;
}
// BOX HANDLER
document.addEventListener('DOMContentLoaded', () => {
    const detailsContent = {
        barberia: {
            title: 'LOS CORTES <br>MAS<br> PICANTES!!!',
            description: `En 357, siempre estamos a la vanguardia de las tendencias, ofreciendo los cortes más modernos y audaces que el mercado tiene para ofrecer. <br><br>
            Nuestro equipo de barberos expertos está listo para transformar tu cabello con las técnicas más innovadoras y personalizadas. ¡Ven a 357 y descubre por qué somos el lugar donde nacen los estilos más picantes del mercado!`
        },
        tattoo: {
            title: 'TINTAS QUE CUENTAN <br> HISTORIAS!',
            description: `En 357, llevamos el arte del tatuaje a otro nivel, creando obras que no solo adornan tu piel, sino que cuentan tu historia. Cada diseño que sale de nuestras agujas es una mezcla perfecta de creatividad, técnica y precisión, asegurando que tu tinta sea tan única como tú. <br><br>
            Atrévete a marcar la diferencia con nosotros!`
        },
        unas: {
            title: 'DESCUBRE EL ARTE DE <br> LAS UÑAS EN 357',
            description: `En 357, son una forma de expresión. Nuestro equipo de técnicos de uñas domina las últimas tendencias y técnicas para ofrecerte diseños que van más allá de lo ordinario. Desde manicuras minimalistas y elegantes hasta creaciones atrevidas y llenas de color, en 357 transformamos tus uñas en auténticas obras de arte.`
        }
    };

    const srvDetails = document.querySelector('.srv__details');
    const srvTitle = srvDetails.querySelector('h5');
    const srvDescription = srvDetails.querySelector('p');

    document.querySelectorAll('.srv__li').forEach(item => {
        item.addEventListener('click', function() {
            const contentKey = this.getAttribute('data-content');
            const content = detailsContent[contentKey];

            // Fade out the current content
            srvDetails.classList.add('fade-out');

            // After the fade-out transition ends, update the content and fade in
            srvDetails.addEventListener('transitionend', function onTransitionEnd() {
                // Remove the transitionend listener after it fires
                srvDetails.removeEventListener('transitionend', onTransitionEnd);

                // Update content
                srvTitle.innerHTML = content.title;
                srvDescription.innerHTML = content.description;

                // Trigger reflow to restart the animation (necessary for consistent results)
                srvDetails.offsetHeight; // This line forces a reflow

                // Fade in the new content
                srvDetails.classList.remove('fade-out');
                srvDetails.classList.add('fade-in');

                // Remove the fade-in class after animation is done to allow re-application
                setTimeout(() => {
                    srvDetails.classList.remove('fade-in');
                }, 500); // Match this duration to the CSS animation time (0.5s)
            });
        });
    });
});

// COMMENT HANDLER!! 

document.addEventListener('DOMContentLoaded', function() {
    const comments = document.querySelectorAll('.comment');

    function handleScroll() {
        comments.forEach((comment, index) => {
            const commentPosition = comment.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (commentPosition < screenPosition) {
                comment.classList.add('in-view');
                setTimeout(() => {
                    comment.classList.add('scale-down');
                }, 800);
            } else {
                comment.classList.remove('in-view', 'scale-down');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // Initial check if elements are already in view
    handleScroll();
});

// CARD FLIP 3D 

document.querySelectorAll('.pricing__card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Get the position of the mouse relative to the card
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        // Calculate the distance between the mouse position and the card's center
        const offsetX = e.clientX - cardCenterX;
        const offsetY = e.clientY - cardCenterY;

        // Scale the rotation angles based on the distance from the center
        const rotationX = -offsetY / 10; // Tilt based on Y-axis (up and down)
        const rotationY = offsetX / 10;  // Tilt based on X-axis (left and right)

        // Apply the rotation transformation
        card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        // Reset the transformation when the mouse leaves the card
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});

// BOX FLIP 
const cube = document.querySelector('.cube');
const leftSide = document.querySelector('.left__side');
const rightSide = document.querySelector('.right__side');

let isFlipped = false;

function updateContent() {
    if (isFlipped) {
        // Update content to initial state
        leftSide.innerHTML = `
            <h3>PRIMERA SEMANA</h3>
            <h4>Introducción al mundo del grooming</h4>
        `;
        rightSide.innerHTML = `
            <div class="week__cont">
                <h5>DURACION: 1 SEMANA</h5>
                <p>
                    Contenido: Introducción a las herramientas de barbería, higiene y seguridad, y fundamentos del corte de cabello.
                    <br><br>
                    Objetivo: Familiarizar a los estudiantes con el entorno de la barbería y las herramientas esenciales del oficio.
                </p>
            </div>
        `;
    } else {
        // Update content to new state
        leftSide.innerHTML = `
            <h3>SEGUNDA SEMANA</h3>
            <h4>Lacre infinito</h4>
        `;
        rightSide.innerHTML = `
            <div class="week__cont">
                <h5>DURACION: 1 WEEK</h5>
                <p>
                    Contenido: Más información específica sobre técnicas avanzadas y prácticas diarias.
                    <br><br>
                    Objetivo: Profundizar en las técnicas de barbería con un enfoque en precisión y estilo.
                </p>
            </div>
        `;
    }

    isFlipped = !isFlipped;

    // Trigger flip animation
    cube.classList.toggle('flipped');
}

// Initial content flip
function startAnimation() {
    setInterval(() => {
        updateContent();
        // Flip back to original content after 5 seconds
        setTimeout(() => {
            updateContent();
        }, 3000);
    }, 5000);
}

startAnimation();


// ABOUT ANIM

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section__info');

    // Check if at least part of the element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) && // Top is above or in the viewport
            rect.bottom > 0 && // Bottom is below or in the viewport
            rect.left < (window.innerWidth || document.documentElement.clientWidth) && // Left is left or in the viewport
            rect.right > 0 // Right is right or in the viewport
        );
    }

    function checkVisibility() {
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    // Initial check
    checkVisibility();

    // Check on scroll
    window.addEventListener('scroll', checkVisibility, { passive: true }); // Improved scrolling performance with passive listener
});

// TEAM 

document.addEventListener("DOMContentLoaded", () => {
    const teamItems = document.querySelectorAll('.team__li');
    const teamImage = document.querySelector('.team__img');

    teamItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the URL from the data attribute
            const imageUrl = item.getAttribute('data-image-url');
            
            // Update the background image of the team__img element
            teamImage.style.backgroundImage = `url(${imageUrl})`;
        });
    });
});

// ACADEMY animation. 
document.addEventListener("DOMContentLoaded", () => {
    const firstTitleElements = document.querySelectorAll(".title.first span");
    const secondTitleElements = document.querySelectorAll(".title.second span");
    const animationDuration = 3000; // Duration of each animation in milliseconds (3 seconds)
    const delayBetweenTitles = 3200; // Delay for second title to start after the first title
    const delayBetweenCycles = 3000; // 3 seconds delay between cycles

    function startAnimation() {
        // Apply animation to both titles
        firstTitleElements.forEach((element) => {
            element.style.animation = `titleAnimation ${animationDuration}ms ease forwards`;
        });

        setTimeout(() => {
            secondTitleElements.forEach((element) => {
                element.style.animation = `titleAnimation ${animationDuration}ms ease forwards`;
            });
        }, delayBetweenTitles); // Delay the second title's start

        // Set up listener for the end of the animation cycle
        setTimeout(restartAnimationCycle, animationDuration + delayBetweenTitles + delayBetweenCycles);
    }

    function restartAnimationCycle() {
        // Clear animations
        firstTitleElements.forEach((element) => (element.style.animation = "none"));
        secondTitleElements.forEach((element) => (element.style.animation = "none"));

        // Force reflow to restart animation
        void document.body.offsetHeight;

        // Restart the animation cycle
        startAnimation();
    }

    // Start the first animation cycle
    startAnimation();
});
//TEAM LI 

  document.addEventListener("DOMContentLoaded", () => {
    const teamListItems = document.querySelectorAll(".team__li");
  
    teamListItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Remove the selected class from all items
        teamListItems.forEach((el) => el.classList.remove("selected"));
  
        // Add the selected class to the clicked item
        item.classList.add("selected");
      });
    });
  });

  //POP UP

  document.addEventListener("DOMContentLoaded", () => {
    const anchor = document.querySelector('a[href*="#servicios"]');

    anchor.addEventListener("click", function (e) {
        const targetUrl = new URL(this.href, window.location.href);
        const currentUrl = window.location.href;

        // Check if the anchor is pointing to the same page
        if (targetUrl.pathname === new URL(currentUrl).pathname) {
            e.preventDefault(); // Prevent the default behavior

            // Scroll to the target element if it exists on the same page
            const targetElement = document.querySelector(targetUrl.hash);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                // Optional: Add a pop-up or highlight effect
                targetElement.classList.add("highlight");

                // Remove the highlight effect after a short delay
                setTimeout(() => {
                    targetElement.classList.remove("highlight");
                }, 1000);
            }
        }
        // If the target is on another page, no action needed since the browser will handle it
    });
});
  
//tinder like 
