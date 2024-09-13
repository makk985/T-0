let scene, camera, renderer, particles, starField;
let particleCount = 1750;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createParticles();
    createStarField();

    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

        colors[i * 3] = Math.random() * 0.5 + 0.5; // blue
        colors[i * 3 + 1] = Math.random() * 0.5; // purple
        colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // blue
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createStarField() {
    const geometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xFFFFFF
    });

    starField = new THREE.Points(geometry, material);
    scene.add(starField);
}

function animateParticles() {
    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];

        // Figure-8 motion
        positions[i3] = Math.sin(Date.now() * 0.001 + i * 0.1) * 20;
        positions[i3 + 1] = Math.sin(Date.now() * 0.002 + i * 0.1) * 10;
    }

    particles.geometry.attributes.position.needsUpdate = true;
}

function animate() {
    requestAnimationFrame(animate);

    animateParticles();
    starField.rotation.y += 0.0001;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();