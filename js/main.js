const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;
let currentMode = 'flow';
let rainbowMode = false;
let hue = 0;
let renderMode = 'draw'; // 'draw' o 'animation'

const settings = {
    particleSize: 3,
    speed: 8,
    gravity: 0.3,
    spread: 45,
    trailLength: 30,
    emissionRate: 5,
    glowEffect: true,
    connectParticles: false,
    repulsion: false,
    color: '#ff6b9d'
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, vx, vy, color, mode) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 1;
        this.color = color;
        this.size = settings.particleSize;
        this.mode = mode;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        if (this.mode === 'gravity' || this.mode === 'fireworks') {
            this.vy += settings.gravity;
        }

        if (this.mode === 'spiral') {
            this.angle += this.rotationSpeed;
            this.vx += Math.cos(this.angle) * 0.1;
            this.vy += Math.sin(this.angle) * 0.1;
        }

        if (this.mode === 'galaxy') {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const dx = centerX - this.x;
            const dy = centerY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = dist * 0.0001;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
        }

        if (settings.repulsion) {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                const force = (100 - dist) / 100;
                this.vx += (dx / dist) * force * 2;
                this.vy += (dy / dist) * force * 2;
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        this.life -= 0.01;

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
            this.life = 0;
        }
    }

    draw() {
        ctx.globalAlpha = this.life;
        
        if (settings.glowEffect) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

function createParticles(x, y) {
    const color = rainbowMode ? `hsl(${hue}, 70%, 60%)` : settings.color;
    
    for (let i = 0; i < settings.emissionRate; i++) {
        let vx, vy;
        const baseSpeed = settings.speed;

        switch (currentMode) {
            case 'explosion':
                const angle = Math.random() * Math.PI * 2;
                vx = Math.cos(angle) * baseSpeed;
                vy = Math.sin(angle) * baseSpeed;
                break;
            
            case 'flow':
                const spreadRad = (settings.spread * Math.PI / 180);
                const flowAngle = -Math.PI / 2 + (Math.random() - 0.5) * spreadRad;
                vx = Math.cos(flowAngle) * baseSpeed;
                vy = Math.sin(flowAngle) * baseSpeed;
                break;
            
            case 'spiral':
            case 'galaxy':
                const spiralAngle = (Math.random() * Math.PI * 2);
                vx = Math.cos(spiralAngle) * baseSpeed * 0.5;
                vy = Math.sin(spiralAngle) * baseSpeed * 0.5;
                break;
            
            case 'fireworks':
                const fwAngle = Math.random() * Math.PI * 2;
                const fwSpeed = baseSpeed * (0.5 + Math.random() * 0.5);
                vx = Math.cos(fwAngle) * fwSpeed;
                vy = Math.sin(fwAngle) * fwSpeed - baseSpeed;
                break;
            
            default:
                vx = (Math.random() - 0.5) * baseSpeed;
                vy = (Math.random() - 0.5) * baseSpeed;
        }

        particles.push(new Particle(x, y, vx, vy, color, currentMode));
    }

    if (rainbowMode) {
        hue = (hue + 2) % 360;
    }
}

function connectParticles() {
    const maxDist = 100;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
                ctx.globalAlpha = (1 - dist / maxDist) * 0.3;
                ctx.strokeStyle = particles[i].color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;
}

let lastTime = 0;
let frames = 0;
let fps = 60;

function animate(currentTime) {
    if (renderMode === 'animation') {
        const fadeAlpha = 1 - (settings.trailLength / 100);
        ctx.fillStyle = `rgba(13, 13, 13, ${fadeAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (isMouseDown) {
        createParticles(mouseX, mouseY);
    }

    if (renderMode === 'animation') {
        particles = particles.filter(p => {
            p.update();
            if (p.life > 0) {
                p.draw();
                return true;
            }
            return false;
        });

        if (settings.connectParticles && particles.length < 200) {
            connectParticles();
        }
    } else {
        if (isMouseDown) {
            const color = rainbowMode ? `hsl(${hue}, 70%, 60%)` : settings.color;
            
            if (settings.glowEffect) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = color;
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, settings.particleSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;

            if (rainbowMode) {
                hue = (hue + 2) % 360;
            }
        }
    }

    document.getElementById('particleCount').textContent = renderMode === 'animation' ? particles.length : 'N/A';

    frames++;
    if (currentTime - lastTime >= 1000) {
        fps = frames;
        document.getElementById('fps').textContent = fps;
        frames = 0;
        lastTime = currentTime;
    }

    requestAnimationFrame(animate);
}

// Event Listeners
canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isMouseDown = true;
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', () => {
    isMouseDown = false;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});

// UI Controls
document.querySelectorAll('.mode-btn[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn[data-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
    });
});

document.getElementById('particleSize').addEventListener('input', (e) => {
    settings.particleSize = parseFloat(e.target.value);
    document.getElementById('particleSizeVal').textContent = settings.particleSize;
});

document.getElementById('speed').addEventListener('input', (e) => {
    settings.speed = parseFloat(e.target.value);
    document.getElementById('speedVal').textContent = settings.speed;
});

document.getElementById('gravity').addEventListener('input', (e) => {
    settings.gravity = parseFloat(e.target.value);
    document.getElementById('gravityVal').textContent = settings.gravity;
});

document.getElementById('spread').addEventListener('input', (e) => {
    settings.spread = parseInt(e.target.value);
    document.getElementById('spreadVal').textContent = settings.spread;
});

document.getElementById('trailLength').addEventListener('input', (e) => {
    settings.trailLength = parseInt(e.target.value);
    document.getElementById('trailLengthVal').textContent = settings.trailLength;
});

document.getElementById('emissionRate').addEventListener('input', (e) => {
    settings.emissionRate = parseInt(e.target.value);
    document.getElementById('emissionRateVal').textContent = settings.emissionRate;
});

document.getElementById('colorPicker').addEventListener('input', (e) => {
    settings.color = e.target.value;
    rainbowMode = false;
    document.getElementById('rainbowMode').classList.remove('active');
});

document.getElementById('rainbowMode').addEventListener('click', () => {
    rainbowMode = !rainbowMode;
    document.getElementById('rainbowMode').classList.toggle('active');
});

document.getElementById('glowToggle').addEventListener('change', (e) => {
    settings.glowEffect = e.target.checked;
});

document.getElementById('connectToggle').addEventListener('change', (e) => {
    settings.connectParticles = e.target.checked;
});

document.getElementById('repulsionToggle').addEventListener('change', (e) => {
    settings.repulsion = e.target.checked;
});

document.getElementById('clearBtn').addEventListener('click', () => {
    particles = [];
    ctx.fillStyle = 'rgba(13, 13, 13, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('saveBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'arte-particulas.png';
    link.href = canvas.toDataURL();
    link.click();
});

document.getElementById('randomBtn').addEventListener('click', () => {
    settings.particleSize = Math.random() * 9 + 1;
    settings.speed = Math.random() * 19 + 1;
    settings.gravity = Math.random() * 2;
    settings.spread = Math.floor(Math.random() * 360);
    settings.trailLength = Math.floor(Math.random() * 100);
    settings.emissionRate = Math.floor(Math.random() * 19 + 1);

    document.getElementById('particleSize').value = settings.particleSize;
    document.getElementById('particleSizeVal').textContent = settings.particleSize.toFixed(1);
    document.getElementById('speed').value = settings.speed;
    document.getElementById('speedVal').textContent = settings.speed.toFixed(1);
    document.getElementById('gravity').value = settings.gravity;
    document.getElementById('gravityVal').textContent = settings.gravity.toFixed(1);
    document.getElementById('spread').value = settings.spread;
    document.getElementById('spreadVal').textContent = settings.spread;
    document.getElementById('trailLength').value = settings.trailLength;
    document.getElementById('trailLengthVal').textContent = settings.trailLength;
    document.getElementById('emissionRate').value = settings.emissionRate;
    document.getElementById('emissionRateVal').textContent = settings.emissionRate;

    const modes = ['flow', 'explosion', 'gravity', 'spiral', 'fireworks', 'galaxy'];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    document.querySelector(`[data-mode="${randomMode}"]`).click();

    rainbowMode = Math.random() > 0.5;
    document.getElementById('rainbowMode').classList.toggle('active', rainbowMode);
});

document.getElementById('animationMode').addEventListener('click', () => {
    renderMode = 'animation';
    document.getElementById('animationMode').classList.add('active');
    document.getElementById('drawMode').classList.remove('active');
    document.getElementById('renderMode').textContent = 'Animación';
    particles = [];
    ctx.fillStyle = 'rgba(13, 13, 13, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('drawMode').addEventListener('click', () => {
    renderMode = 'draw';
    document.getElementById('drawMode').classList.add('active');
    document.getElementById('animationMode').classList.remove('active');
    document.getElementById('renderMode').textContent = 'Dibujo';
    particles = [];
});

// Iniciar la animación
animate(0);