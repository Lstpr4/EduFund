// Particle system configuration
const particleConfig = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#0a3d7a", "#1862b5", "#2a9d8f"]
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      }
    },
    opacity: {
      value: 0.3,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 4,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#0a3d7a",
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.8
        }
      },
      push: {
        particles_nb: 3
      }
    }
  },
  retina_detect: true
};

// Function to initialize the particle system
function initParticles() {
  // Create the canvas element for particles
  const particleCanvas = document.createElement('div');
  particleCanvas.id = 'particles-js';
  particleCanvas.style.position = 'fixed';
  particleCanvas.style.top = '0';
  particleCanvas.style.left = '0';
  particleCanvas.style.width = '100%';
  particleCanvas.style.height = '100%';
  particleCanvas.style.zIndex = '-1';
  particleCanvas.style.pointerEvents = 'none'; // Makes it not interfere with clicks
  
  // Insert the canvas as the first element in the body
  document.body.insertBefore(particleCanvas, document.body.firstChild);
  
  // Load particles.js and initialize
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
  script.onload = function() {
    particlesJS('particles-js', particleConfig);
  };
  document.head.appendChild(script);
}

// Initialize particles when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initParticles);