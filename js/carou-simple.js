class Carousel3D {
  constructor(config) {
    this.carousel = document.getElementById(config.containerId || 'carousel3d');
    this.images = config.images || [];
    this.radius = config.radius || 250;
    this.autoRotate = config.autoRotate !== false;
    this.rotateSpeed = config.rotateSpeed || 0.01;
    this.currentAngle = 0;
    this.animationId = null;
    this.isPaused = false;

    if (!this.carousel) {
      console.error('Carousel container not found!');
      return;
    }

    if (this.images.length === 0) {
      console.error('No images provided!');
      return;
    }

    this.init();
  }

  init() {
    this.createCarousel();
    this.positionItems();
    if (this.autoRotate) {
      this.startAutoRotate();
    }
    this.setupMouseControls();
  }

  createCarousel() {
    this.carousel.innerHTML = '';
    this.carousel.style.position = 'relative';
    this.carousel.style.perspective = '1000px';
    this.carousel.style.overflow = 'visible';

    this.images.forEach((imageData, index) => {
      const item = this.createCarouselItem(imageData, index);
      this.carousel.appendChild(item);
    });
  }

  createCarouselItem(imageData, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item-3d';
    item.style.position = 'absolute';
    item.style.width = '180px';
    item.style.height = '135px';
    item.style.left = '50%';
    item.style.top = '50%';
    item.style.transformStyle = 'preserve-3d';
    item.style.transition = 'all 0.3s ease';

    const img = document.createElement('img');
    img.src = imageData.url;
    img.alt = imageData.title || `Image ${index + 1}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '12px';
    img.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)';
    img.style.border = '2px solid rgba(255,255,255,0.2)';

    // Ajouter un reflet/ombre sous l'image
    const shadow = document.createElement('div');
    shadow.style.position = 'absolute';
    shadow.style.bottom = '-20px';
    shadow.style.left = '10%';
    shadow.style.right = '10%';
    shadow.style.height = '15px';
    shadow.style.background = 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)';
    shadow.style.borderRadius = '50%';
    shadow.style.filter = 'blur(2px)';

    img.addEventListener('error', () => {
      img.style.background = 'linear-gradient(45deg, #ff6b6b, #feca57)';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.style.color = 'white';
      img.style.fontWeight = 'bold';
      img.textContent = 'Erreur';
    });

    item.appendChild(img);
    item.appendChild(shadow);
    return item;
  }

  positionItems() {
    const items = this.carousel.querySelectorAll('.carousel-item-3d');
    const totalItems = items.length;
    const angleStep = (2 * Math.PI) / totalItems;

    items.forEach((item, index) => {
      const angle = angleStep * index;
      const x = Math.cos(angle) * this.radius;
      const z = Math.sin(angle) * this.radius;

      // Calculer l'échelle basée sur la profondeur (effet de distance)
      const scale = 0.7 + 0.3 * ((z + this.radius) / (2 * this.radius));

      // Calculer l'opacité basée sur la profondeur
      const opacity = 0.6 + 0.4 * ((z + this.radius) / (2 * this.radius));

      item.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`;
      item.style.zIndex = Math.round((z + this.radius) * 10);
      item.style.opacity = opacity;
    });
  }

  startAutoRotate() {
    const animate = () => {
      if (!this.isPaused) {
        this.currentAngle += this.rotateSpeed;

        // Appliquer la rotation au conteneur
        this.carousel.style.transform = `rotateY(${this.currentAngle}rad)`;

        // Mettre à jour les positions relatives pour l'effet de profondeur
        this.updateDepthEffect();
      }
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  updateDepthEffect() {
    const items = this.carousel.querySelectorAll('.carousel-item-3d');
    const totalItems = items.length;
    const angleStep = (2 * Math.PI) / totalItems;

    items.forEach((item, index) => {
      const relativeAngle = angleStep * index - this.currentAngle;
      const normalizedAngle = ((relativeAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Calculer la distance du centre (pour l'effet de courbure)
      const distanceFromCenter = Math.abs(normalizedAngle - Math.PI);
      const depth = Math.cos(distanceFromCenter) * 0.5 + 0.5;

      // Appliquer l'effet de profondeur
      const scale = 0.8 + depth * 0.4;
      const opacity = 0.7 + depth * 0.3;

      item.style.transform += ` scale(${scale})`;
      item.style.opacity = opacity;
    });
  }

  setupMouseControls() {
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    this.carousel.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      this.isPaused = true;
    });

    this.carousel.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;

      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;

      this.currentAngle += deltaX * 0.01;

      // Limiter la rotation verticale pour éviter les effets étranges
      const verticalAngle = Math.max(-0.5, Math.min(0.5, deltaY * 0.005));

      this.carousel.style.transform = `rotateY(${this.currentAngle}rad) rotateX(${verticalAngle}rad)`;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    this.carousel.addEventListener('mouseup', () => {
      isMouseDown = false;
      this.isPaused = false;
    });

    this.carousel.addEventListener('mouseleave', () => {
      isMouseDown = false;
      this.isPaused = false;
    });

    // Support pour mobile
    this.carousel.addEventListener('touchstart', (e) => {
      isMouseDown = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
      this.isPaused = true;
    });

    this.carousel.addEventListener('touchmove', (e) => {
      if (!isMouseDown) return;

      const deltaX = e.touches[0].clientX - lastMouseX;
      this.currentAngle += deltaX * 0.01;
      this.carousel.style.transform = `rotateY(${this.currentAngle}rad)`;

      lastMouseX = e.touches[0].clientX;
    });

    this.carousel.addEventListener('touchend', () => {
      isMouseDown = false;
      this.isPaused = false;
    });
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const carouselConfig = {
    containerId: 'carousel3d',
    radius: 280,
    autoRotate: true,
    rotateSpeed: 0.008,
    images: [
      {
        url: 'Image/carousel/Clown.png',
        title: 'Clown'
      },
      {
        url: 'Image/carousel/logo_dragx.png',
        title: 'Logo DragX'
      },
      {
        url: 'Image/carousel/Vikic.png',
        title: 'Vikic'
      },
      {
        url: 'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_41.png',
        title: 'Image 4'
      },
      {
        url: 'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_44.png',
        title: 'Image 5'
      },
      {
        url: 'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_48.png',
        title: 'Image 6'
      }
    ]
  };

  window.carousel3D = new Carousel3D(carouselConfig);
});