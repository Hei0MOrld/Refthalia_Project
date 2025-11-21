// ======================================
// Refthalia - camera.js
// TPSカメラ（背後から追従する）
// ======================================

import * as THREE from 'three';
import { camera } from '../core/scene.js';
import { mouse, resetMouseDelta } from '../core/input.js';

let player;

// カメラ角度（初期値：やや下向き）
let yaw = 0;
let pitch = 0.25; 
const MIN_PITCH = -0.3;
const MAX_PITCH = 1.0;

// カメラオフセット
const CAMERA_DISTANCE = 6;
const CAMERA_HEIGHT = 1.5;

// ======================================
// 初期化
// ======================================
export function initCamera(playerRef) {
    player = playerRef;

    camera.position.set(0, CAMERA_HEIGHT, CAMERA_DISTANCE);
    camera.lookAt(0, 1, 0);

    console.log("🎥 TPS camera ready");
}

// ======================================
// 毎フレーム更新
// ======================================
export function updateCamera(delta) {
    if (!player) return;

    const m = mouse();

    // 角度更新
    yaw   -= m.dx * 0.0025;
    pitch -= m.dy * 0.0020;

    pitch = Math.max(MIN_PITCH, Math.min(MAX_PITCH, pitch));

    resetMouseDelta();

    // カメラの追従位置計算
    const offset = new THREE.Vector3(
        Math.sin(yaw) * Math.cos(pitch) * CAMERA_DISTANCE,
        Math.sin(pitch) * CAMERA_DISTANCE + CAMERA_HEIGHT,
        Math.cos(yaw) * Math.cos(pitch) * CAMERA_DISTANCE
    );

    const target = player.position.clone().add(offset);

    // 地面に埋まらないように
    if (target.y < 1) target.y = 1.1;

    // スムーズ追従
    camera.position.lerp(target, 10 * delta);

    camera.lookAt(
        player.position.x,
        player.position.y + 1.2,
        player.position.z
    );
}
