import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useState, useEffect, useRef } from "react";
import './modelo3d.css'

function Modelo3D({ filePath, description }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 700 / 500, 0.1, 500);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
    
        renderer.setSize(300, 220);  // Tamanho do canvas
        renderer.setClearColor(0x000000, 0);  // Cor de fundo
        mountRef.current.appendChild(renderer.domElement);
    
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.04;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;
    
        // Luz ambiente suave
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);  // Maior intensidade
        scene.add(ambientLight);
    
        // Luz direcional com alvo de direção
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        directionalLight.target.position.set(0, 0, 0); // Foca na origem da cena
        scene.add(directionalLight);
        scene.add(directionalLight.target);  // Necessário para o alvo da luz
    
        // Luz pontual (PointLight) mais intensa
        const pointLight = new THREE.PointLight(0xffffff, 2, 100);  // Maior intensidade
        pointLight.position.set(0, 10, 0);
        scene.add(pointLight);
    
        // Luz de preenchimento (Fill Light)
        const fillLight = new THREE.PointLight(0xffffff, 0.5, 100);
        fillLight.position.set(0, -10, 0);  // Posicionada abaixo para suavizar sombras
        scene.add(fillLight);
    
        // Configuração de sombra suave
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.radius = 5;  // Ajuste para sombras mais suaves
    
        const loader = new GLTFLoader();
    
        loader.load(
            filePath,
            (gltf) => {
                const model = gltf.scene;
    
                model.rotation.y = Math.PI / -2;
                model.scale.set(1, 1, 1); // Tamanho padrão do objeto
                model.position.set(0.1, -0.4, 0); // Posição padrão do objeto
    
                model.traverse((node) => {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
    
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('Erro ao carregar o modelo:', error);
            }
        );
    
        camera.position.z = 2;
    
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div>
            <div className="objeto3D cursor-move justify-center flex absolute border-8 border-stam-bg-4 rounded-3xl hover:border-stam-orange" ref={mountRef}>
                <span class="material-symbols-outlined icon3D absolute left-1 top-1 text-gray-400">
                    3d_rotation
                </span>
                <p className="text-white absolute bottom-2 font-light text-center text-sm">{description}</p>
            </div>
        </div>
    )
}

export default Modelo3D