const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 50, 200);
controls.update();

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 100, 50);
scene.add(directionalLight);

const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.userData = { 
    name: 'Sun', 
    radius: 10,
    atmosphere: 'Hydrogen, Helium', 
    moons: 0, 
    temperature: '5505°C',
    color:'#ffd700'
};
scene.add(sun);

const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starVertices = [];

for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

const planets = [
    { name: 'Mercury', radius: 2, distance: 20, speed: 0.02, color: 0x808080, atmosphere: 'None', moons: 0, temperature: '167°C' },
    { name: 'Venus', radius: 2.3, distance: 30, speed: 0.018, color: 0xffa500, atmosphere: 'Carbon Dioxide', moons: 0, temperature: '464°C' },
    { name: 'Earth', radius: 3.5, distance: 40, speed: 0.015, color: 0x0000ff, atmosphere: 'Nitrogen, Oxygen', moons: 1, temperature: '15°C' },
    { name: 'Mars', radius: 2.5, distance: 50, speed: 0.012, color: 0xff0000, atmosphere: 'Carbon Dioxide', moons: 2, temperature: '-63°C' },
    { name: 'Jupiter', radius: 7, distance: 80, speed: 0.008, color: 0xff8c00, atmosphere: 'Hydrogen, Helium', moons: 79, temperature: '-108°C' },
    { name: 'Saturn', radius: 6, distance: 110, speed: 0.006, color: 0xf0e68c, atmosphere: 'Hydrogen, Helium', moons: 83, temperature: '-139°C' },
    { name: 'Uranus', radius: 4, distance: 140, speed: 0.004, color: 0xadd8e6, atmosphere: 'Hydrogen, Helium, Methane', moons: 27, temperature: '-195°C' },
    { name: 'Neptune', radius: 4, distance: 170, speed: 0.003, color: 0x00008b, atmosphere: 'Hydrogen, Helium, Methane', moons: 14, temperature: '-201°C' }
];
planets.push({ mesh: sun, isHovered: false, ...sun.userData });
const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.background = 'rgba(0, 0, 0, 0.7)';
infoDiv.style.color = '#fff';
infoDiv.style.padding = '10px';
infoDiv.style.borderRadius = '5px';
infoDiv.style.display = 'none';
document.body.appendChild(infoDiv);

planets.forEach(planet => {
    const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: planet.color });
    planet.mesh = new THREE.Mesh(geometry, material);
    planet.angle = Math.random() * Math.PI * 2;
    scene.add(planet.mesh);

    const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.5, planet.distance + 0.5, 128);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);

    createControls(planet);

    planet.mesh.userData = planet;
    planet.isHovered = false;
});

function createControls(planet) {
    const controlsDiv = document.getElementById('controls');
    const planetDiv = document.createElement('div');
    planetDiv.className = 'planet-controls';
    planetDiv.innerHTML = `
        <h3>${planet.name}</h3>
        <label>Size: <input type="range" min="0.5" max="10" step="0.1" value="${planet.radius}" 
            oninput="updatePlanet('${planet.name}', 'radius', this.value)"></label>
        <label>Speed: <input type="range" min="0.001" max="0.05" step="0.001" value="${planet.speed}" 
            oninput="updatePlanet('${planet.name}', 'speed', this.value)"></label>
        <label>Distance: <input type="range" min="10" max="200" step="1" value="${planet.distance}" 
            oninput="updatePlanet('${planet.name}', 'distance', this.value)"></label>
    `;
    controlsDiv.appendChild(planetDiv);
}

window.updatePlanet = (name, property, value) => {
    const planet = planets.find(p => p.name === name);
    planet[property] = parseFloat(value);

    if (property === 'radius') {
        planet.mesh.geometry.dispose();
        planet.mesh.geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
    }
};

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));

    planets.forEach(planet => planet.isHovered = false);

    if (intersects.length > 0) {
        const planet = intersects[0].object.userData;
        planet.isHovered = true;
        infoDiv.style.left = `${event.clientX + 10}px`;
        infoDiv.style.top = `${event.clientY + 10}px`;
        infoDiv.style.display = 'block';
        infoDiv.innerHTML = `
            <strong>${planet.name}</strong><br>
            Size: ${planet.radius} units<br>
            Speed: ${planet.speed} units<br>
            Distance From Sun: ${planet.distance} units<br>
            Atmosphere: ${planet.atmosphere}<br>
            Moons: ${planet.moons}<br>
            Temperature: ${planet.temperature}
        `;
    } else {
        infoDiv.style.display = 'none';
    }
});

const animate = () => {
    requestAnimationFrame(animate);

    planets.forEach(planet => {
        if (!planet.isHovered) {
            planet.angle += planet.speed;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
        }
    });

    controls.update();
    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function toggleSidebar() {
    const sidebar = document.getElementById('controls');
    sidebar.style.left = sidebar.style.left === '0px' ? '-720px' : '0px';
}
