// ======================================
// TPSカメラ（完全ゲーム仕様）
// ======================================

import * as THREE from 'three';
import { camera } from '../core/scene.js';
import { mouse, resetMouseDelta } from '../core/input.js';

let player;

let yaw = 0;
let pitch = 0.45;
const MIN_PITCH = 0.1;
const MAX_PITCH = 1.2;

const CAMERA_DISTANCE = 5.5;
const CAMERA_HEIGHT = 1.6;

export function initCamera(playerRef) {
    player = playerRef;
    camera.position.set(0, CAMERA_HEIGHT, CAMERA_DISTANCE);
}

export function updateCamera(delta) {
    if (!player) return;

    const m = mouse();

    yaw   -= m.dx * 0.0025;
    pitch -= m.dy * 0.0020;

    pitch = Math.max(MIN_PITCH, Math.min(MAX_PITCH, pitch));

    resetMouseDelta();

    const offset = new THREE.Vector3(
        Math.sin(yaw) * Math.cos(pitch) * CAMERA_DISTANCE,
        Math.sin(pitch) * CAMERA_DISTANCE + CAMERA_HEIGHT,
        Math.cos(yaw) * Math.cos(pitch) * CAMERA_DISTANCE
    );

    const camPos = player.position.clone().add(offset);

    camera.position.lerp(camPos, 8 * delta);

    camera.lookAt(
        player.position.x,
        player.position.y + 1.2,
        player.position.z
    );
}
