let maxWidth = 740;
// Change the overflow of the html when menuBtn is inactive
function resetOverflow() {
    if (window.innerWidth > maxWidth) {
        menuBtn.classList.remove('active');
        controlOverflow('auto');
    }
};
window.addEventListener('resize', resetOverflow);

// Control the overflow of the html
const controlOverflow = (control) => {document.documentElement.style.overflow = control};

// Toggle the navigation and menu btn design
const menuBtn = document.getElementById('setting');
const toggleNav = () => {
    menuBtn.classList.toggle('active');

    if (menuBtn.classList.length > 0) {
        controlOverflow('hidden');
        return;
    }
    controlOverflow('auto');
};
menuBtn.addEventListener('click', toggleNav);

// Animate the main-navigation on position sticky
const nav = document.getElementById('main-navigation');
document.addEventListener('scroll', navScroll);
function navScroll() {
    if (window.scrollY > nav.offsetHeight + 10) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
}
navScroll();

// Remove nav-content when link was clicked
const nodeList = document.querySelectorAll('#nav-content a');
const navLink = Array.from(nodeList);
navLink.unshift(document.querySelector('#main-navigation .logo'));
navLink.forEach((item) => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= maxWidth) {
            menuBtn.classList.remove('active');
            controlOverflow('auto');
        }
    });
});

// Remove main-navigation when scroll down
let lastScrollPosition = 0;
window.addEventListener('scroll', function() {
    let currentScrollPosition = window.scrollY;

    if (menuBtn.classList.length <= 0) {
        if (currentScrollPosition > lastScrollPosition) nav.classList.add('scrollDown');
        else nav.classList.remove('scrollDown');
    }

    lastScrollPosition = currentScrollPosition;
});

// Toggle the selector for the selection in about section
const selector = document.querySelectorAll('#selector .select-btn');
const selected = document.querySelectorAll('#selected .select-modal');

selector.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        selector.forEach((item) => {
            item.classList.remove('active');
            item.disabled = false;
        });
        selected.forEach((item) => {
            item.classList.remove('active');
        })

        btn.classList.add('active');
        btn.disabled = true;
        selected[index].classList.add('active');
    })
});


document.addEventListener("DOMContentLoaded", function() {
    // Scroll on Action when elements on view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const rect =  entry.boundingClientRect;
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } 
            else if (rect.bottom > 0) {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.00000001 // Trigger when 10000000% of the element is visible
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Typing Animation
    const typingElement = document.getElementById('typing');
    const text = "FRONT-END DEVELOPER";
    let index = 9;
    let typing = "<span class='typing'>|<span>";


    function type() {
        if (index < text.length) {
            typingElement.innerHTML = text.substring(0, index + 1) + '<span class="cursor">|</span>';
            index++;
            setTimeout(type, 150); // Adjust typing speed here
        } else {
            setTimeout(() => {
                typingElement.innerHTML = "FRONT-END";
                index = 9;
                setTimeout(type, 500); // Adjust delay before retyping here
            }, 2000); // Adjust delay after completing the text here
        }
    }
    type();
});

