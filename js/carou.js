class Carousel3D {
  constructor(config) {
    console.log('Carousel3D constructor called with config:', config);
    this.carousel = document.getElementById(config.containerId || 'carousel3d');
    this.images = config.images || [];
    this.radius = (typeof config.radius === 'number') ? config.radius : null; // compute if null
    this.isPaused = false;
    this.direction = 1;
    this.speed = config.defaultSpeed || 20;
    this._items = [];

    console.log('Carousel element found:', this.carousel);
    console.log('Images array:', this.images);

    if (!this.carousel) {
      console.error('Carousel container not found!');
      return;
    }

    if (this.images.length === 0) {
      console.error('No images provided!');
      return;
    }

    this._onResize = this.onResize.bind(this);
    this.init();
    window.addEventListener('resize', this._onResize);
  }

  init() {
    this.createCarousel();
    this.setupControls();
    this.computeRadius();
    this.updatePositions();
    this.updateAnimation();
  }

  computeRadius() {
    if (this.radius && typeof this.radius === 'number') return;
    const w = this.carousel.clientWidth || this.carousel.offsetWidth;
    const h = this.carousel.clientHeight || this.carousel.offsetHeight || (w * 0.6);
    this.radius = Math.max(80, Math.min(w, h) * 0.45);
  }

  createCarousel() {
    const totalImages = this.images.length;
    const angleStep = 360 / totalImages;

    this.images.forEach((imageData, index) => {
      const item = this.createCarouselItem(imageData, index, angleStep);
      this._items.push(item);
      this.carousel.appendChild(item);
    });
  }

  createCarouselItem(imageData, index, angleStep) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.setAttribute('data-index', index);

    const imgWrap = document.createElement('div');
    imgWrap.className = 'carousel-item-inner';

    const angle = angleStep * index;

    const img = document.createElement('img');
    img.src = imageData.url;
    img.alt = imageData.title;
    img.className = 'carousel-image';

    console.log('Creating image with src:', img.src);

    img.addEventListener('load', () => {
      console.log('Image loaded successfully:', img.src);
    });

    img.addEventListener('error', () => {
      console.error('Image failed to load:', img.src);
      const missing = document.createElement('div');
      missing.className = 'img-missing';
      missing.textContent = 'Pas trouvé dans Image';
      if (img.parentNode) img.parentNode.replaceChild(missing, img);
    });

    imgWrap.appendChild(img);

    const number = document.createElement('div');
    number.className = 'item-number';
    number.textContent = index + 1;

    const overlay = document.createElement('div');
    overlay.className = 'item-overlay';
    overlay.innerHTML = `
      <h3 class="item-title">${this.escapeHtml(imageData.title)}</h3>
      <p class="item-description">${this.escapeHtml(imageData.description)}</p>
    `;

    item.appendChild(imgWrap);
    item.appendChild(number);
    item.appendChild(overlay);

    item._angle = angle;

    return item;
  }

  updatePositions() {
    this.computeRadius();
    const total = this._items.length;
    const angleStep = 360 / total;

    this._items.forEach((item, index) => {
      const angle = angleStep * index;
      const angleRad = (angle * Math.PI) / 180;
      const depth = Math.cos(angleRad);
      const scale = 0.6 + 0.4 * ((depth + 1) / 2);

      // Temporairement désactiver les transformations 3D pour déboguer
      item.style.transform = `translate(-50%, -50%)`;
      item.style.left = `${50 + Math.cos(angleRad) * 100}px`;
      item.style.top = `${50 + Math.sin(angleRad) * 100}px`;
      item.style.zIndex = String(Math.round((depth + 1) * 100));

      const inner = item.querySelector('.carousel-item-inner');
      if (inner) {
        inner.style.transform = `translate(-50%,-50%) rotateY(-${angle}deg)`;
      }
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  updateAnimation() {
    const animationName = this.direction === 1 ? 'orbitalRotate' : 'orbitalRotateReverse';

    this.carousel.style.animation = 'none';
    void this.carousel.offsetWidth;

    if (this.direction === -1 && !document.querySelector('#reverse-animation')) {
      this.createReverseAnimation();
    }

    const state = this.isPaused ? 'paused' : 'running';
    this.carousel.style.animation = `${animationName} ${this.speed}s linear infinite`;
    this.carousel.style.animationPlayState = state;
  }

  createReverseAnimation() {
    const style = document.createElement('style');
    style.id = 'reverse-animation';
    style.textContent = `
      @keyframes orbitalRotateReverse {
        from { transform: rotateX(20deg) rotateY(360deg) rotateZ(0deg); }
        to { transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg); }
      }
    `;
    document.head.appendChild(style);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const btn = document.getElementById('btnPause');

    if (this.isPaused) {
      this.carousel.style.animationPlayState = 'paused';
      if (btn) btn.textContent = '▶ Lecture';
    } else {
      this.carousel.style.animationPlayState = 'running';
      if (btn) btn.textContent = '⏸ Pause';
    }
  }

  reverseDirection() {
    this.direction *= -1;
    this.updateAnimation();
  }

  changeSpeed(newSpeed) {
    this.speed = newSpeed;
    this.updateAnimation();
  }

  setupControls() {
    const btnPause = document.getElementById('btnPause');
    if (btnPause) {
      btnPause.addEventListener('click', () => this.togglePause());
    }

    const btnReverse = document.getElementById('btnReverse');
    if (btnReverse) {
      btnReverse.addEventListener('click', () => this.reverseDirection());
    }

    const speedRadios = document.querySelectorAll('input[name="speed"]');
    speedRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.changeSpeed(parseInt(e.target.value));
      });
    });
  }

  getState() {
    return {
      isPaused: this.isPaused,
      direction: this.direction,
      speed: this.speed,
      imageCount: this.images.length,
      radius: this.radius
    };
  }
}

class Carousel3D {
  constructor(config) {
    this.carousel = document.getElementById(config.containerId || 'carousel3d');
    this.images = config.images || [];
    this.radius = config.radius || 200;
    this.isPaused = false;
    this.direction = 1;
    this.speed = config.defaultSpeed || 20;
    this._items = [];

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
  }

  positionItems() {
    const total = this._items.length;
    const angleStep = 360 / total;

    this._items.forEach((item, index) => {
      const angle = angleStep * index;

      // Positionnement 3D circulaire
      item.style.position = 'absolute';
      item.style.left = '50%';
      item.style.top = '50%';
      item.style.transformStyle = 'preserve-3d';
      item.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${this.radius}px)`;
      item.style.width = '200px';
      item.style.height = '150px';
    });

    // Démarrer l'animation
    this.startAnimation();
  }

  startAnimation() {
    this.carousel.style.animation = `carouselRotate ${this.speed}s linear infinite`;
  }

  createCarousel() {
    // Vider le carousel d'abord
    this.carousel.innerHTML = '';

    this.images.forEach((imageData, index) => {
      const item = this.createCarouselItem(imageData, index);
      this._items.push(item);
      this.carousel.appendChild(item);
    });
  }

  createCarouselItem(imageData, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.setAttribute('data-index', index);

    const imgWrap = document.createElement('div');
    imgWrap.className = 'carousel-item-inner';

    const img = document.createElement('img');
    img.src = imageData.url;
    img.alt = imageData.title || `Image ${index + 1}`;
    img.className = 'carousel-image';

    img.addEventListener('error', () => {
      const missing = document.createElement('div');
      missing.className = 'img-missing';
      missing.textContent = 'Image non trouvée';
      missing.style.width = '100%';
      missing.style.height = '100%';
      missing.style.display = 'flex';
      missing.style.alignItems = 'center';
      missing.style.justifyContent = 'center';
      missing.style.background = 'red';
      missing.style.color = 'white';
      if (img.parentNode) img.parentNode.replaceChild(missing, img);
    });

    imgWrap.appendChild(img);
    item.appendChild(imgWrap);

    return item;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const carouselConfig = {
    containerId: 'carousel3d',
    radius: 200,
    defaultSpeed: 20,
    images: [
      {
        url: 'Image/carousel/Clown.png',
        title: 'Image 1'
      },
      {
        url: 'Image/carousel/logo_dragx.png',
        title: 'Image 2'
      },
      {
        url: 'Image/carousel/Vikic.png',
        title: 'Image 3'
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

  window.carousel = new Carousel3D(carouselConfig);
});