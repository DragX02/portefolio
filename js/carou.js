class Carousel3D {
    constructor(id, imgs) {
        this.container = document.getElementById(id);
        this.imgs = imgs;
        this.angle = 0;
        this.timer = null;
        this.paused = false;
        this.z = 300;
        this.spinner = null;

        if (this.container) {
            this.init();
        }
    }

    init() {
        this.spinner = document.createElement('div');
        this.spinner.id = 'spinner-3d';
        this.container.appendChild(this.spinner);

        const angleStep = 360 / this.imgs.length;

        this.imgs.forEach((src, i) => {
            const div = document.createElement('div');
            div.classList.add('item-3d');
            div.style.transform = `rotateY(${angleStep * i}deg) translateZ(${this.z}px)`;

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Image ${i + 1}`;
            img.onerror = function() {
                this.src = 'Image/logo/contact.png';
            };
            div.appendChild(img);
            this.spinner.appendChild(div);
        });

        this.controls();
        this.auto();
    }

    controls() {
        const nav = document.createElement('div');
        nav.classList.add('nav-3d');

        const btnPrev = document.createElement('button');
        btnPrev.textContent = '\u25C0';
        btnPrev.addEventListener('click', () => this.rotate(-1));

        const btnPlayPause = document.createElement('button');
        btnPlayPause.textContent = '\u23F8';
        btnPlayPause.addEventListener('click', () => this.toggle(btnPlayPause));

        const btnNext = document.createElement('button');
        btnNext.textContent = '\u25B6';
        btnNext.addEventListener('click', () => this.rotate(1));

        nav.appendChild(btnPrev);
        nav.appendChild(btnPlayPause);
        nav.appendChild(btnNext);
        this.container.appendChild(nav);
    }

    rotate(dir) {
        const step = 360 / this.imgs.length;
        this.angle += step * dir;
        this.spinner.style.transform = `rotateY(${this.angle}deg)`;
    }

    auto() {
        this.timer = setInterval(() => {
            if (!this.paused) {
                this.rotate(1);
            }
        }, 3000);
    }

    toggle(btn) {
        this.paused = !this.paused;
        btn.textContent = this.paused ? '\u25B6' : '\u23F8';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const images = [
        'Image/carousel/Clown.png',
        'Image/carousel/logo_dragx.png',
        'Image/carousel/Vikic.png',
        'Image/carousel/ChatGPT Image 29 janv. 2026, 20_18_41.png',
        'Image/carousel/ChatGPT Image 29 janv. 2026, 20_18_44.png',
        'Image/carousel/ChatGPT Image 29 janv. 2026, 20_18_48.png'
    ];

    new Carousel3D('carousel3d', images);
});