// ======================================
// Refthalia - movement.js
// プレイヤー移動・重力・TPS対応
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

// ======================================
// プレイヤー生成（main.js から呼ばれる）
// ======================================
export function spawnPlayer() {
    player = new Player();
    player.position.set(0, 5, 0);   // 少し上からスポーン
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

    // カメラの向き（水平だけを使用）
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const camRight = new THREE.Vector3()
        .crossVectors(camDir, new THREE.Vector3(0, 1, 0))
        .normalize();

    // 移動入力
    if (forward) move.add(camDir);
    if (back)    move.sub(camDir);
    if (left)    move.sub(camRight);
    if (right)   move.add(camRight);

    // 移動処理
    if (move.lengthSq() > 0) {
        move.normalize();
        const speed = running ? RUN_SPEED : MOVE_SPEED;

        // 実際に移動
        player.position.addScaledVector(move, speed * delta);

        // 移動方向に体を向ける
        const angle = Math.atan2(move.x, move.z);
        const current = player.rotation.y;
        player.rotation.y = current + (angle - current) * 10 * delta;
    }

    // ========= 重力 & ジャンプ =========

    // 足が地面についているか
    const groundY = getHeight(player.position.x, player.position.z) + 1;

    // ジャンプ
    if (Input.keyPressed('Space') && isGrounded) {
        velocityY = JUMP_POWER;
        isGrounded = false;
    }

    // 重力
    velocityY -= GRAVITY * delta;
    player.position.y += velocityY * delta;

    // 地面に着地
    if (player.position.y < groundY) {
        player.position.y = groundY;
        velocityY = 0;
        isGrounded = true;
    }
}
