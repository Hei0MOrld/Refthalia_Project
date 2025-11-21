// ==========================================
// Refthalia - trees.js
// 自動森生成（軽量 / ノイズ連動 / 影対応）
// ==========================================

import * as THREE from 'three';
import { getHeight } from './terrain.js';

const treeGroup = new THREE.Group();
export { treeGroup };

// ------------------------------------------
// 木のプリセット（軽量）
// ------------------------------------------

function createTreeTypeA() {
    const group = new THREE.Group();

    // 幹
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3c1a, roughness: 1 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 2.5, 6), trunkMat);
    trunk.castShadow = true;
    group.add(trunk);

    // 葉
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x1e5b2a, roughness: 0.8 });
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(1.3, 3, 8), leafMat);
    leaf.position.y = 2.5;
    leaf.castShadow = true;
    group.add(leaf);

    return group;
}

function createTreeTypeB() {
    const group = new THREE.Group();

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x694422 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 3, 8), trunkMat);
    trunk.castShadow = true;
    group.add(trunk);

    // ふさふさタイプの葉
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d7038 });
    for (let i = 0; i < 3; i++) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), leafMat);
        leaf.position.set(
            (Math.random() - 0.5) * 1.2,
            1.5 + i * 0.7,
            (Math.random() - 0.5) * 1.2
        );
        leaf.castShadow = true;
        group.add(leaf);
    }
    return group;
}

const treeTypes = [createTreeTypeA, createTreeTypeB];

// ------------------------------------------
// 森の生成
// ------------------------------------------

export function generateForest(areaSize = 300, density = 1.0) {
    // 密度は 0.3 ~ 3.0 推奨
    const count = Math.floor(150 * density);

    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * areaSize;
        const z = (Math.random() - 0.5) * areaSize;

        // スタート地点（-10〜10）は空ける
        if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;

        const y = getHeight(x, z);
        const tree = treeTypes[Math.floor(Math.random() * treeTypes.length)]();

        tree.position.set(x, y, z);

        // ランダムな傾き（自然感アップ）
        tree.rotation.y = Math.random() * Math.PI * 2;
        tree.scale.setScalar(0.8 + Math.random() * 1.0);

        treeGroup.add(tree);
    }

    return treeGroup;
}
