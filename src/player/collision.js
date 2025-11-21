// ==========================================
// Refthalia - collision.js
// プレイヤーと地形 / オブジェクトの当たり判定
// ==========================================

import * as THREE from 'three';
import { scene } from '../core/scene.js';

// 物理設定
const PLAYER_RADIUS = 0.5;
const PLAYER_HEIGHT = 1.8;

// Raycaster （壁・地形との接触検出に使う）
const raycaster = new THREE.Raycaster();

// ------------------------------
// 1. 地面衝突（Slope も後で対応可）
// ------------------------------
export function applyGroundCollision(player, getHeightFunc) {
    // 現在位置の地形高さ
    const groundY = getHeightFunc(player.position.x, player.position.z);

    if (player.position.y < groundY + PLAYER_HEIGHT * 0.5) {
        // 足が地面に沈まないように補正
        player.position.y = groundY + PLAYER_HEIGHT * 0.5;
        return true;
    }

    return false;
}

// ------------------------------
// 2. 簡易オブジェクト衝突（木・岩・建物）
// ------------------------------

// 衝突したくない Mesh に tag をつける想定：
// obj.userData.solid = true;
export function applyObjectCollision(player) {
    let collided = false;

    // シーン中の solid オブジェクトだけ判定
    scene.traverse((obj) => {
        if (!obj.userData || !obj.userData.solid) return;

        // player を包む仮 Sphere
        const dist = player.position.distanceTo(obj.position);

        if (dist < PLAYER_RADIUS + (obj.userData.hitRadius || 1)) {
            // プレイヤーを押し返す
            const push = new THREE.Vector3()
                .subVectors(player.position, obj.position)
                .normalize()
                .multiplyScalar(0.05);

            player.position.add(push);

            collided = true;
        }
    });

    return collided;
}

// ------------------------------
// 3. 壁・木などの「前方にある障害物」
// ------------------------------
export function checkForwardObstacle(player, direction) {
    raycaster.set(player.position, direction);

    const hits = raycaster.intersectObjects(scene.children, true);

    for (const hit of hits) {
        if (!hit.object.userData || !hit.object.userData.solid) continue;
        if (hit.distance < PLAYER_RADIUS + 0.3) return true;
    }

    return false;
}
