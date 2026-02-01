class Carousel3D {
    constructor(id, imgs) {
        this.container = document.getElementById(id);
        this.imgs = imgs || [];
        this.angle = 0;
        this.timer = null;
        this.paused = false;
        this.z = 300; 

        if (this.container && this.imgs.length) this.init();
    }

    init() {
        this.container.innerHTML = '';
        this.spinner = document.createElement('div');
        this.spinner.id = 'spinner-3d';
        this.container.appendChild(this.spinner);

        this.imgs.forEach((url, i) => {
            let item = document.createElement('div');
            item.className = 'item-3d';
            
            let img = document.createElement('img');
            img.src = url;
            img.onerror = () => { img.src = 'Image/logo/contact.png'; };
            
            item.appendChild(img);
            
            let deg = i * (360 / this.imgs.length);
            item.style.transform = `rotateY(${deg}deg) translateZ(${this.z}px)`;
            
            this.spinner.appendChild(item);
        });

        this.controls();
        this.auto();
    }

    controls() {
        let nav = document.createElement('div');
        nav.className = 'nav-3d';
        
        let prev = document.createElement('button');
        prev.innerText = '⬅️';
        prev.onclick = () => this.rotate(1);

        this.btnP = document.createElement('button');
        this.btnP.innerText = '⏸';
        this.btnP.onclick = () => this.toggle(this.btnP);

        let next = document.createElement('button');
        next.innerText = '➡️';
        next.onclick = () => this.rotate(-1);

        nav.appendChild(prev);
        nav.appendChild(this.btnP);
        nav.appendChild(next);
        this.container.appendChild(nav);
    }

    rotate(dir) {
        this.angle += dir * 60;
        this.spinner.style.transform = `rotateY(${this.angle}deg)`;
        
        if(!this.paused) {
            clearInterval(this.timer);
            this.timer = setInterval(() => this.rotate(-1), 3000);
        }
    }

    auto() {
        this.timer = setInterval(() => this.rotate(-1), 3000);
    }

    toggle(btn) {
        this.paused = !this.paused;
        if(this.paused) {
            clearInterval(this.timer);
            btn.innerText = '▶';
        } else {
            this.auto();
            btn.innerText = '⏸';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel3D('carousel3d', [
        'Image/carousel/Clown.png',
        'Image/carousel/logo_dragx.png',
        'Image/carousel/Vikic.png',
        'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_41.png',
        'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_44.png',
        'Image/carousel/ChatGPT%20Image%2029%20janv.%202026,%2020_18_48.png'
    ]);
});