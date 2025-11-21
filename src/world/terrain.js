// ===============================================
// Refthalia - terrain.js
// 本格ノイズ地形生成（Perlin風 3層）
// ===============================================

import * as THREE from 'three';

// ===============================================
// 1. 疑似 Perlin ノイズ
// ===============================================
function hash(x, y) {
    let t = x * 374761393 + y * 668265263; // 大きい素数
    t = (t ^ (t >> 13)) * 1274126177;
    return (t ^ (t >> 16)) >>> 0;
}

// [-1,1] のランダム
function rand(x, y) {
    return (hash(x, y) / 0xffffffff) * 2 - 1;
}

// ===============================================
// 2. ノイズ関数（滑らか補間）
// ===============================================
function smoothNoise(x, z) {
    const xi = Math.floor(x);
    const zi = Math.floor(z);

    const xf = x - xi;
    const zf = z - zi;

    const s = rand(xi, zi);
    const t = rand(xi + 1, zi);
    const u = rand(xi, zi + 1);
    const v = rand(xi + 1, zi + 1);

    // 補間
    const st = THREE.MathUtils.lerp(s, t, xf);
    const uv = THREE.MathUtils.lerp(u, v, xf);
    return THREE.MathUtils.lerp(st, uv, zf);
}

// =================================================
// 3. 本体 height 関数（地形のレシピ）
// =================================================
// スケール・高さは後で国ごとに変えてもいい
export function getHeight(x, z) {
    // 全体スケール
    const s1 = smoothNoise(x * 0.02, z * 0.02) * 18; // 大地のうねり（山脈）
    const s2 = smoothNoise(x * 0.08, z * 0.08) * 6;  // 中規模（丘）
    const s3 = smoothNoise(x * 0.3, z * 0.3) * 1.2; // 小起伏（地面の揺らぎ）

    return s1 + s2 + s3;
}

// =================================================
// 4. メッシュ生成（描画用地形）
// =================================================

let terrainMesh;

export function createTerrain() {
    const size = 300;
    const segments = 160;

    const geo = new THREE.PlaneGeometry(size, size, segments, segments);

    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getY(i); // PlaneGeometry の Z は "Y" にある

        const h = getHeight(x, z);
        pos.setZ(i, h);
    }

    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
        color: 0x5c8a4d,
        roughness: 0.95,
        flatShading: false
    });

    terrainMesh = new THREE.Mesh(geo, mat);
    terrainMesh.rotation.x = -Math.PI / 2;
    terrainMesh.receiveShadow = true;

    return terrainMesh;
}

// =================================================
// 5. 地形の更新（時間で揺れる世界なども可能）
// =================================================
export function updateTerrain(delta) {
    // 今は何もしない。将来：地震・沼・腐敗エリアなどで動かせる
}
