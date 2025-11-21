// ======================================
// Refthalia - camera.js
// 理想的 TPS カメラ（自然な追従）
// ======================================

import * as THREE from 'three';
import { camera } from '../core/scene.js';
import { mouse, resetMouseDelta } from '../core/input.js';

let player;

// 初期角度（ゲームっぽい）
let yaw = 0;
let pitch = 0.45;  // ← ここ重要：少し下向きスタート
const MIN_PITCH = 0.05;   // 下から見上げすぎない
const MAX_PITCH = 1.2;    // 真上になりすぎない

// カメラ設定
const CAMERA_DISTANCE = 5.2;  // キャラからの距離
const CAMERA_HEIGHT = 1.7;    // カメラの高さ

export function initCamera(playerRef) {
    player = playerRef;

    camera.position.set(0, CAMERA_HEIGHT, CAMERA_DISTANCE);
    camera.lookAt(0, 1.2, 0);
}

// ======================================
// 毎フレーム更新
// ======================================
export function updateCamera(delta) {
    if (!player) return;

    const m = mouse();

    // マウスの移動で角度を更新
    yaw   -= m.dx * 0.002;
    pitch -= m.dy * 0.0018;

    pitch = Math.max(MIN_PITCH, Math.min(MAX_PITCH, pitch));

    resetMouseDelta();

    // 理想的 TPS 位置を計算
    const offset = new THREE.Vector3(
        Math.sin(yaw) * Math.cos(pitch) * CAMERA_DISTANCE,
        Math.sin(pitch) * CAMERA_DISTANCE + CAMERA_HEIGHT,
        Math.cos(yaw) * Math.cos(pitch) * CAMERA_DISTANCE
    );

    const targetPos = player.position.clone().add(offset);

    // プレイヤーを見る
    camera.position.lerp(targetPos, 8 * delta);

    camera.lookAt(
        player.position.x,
        player.position.y + 1.2,
        player.position.z
    );
}
