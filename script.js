// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
    }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})

// Header background change on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
        header.style.background = "rgba(245, 242, 232, 0.98)"
        header.style.backdropFilter = "blur(20px)"
    } else {
        header.style.background = "rgba(245, 242, 232, 0.95)"
        header.style.backdropFilter = "blur(15px)"
    }
})

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            entry.target.classList.add("animate")
        }
    })
}, observerOptions)

// Observe all animated elements
document.querySelectorAll(".service-card, .feature-box, .value-item").forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(element)
})

// Add loading animation
window.addEventListener("load", () => {
    document.body.style.opacity = "1"
})

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    // Add fade-in effect to body
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease"

    // Trigger animations after a short delay
    setTimeout(() => {
        document.body.style.opacity = "1"
    }, 100)
})

// WhatsApp integration
function openWhatsApp(message = "") {
    const phoneNumber = "50761234567" // Replace with actual number
    const defaultMessage = "¡Hola! Me interesa reservar una cita en PanamBarberMAN ✂️"
    const finalMessage = message || defaultMessage
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`
    window.open(url, "_blank")
}

// Add click event to WhatsApp float button
document.querySelector(".whatsapp-float a").addEventListener("click", (e) => {
    e.preventDefault()
    openWhatsApp()
})

// Modal functionality
const appointmentModal = document.getElementById("appointmentModal")
const closeModal = document.getElementById("closeModal")
const appointmentButtons = document.querySelectorAll(".btn-appointment, .btn-secondary")

// Open modal
appointmentButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (button.getAttribute("href") === "#contacto") {
            e.preventDefault()
            appointmentModal.classList.add("active")
            document.body.style.overflow = "hidden"
        }
    })
})

// Close modal
closeModal.addEventListener("click", () => {
    appointmentModal.classList.remove("active")
    document.body.style.overflow = "auto"
})

// Close modal when clicking outside
appointmentModal.addEventListener("click", (e) => {
    if (e.target === appointmentModal) {
        appointmentModal.classList.remove("active")
        document.body.style.overflow = "auto"
    }
})

// Form submission
const appointmentForm = document.querySelector(".appointment-form")
appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(appointmentForm)
    const name = formData.get("name")
    const phone = formData.get("phone")
    const service = formData.get("service")
    const date = formData.get("date")
    const time = formData.get("time")

    const message = `¡Hola! Me gustaría reservar una cita:
  
👤 Nombre: ${name}
📞 Teléfono: ${phone}
✂️ Servicio: ${service}
📅 Fecha: ${date}
🕐 Hora: ${time}
  
¡Gracias!`

    openWhatsApp(message)
    appointmentModal.classList.remove("active")
    document.body.style.overflow = "auto"
    appointmentForm.reset()
})

// Service card interactions
document.querySelectorAll(".service-card").forEach((card, index) => {
    const serviceTypes = [
        "Corte Clásico - $25",
        "Afeitado Tradicional - $35",
        "Arreglo de Barba - $20",
        "Paquete Ejecutivo - $65",
        "Corte Infantil - $15",
        "Tratamientos Especiales - $30",
    ]

    card.addEventListener("click", () => {
        const message = `Hola! Me interesa el servicio: ${serviceTypes[index]} ✂️`
        openWhatsApp(message)
    })
})

// Enhanced hover effects for service cards
document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)"
        card.querySelector(".service-icon i").style.transform = "scale(1.2) rotate(5deg)"
    })

    card.addEventListener("mouseleave", () => {
        if (!card.classList.contains("featured")) {
            card.style.transform = "translateY(0) scale(1)"
        } else {
            card.style.transform = "translateY(0) scale(1.05)"
        }
        card.querySelector(".service-icon i").style.transform = "scale(1) rotate(0deg)"
    })
})

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}

// Add scroll to top button
const scrollButton = document.createElement("div")
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollButton.className = "scroll-to-top"
scrollButton.style.cssText = `
  position: fixed;
  bottom: 110px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--gradient-gold);
  color: var(--rich-brown);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: 0 4px 15px var(--gold-shadow);
  border: 2px solid var(--gold);
`

document.body.appendChild(scrollButton)

scrollButton.addEventListener("click", scrollToTop)

scrollButton.addEventListener("mouseenter", () => {
    scrollButton.style.transform = "scale(1.1)"
    scrollButton.style.background = "var(--rich-brown)"
    scrollButton.style.color = "var(--gold)"
})

scrollButton.addEventListener("mouseleave", () => {
    scrollButton.style.transform = "scale(1)"
    scrollButton.style.background = "var(--gradient-gold)"
    scrollButton.style.color = "var(--rich-brown)"
})

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollButton.style.opacity = "1"
    } else {
        scrollButton.style.opacity = "0"
    }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-background")
    const speed = scrolled * 0.3

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${speed}px)`
    }
})

// Dynamic stats counter animation
function animateStats() {
    const stats = document.querySelectorAll(".stat-number")

    stats.forEach((stat) => {
        const target = Number.parseInt(stat.textContent.replace(/\D/g, ""))
        const suffix = stat.textContent.replace(/\d/g, "")
        let current = 0
        const increment = target / 100

        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                stat.textContent = target + suffix
                clearInterval(timer)
            } else {
                stat.textContent = Math.floor(current) + suffix
            }
        }, 20)
    })
}

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateStats()
            statsObserver.unobserve(entry.target)
        }
    })
})

const aboutSection = document.querySelector(".about")
if (aboutSection) {
    statsObserver.observe(aboutSection)
}

// Enhanced mobile menu animation
const hamburgerSpans = document.querySelectorAll(".hamburger span")

hamburger.addEventListener("click", () => {
    hamburgerSpans.forEach((span, index) => {
        if (hamburger.classList.contains("active")) {
            if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
            if (index === 1) span.style.opacity = "0"
            if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
            span.style.transform = "none"
            span.style.opacity = "1"
        }
    })
})

// Add custom cursor effect for interactive elements
document.querySelectorAll(".service-card, .feature-box, .gallery-main, .gallery-secondary").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        document.body.style.cursor = "pointer"
    })

    element.addEventListener("mouseleave", () => {
        document.body.style.cursor = "default"
    })
})

// Gallery image hover effects
document.querySelectorAll(".gallery-main, .gallery-secondary").forEach((gallery) => {
    gallery.addEventListener("click", () => {
        const message = "¡Hola! Me gustaría conocer más sobre sus instalaciones y servicios ✂️"
        openWhatsApp(message)
    })
})

// Add vintage clock functionality (optional)
function updateClock() {
    const now = new Date()
    const timeString = now.toLocaleTimeString("es-PA", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Panama",
    })

    // You can add a clock element if needed
    console.log(`Hora en Panamá: ${timeString}`)
}

// Update clock every minute
setInterval(updateClock, 60000)

// Initialize all animations and interactions
function initializeApp() {
    console.log("PanamBarberMAN website initialized! ✂️")

    // Set minimum date for appointment booking (today)
    const dateInput = document.getElementById("date")
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0]
        dateInput.min = today
    }

    // Preload images for better performance
    const images = ["images/barbero-profesional.jpg", "images/interior-barberia-lujo.jpg", "images/barberia-moderna.webp"]

    images.forEach((src) => {
        const img = new Image()
        img.src = src
    })
}

// Run initialization when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp)

// Add vintage sound effects (optional - requires audio files)
function playVintageSound() {
    // You can add vintage barber shop sounds here
    console.log("✂️ Snip snip!")
}

// Easter egg - click logo 5 times for special effect
let logoClicks = 0
const logo = document.querySelector(".logo")

logo.addEventListener("click", () => {
    logoClicks++
    if (logoClicks === 5) {
        document.body.style.filter = "sepia(100%) hue-rotate(30deg)"
        setTimeout(() => {
            document.body.style.filter = "none"
            logoClicks = 0
        }, 2000)
    }
})