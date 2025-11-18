// 3D Buildings Animation
// This module handles 3D building generation and animation

class Buildings3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.buildings = [];
        this.animationFrame = null;
        this.isHomePage = this.checkIfHomePage();
    }

    checkIfHomePage() {
        // Check if we're on the Home page (Index action)
        const path = window.location.pathname.toLowerCase();
        return path === '/' || path === '/home' || path === '/home/index';
    }

    async init() {
        // Initialize Three.js scene
        this.setupThreeJS();
        
        // Create buildings
        this.createBuildings();
        
        // Start animation
        this.animate();
    }

    setupThreeJS() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = null; // Transparent background
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        // Calculate viewport height for camera positioning
        const distanceToBuildings = 300 - (-100);
        const fovRad = (75 * Math.PI) / 180;
        const viewportHeight3D = 2 * Math.tan(fovRad / 2) * distanceToBuildings;
        const buildingCenterY = viewportHeight3D / 2;
        
        // Position camera to view buildings properly
        this.camera.position.set(0, buildingCenterY, 300);
        this.camera.lookAt(0, buildingCenterY, -100); // Look at center of buildings
        
        // Create renderer
        const container = document.createElement('div');
        container.id = 'buildings-3d-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
            opacity: 0.3;
        `;
        document.body.insertBefore(container, document.body.firstChild);
        
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x00f0ff, 0.3);
        this.scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0x00f0ff, 0.5);
        directionalLight.position.set(50, 100, 50);
        this.scene.add(directionalLight);
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }


    createBuildings() {
        // Calculate full viewport height for buildings (top to bottom of page)
        // Buildings are at z = -100, camera is at z = 300
        const distanceToBuildings = 300 - (-100);
        const fovRad = (75 * Math.PI) / 180;
        const viewportHeight3D = 2 * Math.tan(fovRad / 2) * distanceToBuildings;
        this.viewportHeight3D = viewportHeight3D;
        const fullHeight = viewportHeight3D || 600; // Fallback if not set
        
        // Only 3 buildings - height spans from top to bottom of viewport
        const buildingConfigs = [
            { x: -100, z: -100, width: 50, depth: 50, height: fullHeight, delay: 0 },
            { x: 0, z: -100, width: 45, depth: 45, height: fullHeight, delay: 0.5 },
            { x: 100, z: -100, width: 48, depth: 48, height: fullHeight, delay: 1 },
        ];

        // Create visual representation with Three.js
        buildingConfigs.forEach((config, index) => {
            const building = this.createBuilding(config, index);
            this.buildings.push(building);
            this.scene.add(building);
        });
    }

    createBuilding(config, index) {
        const group = new THREE.Group();
        group.position.set(config.x, 0, config.z);
        
        // On Home page: start at 0 height for animation
        // On other pages: start at full height (already built)
        const initialHeight = this.isHomePage ? 0 : config.height;
        
        group.userData = {
            targetHeight: config.height,
            currentHeight: initialHeight,
            delay: config.delay,
            index: index,
            isBuilding: false,
            buildStartTime: null
        };

        // Create building geometry - use full height if not on home page
        const initialGeometryHeight = this.isHomePage ? 1 : config.height;
        const geometry = new THREE.BoxGeometry(config.width, initialGeometryHeight, config.depth);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00f0ff,
            emissive: 0x001122,
            transparent: true,
            opacity: 0.8,
            wireframe: false
        });

        const building = new THREE.Mesh(geometry, material);
        
        // On non-home pages, set to full height immediately
        if (!this.isHomePage) {
            building.position.y = config.height / 2;
            building.scale.y = 1;
        } else {
            building.position.y = 0.5;
            building.scale.y = 0.01; // Start small on home page
        }
        
        building.castShadow = true;
        building.receiveShadow = true;
        
        // Add glowing edges
        const edges = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0x00f0ff,
            linewidth: 2
        });
        const wireframe = new THREE.LineSegments(edges, edgeMaterial);
        building.add(wireframe);

        group.add(building);
        group.userData.mesh = building;
        group.userData.geometry = geometry;
        group.userData.material = material;

        // Only start building animation on Home page
        if (this.isHomePage) {
            setTimeout(() => {
                group.userData.isBuilding = true;
                group.userData.buildStartTime = Date.now();
            }, config.delay * 1000);
        } else {
            // On other pages, mark as already complete - no grow-up animation
            group.userData.isBuilding = false;
            group.userData.currentHeight = config.height;
        }

        return group;
    }

    animate() {
        this.animationFrame = requestAnimationFrame(() => this.animate());
        
        const currentTime = Date.now();
        const buildDuration = 2000; // 2 seconds to build each building

        this.buildings.forEach((building, index) => {
            const userData = building.userData;
            
            // Update building animation (JavaScript implementation)
            if (userData.isBuilding && userData.currentHeight < userData.targetHeight) {
                const elapsed = currentTime - userData.buildStartTime;
                const progress = Math.min(elapsed / buildDuration, 1);
                
                // Easing function for smooth building animation
                const easedProgress = this.easeOutCubic(progress);
                userData.currentHeight = userData.targetHeight * easedProgress;
            }
            
            // Update visual representation
            // On non-home pages, always show at full height (no grow-up animation)
            // On home page, only show if currentHeight > 0
            if (!this.isHomePage || userData.currentHeight > 0) {
                const height = this.isHomePage ? userData.currentHeight : userData.targetHeight;
                
                if (this.isHomePage) {
                    // On Home page: scale building as it grows
                    building.scale.y = height;
                    building.position.y = height / 2;
                    
                    // Update geometry dynamically as building grows
                    if (userData.geometry && height > 1) {
                        const currentHeight = userData.mesh.geometry.parameters.height;
                        if (Math.abs(currentHeight - height) > 1) {
                            userData.geometry.dispose();
                            userData.geometry = new THREE.BoxGeometry(
                                userData.mesh.geometry.parameters.width,
                                height,
                                userData.mesh.geometry.parameters.depth
                            );
                            userData.mesh.geometry = userData.geometry;
                            
                            // Update wireframe
                            const edges = new THREE.EdgesGeometry(userData.geometry);
                            const edgeMaterial = new THREE.LineBasicMaterial({
                                color: 0x00f0ff,
                                linewidth: 2
                            });
                            // Remove old wireframe
                            const oldWireframe = userData.mesh.children.find(child => child instanceof THREE.LineSegments);
                            if (oldWireframe) {
                                userData.mesh.remove(oldWireframe);
                                oldWireframe.geometry.dispose();
                                oldWireframe.material.dispose();
                            }
                            // Add new wireframe
                            const wireframe = new THREE.LineSegments(edges, edgeMaterial);
                            userData.mesh.add(wireframe);
                        }
                    }
                } else {
                    // On other pages: keep at full height, no animation
                    building.scale.y = 1;
                    building.position.y = userData.targetHeight / 2;
                }
            }
            
            // Rotation animation
            // On non-home pages: always rotate (buildings are already complete)
            // On home page: only rotate after building is complete
            const shouldRotate = !this.isHomePage || (userData.currentHeight >= userData.targetHeight);
            
            if (shouldRotate) {
                const rotationSpeed = this.isHomePage ? 0.001 : 0.003; // Faster rotation on other pages
                building.rotation.y += rotationSpeed;
                
                // Subtle floating animation
                const baseY = userData.targetHeight / 2;
                building.position.y = baseY + Math.sin(currentTime * 0.001 + userData.index) * 2;
            }
        });

        // Rotate camera slightly for dynamic view
        const buildingCenterY = this.viewportHeight3D / 2;
        this.camera.position.x = Math.sin(currentTime * 0.0001) * 50;
        this.camera.position.z = 300 + Math.cos(currentTime * 0.0001) * 30;
        this.camera.lookAt(0, buildingCenterY, -100); // Look at center of buildings

        this.renderer.render(this.scene, this.camera);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.buildings.forEach(building => {
            building.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
        });
    }
}

// Initialize when Three.js is loaded
let buildings3D = null;

function initBuildings3D() {
    if (typeof THREE !== 'undefined') {
        buildings3D = new Buildings3D();
        buildings3D.init();
    } else {
        console.error('Three.js not loaded');
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for Three.js to load
        if (typeof THREE !== 'undefined') {
            initBuildings3D();
        } else {
            // Load Three.js dynamically
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = initBuildings3D;
            document.head.appendChild(script);
        }
    });
} else {
    if (typeof THREE !== 'undefined') {
        initBuildings3D();
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = initBuildings3D;
        document.head.appendChild(script);
    }
}

