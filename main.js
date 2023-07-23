/******************************************************************************
* DEFINE CLASSES FOR CANVAS HEADER, POINTER WITH ACTUAL POSITION AND PARTICLE *
*******************************************************************************/
class HeaderCanvas {

    constructor() {
        this.canvas = document.getElementById("canvas-one");
        this.context = this.canvas.getContext("2d");
        this.context.globalAlpha = 0.5;
        this.particles = [];

        this.canvas.width = window.innerWidth;
        this.canvas.height = 150;
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    generateParticles(amount) {
        for(let i = 0; i < amount; i++) {
            this.particles[i] = new Particle(this.context);
        }
    }

    clearTrails() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    remove() {
        this.particles.forEach((particle, index, object) => {
            particle.size < 0.3 ? object.splice(index, 1) : 0;
        })
    }

}

class Pointer {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    get position() {
        return "[x] Position: " + this.xPos + ', ' + '[y] Position: ' + this.yPos;
    }
}

class Particle {

    static colorPalette = [
        "rgba(30, 29, 29, 0.67)",
        "rgba(18, 14, 16, 0.67)",
        "rgba(18, 24, 7, 0.67)",
        "rgba(63, 59, 56, 0.67)",
        "rgba(37, 28, 66, 0.67)"
    ]

    constructor(/** @type {CanvasRenderingContext2D} */ context) {
        this.xPos = cursor.xPos;
        this.yPos = cursor.yPos;
        this.xPosPerm = cursor.xPos;
        this.yPosPerm = cursor.yPos;

        this.xSpeed = Math.random() * 2 - 1;
        this.ySpeed = Math.random() * 2 - 1;
        this.size = Math.random() * 20 + 1;

        this.context = context;
        this.particleTrailWidth = 1;
    }

    create() {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.shadowColor = 'black';
        this.context.strokeStyle = "rgba(0, 0, 0, 0.5)";
        this.context.shadowBlur = 15;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.arc(this.xPos, this.yPos, this.size, 0, Math.PI * 2);
        this.context.fill();
    }
    
    update() {
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;
        this.size > 0.1 ? this.size -= 0.05 : 0;
    }

    color() {
        this.color = Particle.colorPalette[Math.floor(Math.random() * Particle.colorPalette.length)];
    }

}

/*******************************
* MAIN JS BLOCK CODE EXECUTION *
********************************/
let cursor = new Pointer(window.innerWidth / 2, 75);
let hCanvas = new HeaderCanvas();

function animate() {

    hCanvas.clearTrails();
    hCanvas.remove();

    hCanvas.particles.forEach((particle) => {
        particle.create();
        particle.update();
    });

    requestAnimationFrame(animate);
    // setTimeout("requestAnimationFrame(animate)", 500);
}

window.addEventListener("resize", (event) => {
    hCanvas.setSize(window.innerWidth, 150)
});

document.getElementById("h-ER-main").addEventListener("mousemove", (event) => {
    cursor.xPos = event.clientX;
    cursor.yPos = event.clientY;
    for(let i = 0; i < 3; i ++) {
        hCanvas.particles.push(new Particle(hCanvas.context));
    }
});

window.onload = () => {
    animate();
};