// ======================================
// Refthalia - camera.js
// TPSカメラ（Orbit + 追従）
// ======================================

import * as THREE from 'three';
import { camera } from '../core/scene.js';
import { mouse, resetMouseDelta } from '../core/input.js';

let player;

// カメラ角度
let yaw = 0;         // 左右
let pitch = 0.2;     // 上下（少し下向きスタート）
const MIN_PITCH = -1.0;
const MAX_PITCH = 0.9;

// カメラ距離
const CAMERA_DISTANCE = 6;
const CAMERA_HEIGHT = 1.5;

// ======================================
// 初期化（main.jsで呼ぶ）
// ======================================
export function initCamera(playerRef) {
    player = playerRef;

    camera.position.set(0, 2, 4);
    camera.lookAt(0, 1, 0);

    console.log("🎥 TPS Camera initialized");
}

// ======================================
// 毎フレーム更新（main.js -> update loop）
// ======================================
export function updateCamera(delta) {
    if (!player) return;

    // ============================
    // マウス入力から角度更新
    // ============================
    const m = mouse();

    yaw   -= m.dx * 0.0025;
    pitch -= m.dy * 0.0020;

    // 上下の制限
    pitch = Math.max(MIN_PITCH, Math.min(MAX_PITCH, pitch));

    // マウスデルタリセット
    resetMouseDelta();

    // ============================
    // カメラ位置計算
    // ============================
    const offset = new THREE.Vector3();

    offset.x = Math.sin(yaw) * Math.cos(pitch) * CAMERA_DISTANCE;
    offset.z = Math.cos(yaw) * Math.cos(pitch) * CAMERA_DISTANCE;
    offset.y = Math.sin(pitch) * CAMERA_DISTANCE + CAMERA_HEIGHT;

    const targetPos = player.position.clone();
    const camPos = targetPos.clone().add(offset);

    // ============================
    // 地面判定（埋まり防止）
    // ============================
    if (camPos.y < 1) camPos.y = 1.1;

    // カメラ移動
    camera.position.lerp(camPos, 10 * delta);

    // プレイヤーを見る
    camera.lookAt(
        player.position.x,
        player.position.y + 1.2,
        player.position.z
    );
}
