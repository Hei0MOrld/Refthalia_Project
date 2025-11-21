// ======================================
// Refthalia - movement.js
// 主人公の移動処理（TPS & 地形同期）
// ======================================

import * as THREE from 'three';
import { camera } from '../core/scene.js';
import * as Input from '../core/input.js';
import { Player } from './playerModel.js';
import { getHeight } from '../world/terrain.js';

// ---------------------------------------
// グローバル
// ---------------------------------------
let player;
let velocityY = 0;
let isGrounded = false;

const MOVE_SPEED = 6;
const RUN_SPEED = 11;
const JUMP_POWER = 10;
const GRAVITY = 28;

// プレイヤーの足元高さ（モデルの大きさと合わせる）
const FOOT_OFFSET = 0.25;

// ======================================
// プレイヤー生成（main.js から呼ばれる）
// ======================================
export function spawnPlayer() {
    player = new Player();
    player.position.set(0, 5, 0); // → 高めにスポーンしてもOK
    return player;
}

// ======================================
// 毎フレーム更新（main.js から呼ばれる）
// ======================================
export function updatePlayer(delta) {
    if (!player) return;

    // 入力取得
    const forward = Input.key('KeyW');
    const back    = Input.key('KeyS');
    const left    = Input.key('KeyA');
    const right   = Input.key('KeyD');
    const running = Input.key('ShiftLeft');

    // 移動ベクトル
    const move = new THREE.Vector3();

    // カメラの方向（水平だけ）
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const camRight = new THREE.Vector3().crossVectors(
        camDir,
        new THREE.Vector3(0, 1, 0)
    ).normalize();

    if (forward) move.add(camDir);
    if (back)    move.sub(camDir);
    if (left)    move.sub(camRight);
    if (right)   move.add(camRight);

    // 移動処理
    if (move.lengthSq() > 0) {
        move.normalize();

        const speed = running ? RUN_SPEED : MOVE_SPEED;
        player.position.addScaledVector(move, speed * delta);

        // 向きを移動方向へ
        const angle = Math.atan2(move.x, move.z);
        const current = player.rotation.y;
        const smooth = current + (angle - current) * 10 * delta;
        player.rotation.y = smooth;
    }

    // ============================
    // ジャンプ & 重力
    // ============================
    if (Input.keyPressed('Space') && isGrounded) {
        velocityY = JUMP_POWER;
        isGrounded = false;
    }

    velocityY -= GRAVITY * delta;
    player.position.y += velocityY * delta;

    // ============================
    // 地形と同期（浮き防止）
    // ============================
    const terrainHeight = getHeight(player.position.x, player.position.z);
    const groundY = terrainHeight + FOOT_OFFSET;

    if (player.position.y < groundY) {
        player.position.y = groundY;
        velocityY = 0;
        isGrounded = true;
    }
}
