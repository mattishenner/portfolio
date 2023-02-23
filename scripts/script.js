// Lottie animation
var animation = bodymovin.loadAnimation({
    container: document.getElementById('mammoth-animation-container'),
    path: '../../animations/mammoth.json',
    render: 'SVG',
    loop: true,
    autoplay: true,
    name: 'mammoth-animation'
});

var animation = bodymovin.loadAnimation({
    container: document.getElementById('caveman-animation-container'),
    path: '../../animations/caveman.json',
    render: 'SVG',
    loop: true,
    autoplay: true,
    name: 'caveman-animation'
});

var animation = bodymovin.loadAnimation({
    container: document.getElementById('me-animation-container'),
    path: '../../animations/me-green.json',
    render: 'SVG',
    loop: true,
    autoplay: true,
    name: 'me-animation'
});


//Animate on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const hidden2Elements = document.querySelectorAll('.hidden2');
hidden2Elements.forEach((el) => observer.observe(el));


// Animated text on front page
function createMorphAnimation() {

    const elts = {
        text1: document.getElementById("text1"),
        text2: document.getElementById("text2")
    };

    var texts = [
        "Motion designer",
        "UI designer",
        "Developer"
    ];

    var morphTime = 1;
    var cooldownTime = 0.25;

    var textIndex = texts.length - 1;
    var time = new Date();
    let morph = 0;
    var cooldown = cooldownTime;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
        morph -= cooldown;
        cooldown = 0;

        let fraction = morph / morphTime;

        if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
        }

        setMorph(fraction);
    }

    function setMorph(fraction) {
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
        morph = 0;

        elts.text2.style.filter = "";
        elts.text2.style.opacity = "100%";

        elts.text1.style.filter = "";
        elts.text1.style.opacity = "0%";
    }

    function animate() {
        requestAnimationFrame(animate);

        let newTime = new Date();
        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;

        cooldown -= dt;

        if (cooldown <= 0) {
            if (shouldIncrementIndex) {
                textIndex++;
            }

            doMorph();
        } else {
            doCooldown();
        }
    }

    animate();


}

var check = document.getElementById("text1");

if(check) createMorphAnimation()

// Responsive menu
const menuBtn = document.querySelector('.menu-icon')
const navLinks = document.querySelector('.menu')

menuBtn.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile-menu')
    menuBtn.classList.toggle('cross-icon')
})