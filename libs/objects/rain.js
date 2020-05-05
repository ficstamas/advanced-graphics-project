
function build_rain_particles() {
    let loader = new THREE.TextureLoader();
    let particleSystem, particleCount, particles;

    particleCount = 1400;
    let pMaterial = new THREE.PointCloudMaterial({
        color: 0xFFFFFF,
        size: 0.8,
        map: loader.load(
            "assets/textures/raindrop2.png"
        ),
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });

    particles = new THREE.Geometry;
    for (let i = 0; i < particleCount; i++) {
        let pX = Math.random()*500 - 250,
            pY = Math.random()*500 - 250,
            pZ = Math.random()*500 - 250,
            particle = new THREE.Vector3(pX, pY, pZ);
        particle.velocity = {};
        particle.velocity.y = 0;
        particles.vertices.push(particle);
    }
    particleSystem = new THREE.PointCloud(particles, pMaterial);
    return [particleSystem, particleCount, particles];
}

function simulateRain(particleCount, particles) {
    let pCount = particleCount;
    while (pCount--) {
    let particle = particles.vertices[pCount];
    if (particle.y < -200) {
      particle.y = 200;
      particle.velocity.y = 0;
    }
    particle.velocity.y -= Math.random() * .02;
    particle.y += particle.velocity.y;
    }
    particles.verticesNeedUpdate = true;
};
