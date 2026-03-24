// template_tykevg7
// service_ab1corh
// k1jKGBI_xuOtRKVwp

let contrastToggle = false;
const scaleFactor = 1/20

function moveBackground(event) {
const shapes = document.querySelectorAll('.shape')
const x = event.clientX * scaleFactor;
const y = event.clientY * scaleFactor;

for (let i = 0; i < shapes.length; i++) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
    }
}

function initProjectRevealOnScroll() {
    const projects = document.querySelectorAll('.project')

    if (!projects.length) {
        return
    }

    if (!('IntersectionObserver' in window)) {
        projects.forEach((project) => project.classList.add('project--visible'))
        return
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return
            }

            entry.target.classList.add('project--visible')
            observer.unobserve(entry.target)
        })
    }, {
        threshold: 0.35,
        rootMargin: '0px 0px -12% 0px'
    })

    projects.forEach((project) => observer.observe(project))
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    document.body.classList.toggle('dark-theme', contrastToggle)
}


function contact(event) {
    event.preventDefault()
    const loading = document.querySelector('.modal__overlay--loading')
    const success = document.querySelector('.modal__overlay--success')
    loading.classList.add('modal__overlay--visible')
    emailjs
    .sendForm(
        'service_ab1corh',
        'template_tykevg7',
        event.target,
        'k1jKGBI_xuOtRKVwp'
    ).then(() => {
        loading.classList.remove('modal__overlay--visible')
        success.classList.add('modal__overlay--visible')
    }).catch(() => {
        loading.classList.remove('modal__overlay--visible')
        alert('The email service is currently unavailable. Please contact me directly at blackbockz@gmail.com')
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.modal__exit')
    const loading = document.querySelector('.modal__overlay--loading')
    const success = document.querySelector('.modal__overlay--success')
    const landingPage = document.querySelector('#landing-page')

    if (landingPage) {
        landingPage.addEventListener('touchmove', (event) => {
            if (!event.touches.length) {
                return
            }

            moveBackground(event.touches[0])
        }, { passive: true })
    }

    initProjectRevealOnScroll()

    if (!closeButton || !loading || !success) {
        return
    }

    closeButton.addEventListener('click', () => {
        loading.classList.remove('modal__overlay--visible')
        success.classList.remove('modal__overlay--visible')
    })
})

function toggleModal() {
    const isOpen = document.body.classList.contains('modal--open')
    if (isOpen) {
        document.body.classList.remove('modal--open')

        const loading = document.querySelector('.modal__overlay--loading')
        const success = document.querySelector('.modal__overlay--success')
        if (loading) {
            loading.classList.remove('modal__overlay--visible')
        }
        if (success) {
            success.classList.remove('modal__overlay--visible')
        }
        return
    }

    document.body.classList.add('modal--open')
}