// ==========================================
// Refthalia - scene.js
// Three.js 初期化・ライト・本格地形・影
// ==========================================

import * as THREE from 'three';
import { createTerrain } from '../world/terrain.js';

// ------------------------------------------
// 基本エンジン
// ------------------------------------------
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

// レンダラー
export const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// HTMLに追加
document.body.appendChild(renderer.domElement);

// ------------------------------------------
// ライト設定
// ------------------------------------------
export function initLights() {
    // 柔らかい環境光
    const ambient = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
    scene.add(ambient);

    // 太陽光
    const sun = new THREE.DirectionalLight(0xffffee, 1.3);
    sun.position.set(120, 200, 80);
    sun.castShadow = true;

    // 影解像度
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 400;
    sun.shadow.camera.left = -150;
    sun.shadow.camera.right = 150;
    sun.shadow.camera.top = 150;
    sun.shadow.camera.bottom = -150;

    scene.add(sun);

    console.log("☀ Lights initialized");
}

// ------------------------------------------
// カメラ初期位置
// ------------------------------------------
export function initCamera() {
    camera.position.set(0, 3, 6);
    camera.lookAt(0, 1, 0);
}

// ------------------------------------------
// リサイズ対応
// ------------------------------------------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ------------------------------------------
// 初期化まとめ（main.js から呼ぶ）
// ------------------------------------------
export function initScene() {
    initLights();

    // ★ terrain（本物の大地）
    const terrain = createTerrain();
    scene.add(terrain);

    initCamera();

    console.log("🌿 Scene initialized (Terrain + Lights + Camera)");
}
