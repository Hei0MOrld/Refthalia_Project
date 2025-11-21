// ==========================================
// Refthalia - input.js
// キーボード & マウス入力管理
// ==========================================

const keyState = {};       // 押されているキー
const keyPressedState = {}; // 押した瞬間だけ true にする
const mouseState = {
    left: false,
    right: false,
    middle: false,
    dx: 0,
    dy: 0
};

// ==========================================
// 初期化（main.js から呼ばれる）
// ==========================================
export function initialize() {
    // キーボード押下
    window.addEventListener("keydown", (e) => {
        if (!keyState[e.code]) {
            keyPressedState[e.code] = true;  // 1回だけ true
        }
        keyState[e.code] = true;
    });

    // キーボード離す
    window.addEventListener("keyup", (e) => {
        keyState[e.code] = false;
    });

    // マウス押し
    window.addEventListener("mousedown", (e) => {
        if (e.button === 0) mouseState.left = true;
        if (e.button === 1) mouseState.middle = true;
        if (e.button === 2) mouseState.right = true;
    });

    // マウス離す
    window.addEventListener("mouseup", (e) => {
        if (e.button === 0) mouseState.left = false;
        if (e.button === 1) mouseState.middle = false;
        if (e.button === 2) mouseState.right = false;
    });

    // マウス移動
    window.addEventListener("mousemove", (e) => {
        mouseState.dx = e.movementX;
        mouseState.dy = e.movementY;
    });

    console.log("🎮 Input initialized");
}

// ==========================================
// Key が押されているか（WASDなど）
// ==========================================
export function key(code) {
    return !!keyState[code];
}

// ==========================================
// 1回だけ反応するキー（ジャンプなど）
// ==========================================
export function keyPressed(code) {
    if (keyPressedState[code]) {
        keyPressedState[code] = false;
        return true;
    }
    return false;
}

// ==========================================
// マウス系
// ==========================================
export function mouse() {
    return mouseState;
}

// 毎フレーム呼ぶと dx, dy をリセットしたい場合は
export function resetMouseDelta() {
    mouseState.dx = 0;
    mouseState.dy = 0;
}

// ==========================================
// 毎フレームの更新（main.js から呼ばれる）
// keyPressed の初期化などに使う
// ==========================================
export function update() {
    // keyPressed は keydown の瞬間だけ true なので
    // ここでは特に仕事は無いけど、必要なら拡張できる

    // マウスの移動量は camera.js 側で reset されるため、
    // ここでは触らない
}
