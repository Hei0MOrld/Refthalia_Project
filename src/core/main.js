import { scene, camera, renderer, initScene } from './scene.js';
import { spawnPlayer, updatePlayer } from '../player/movement.js';
import { initCamera, updateCamera } from '../player/camera.js';
import { generateForest } from '../world/trees.js';
import * as Input from './input.js';

let player;
let lastTime = performance.now();

function init() {
    console.log("🚀 Refthalia initializing...");

    // ◆ 入力初期化 ← 絶対必要
    Input.initialize();

    // ◆ シーン初期化（地形 + 光）
    initScene();

    // ◆ プレイヤー生成
    player = spawnPlayer();
    scene.add(player);

    // ◆ カメラ初期化
    initCamera(player);

    // ◆ 森を生やす
    const forest = generateForest(300, 1.0);
    scene.add(forest);

    console.log("🌲 Forest added");

    // ◆ マウスロック
    renderer.domElement.addEventListener("click", () => {
        renderer.domElement.requestPointerLock();
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    const now = performance.now();
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    // 毎フレーム入力更新
    Input.update();

    updatePlayer(delta);
    updateCamera(delta);

    renderer.render(scene, camera);
}

init();
