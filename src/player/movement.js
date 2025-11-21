// ======================================
// Refthalia - movement.js
// 主人公の移動処理（TPS視点対応）
// ======================================

import * as THREE from 'three';
import { camera } from '../core/scene.js';
import * as Input from '../core/input.js';
import { Player } from './playerModel.js';



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
    player.position.set(0, 2, 0);
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

    const camRight = new THREE.Vector3().crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

    if (forward) move.add(camDir);
    if (back)    move.sub(camDir);
    if (left)    move.sub(camRight);
    if (right)   move.add(camRight);

    // 移動があるなら正規化
    if (move.lengthSq() > 0) {
        move.normalize();

        // スピード
        const speed = running ? RUN_SPEED : MOVE_SPEED;

        // 位置更新
        player.position.addScaledVector(move, speed * delta);

        // 向きを移動方向に合わせる（自然な回転）
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

    // 地面判定（超簡易）
    if (player.position.y < 1) {
        player.position.y = 1;
        velocityY = 0;
        isGrounded = true;
    }
}
