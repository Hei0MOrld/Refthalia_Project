// ======================================
// Refthalia - playerModel.js
// 主人公ボクセルモデル生成
// ======================================

import * as THREE from 'three';

// 画面全体で他のスクリプトが参照できるよう export
export class Player extends THREE.Group {
    constructor() {
        super();

        const skin = new THREE.MeshStandardMaterial({ color: 0xffc9a5 });
        const cloth = new THREE.MeshStandardMaterial({ color: 0x335533 }); // 深緑
        const pants = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const shoes = new THREE.MeshStandardMaterial({ color: 0x111111 });

        // スケール調整
        const S = 0.1;

        // ========================
        // 体（Torso）
        // ========================
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(10 * S, 14 * S, 5 * S),
            cloth
        );
        body.position.set(0, 14 * S, 0);

        // ========================
        // 頭（Head）
        // ========================
        const head = new THREE.Mesh(
            new THREE.BoxGeometry(10 * S, 10 * S, 10 * S),
            skin
        );
        head.position.set(0, 25 * S, 0);

        // ========================
        // 腕
        // ========================
        this.armL = new THREE.Mesh(
            new THREE.BoxGeometry(3 * S, 12 * S, 3 * S),
            cloth
        );
        this.armL.position.set(7 * S, 14 * S, 0);

        this.armR = new THREE.Mesh(
            new THREE.BoxGeometry(3 * S, 12 * S, 3 * S),
            cloth
        );
        this.armR.position.set(-7 * S, 14 * S, 0);

        // ========================
        // 足
        // ========================
        this.legL = new THREE.Mesh(
            new THREE.BoxGeometry(4 * S, 12 * S, 4 * S),
            pants
        );
        this.legL.position.set(3 * S, 6 * S, 0);

        this.legR = new THREE.Mesh(
            new THREE.BoxGeometry(4 * S, 12 * S, 4 * S),
            pants
        );
        this.legR.position.set(-3 * S, 6 * S, 0);

        // ========================
        // 靴
        // ========================
        const shoeL = new THREE.Mesh(
            new THREE.BoxGeometry(4 * S, 3 * S, 6 * S),
            shoes
        );
        shoeL.position.set(0, -7 * S, 1 * S);
        this.legL.add(shoeL);

        const shoeR = new THREE.Mesh(
            new THREE.BoxGeometry(4 * S, 3 * S, 6 * S),
            shoes
        );
        shoeR.position.set(0, -7 * S, 1 * S);
        this.legR.add(shoeR);

        // ========================
        // 手に持つ用のノード（右手）
        // ========================
        this.handNode = new THREE.Group();
        this.handNode.position.set(0, -6 * S, 3 * S);
        this.armR.add(this.handNode);

        // 花（仮）
        const flower = new THREE.Mesh(
            new THREE.ConeGeometry(2 * S, 5 * S, 5),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        flower.rotation.x = Math.PI / 2;
        this.handNode.add(flower);

        // ========================
        // モデルの追加
        // ========================
        this.add(body);
        this.add(head);
        this.add(this.armL);
        this.add(this.armR);
        this.add(this.legL);
        this.add(this.legR);

        // 影を落とす
        this.castShadow = true;
        [body, head, this.armL, this.armR, this.legL, this.legR].forEach(
            (p) => (p.castShadow = true)
        );

        console.log("🧍 Player model created");
    }
}
