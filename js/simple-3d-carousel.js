class Simple3DCarousel {
  constructor(containerId, images) {
    this.container = document.getElementById(containerId);
    this.images = images;
    this.angle = 0;
    this.radius = 200;
    this.speed = 0.01;
    this.items = [];
    this.animationId = null;
    this.isDragging = false;
    this.lastMouseX = 0;

    this.init();
  }

  init() {
    this.setupContainer();
    this.createItems();
    this.positionItems();
    this.startAnimation();
    this.setupControls();
  }

  setupContainer() {
    this.container.style.position = 'relative';
    this.container.style.perspective = '1000px';
    this.container.style.height = '400px';
    this.container.style.width = '100%';
    this.container.style.overflow = 'visible';
  }

  createItems() {
    this.images.forEach((imageSrc, index) => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.style.position = 'absolute';
      item.style.width = '150px';
      item.style.height = '100px';
      item.style.left = '50%';
      item.style.top = '50%';
      item.style.transformStyle = 'preserve-3d';

      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '10px';
      img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';

      item.appendChild(img);
      this.container.appendChild(item);
      this.items.push(item);
    });
  }

  positionItems() {
    const angleStep = (Math.PI * 2) / this.items.length;

    this.items.forEach((item, index) => {
      const itemAngle = angleStep * index + this.angle;
      const x = Math.cos(itemAngle) * this.radius;
      const z = Math.sin(itemAngle) * this.radius;

      // Calculer l'échelle basée sur z (profondeur)
      // Les images à l'avant (z positif) sont plus grandes
      const baseScale = 0.5 + (z / this.radius + 1) * 0.25;
      const heightScale = 0.7 + (z / this.radius + 1) * 0.6; // Plus d'échelle verticale
      const opacity = 0.3 + (z / this.radius + 1) * 0.35;

      // Appliquer une échelle différente pour largeur et hauteur
      item.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scaleX(${baseScale}) scaleY(${heightScale})`;
      item.style.opacity = opacity;
      item.style.zIndex = Math.floor(z + this.radius);
    });
  }

  startAnimation() {
    const animate = () => {
      if (!this.isDragging) {
        this.angle += this.speed;
        this.positionItems();
      }
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  setupControls() {
    // Contrôle souris
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
    });

    this.container.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      const deltaX = e.clientX - this.lastMouseX;
      this.angle += deltaX * 0.01;
      this.lastMouseX = e.clientX;
      this.positionItems();
    });

    this.container.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.container.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });

    // Contrôle tactile
    this.container.addEventListener('touchstart', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.touches[0].clientX;
    });

    this.container.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;

      const deltaX = e.touches[0].clientX - this.lastMouseX;
      this.angle += deltaX * 0.01;
      this.lastMouseX = e.touches[0].clientX;
      this.positionItems();
    });

    this.container.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }
}

// Initialisation du carousel
document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'Image/carousel/Clown.png',
    'Image/carousel/logo_dragx.png',
    'Image/carousel/Vikic.png',
    'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_41.png',
    'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_44.png',
    'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_48.png'
  ];

  new Simple3DCarousel('carousel3d', images);
});