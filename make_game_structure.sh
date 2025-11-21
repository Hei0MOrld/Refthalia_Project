#!/bin/bash

# 1. プロジェクトのルートフォルダを作成
mkdir -p Refthalia_Project
cd Refthalia_Project

# 2. HTML（ゲーム起動ファイル）
echo '<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Refthalia: Project Start</title>
    <style>body { margin: 0; overflow: hidden; background: #000; }</style>
</head>
<body>
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
            }
        }
    </script>
    <script type="module" src="./src/core/main.js"></script>
</body>
</html>' > index.html

# 3. ソースコードフォルダ
mkdir -p src

# ===== CORE =====
mkdir -p src/core
touch src/core/main.js
touch src/core/scene.js
touch src/core/input.js
touch src/core/loader.js
touch src/core/utils.js

# ===== PLAYER =====
mkdir -p src/player
touch src/player/movement.js
touch src/player/action.js
touch src/player/animation.js
touch src/player/camera.js
touch src/player/collision.js
touch src/player/stamina.js
touch src/player/state.js
touch src/player/playerModel.js

# ===== WORLD =====
mkdir -p src/world/structures src/world/biomes src/world/dungeons src/world/abyss src/world/divine src/world/map

touch src/world/terrain.js
touch src/world/trees.js
touch src/world/decorators.js
touch src/world/spawnManager.js
touch src/world/weather.js
touch src/world/lighting.js

# structures
touch src/world/structures/house.js
touch src/world/structures/shop.js
touch src/world/structures/castle.js
touch src/world/structures/inn.js
touch src/world/structures/market.js
touch src/world/structures/blacksmith.js
touch src/world/structures/church.js
touch src/world/structures/ruins.js
touch src/world/structures/casino.js   # ← 修正：追加

# biomes
touch src/world/biomes/forest.js
touch src/world/biomes/deepForest.js  # ← 追加
touch src/world/biomes/mountain.js    # ← 追加
touch src/world/biomes/snowland.js
touch src/world/biomes/swamp.js       # ← 追加
touch src/world/biomes/coast.js       # ← 追加
touch src/world/biomes/desert.js
touch src/world/biomes/volcano.js

# dungeons & abyss
touch src/world/dungeons/dungeonGenerator.js
touch src/world/dungeons/cave.js
touch src/world/dungeons/undercity.js
touch src/world/dungeons/trapSystem.js
touch src/world/abyss/abyssField.js
touch src/world/abyss/corruption.js

# map
touch src/world/map/regionLoader.js
touch src/world/map/worldGrid.js # ← あった方が絶対良い
touch src/world/map/fastTravel.js

# ===== AI =====
mkdir -p src/ai/city
touch src/ai/npcBase.js
touch src/ai/npcDistanceAI.js
touch src/ai/npcEmotionAI.js
touch src/ai/monsterAI.js
touch src/ai/dialogue.js

# city AI
touch src/ai/city/populationAI.js
touch src/ai/city/economyAI.js
touch src/ai/city/rumorAI.js
touch src/ai/city/safetyAI.js
touch src/ai/city/festivalAI.js

# ===== SYSTEMS =====
mkdir -p src/systems/events src/systems/shops src/systems/fx src/systems/save src/systems/sound src/systems/kingdom

touch src/systems/flowerSystem.js
touch src/systems/skillBridge.js
touch src/systems/worldEvents.js
touch src/systems/timeSystem.js

# kingdom
touch src/systems/kingdom/kingdomManager.js
touch src/systems/kingdom/relations.js
touch src/systems/kingdom/laws.js
touch src/systems/kingdom/taxSystem.js

# events
touch src/systems/events/eventManager.js
touch src/systems/events/randomEvents.js
touch src/systems/events/storyEvents.js  # ← 隕石の噂で必須
touch src/systems/events/npcEvents.js

# shops
touch src/systems/shops/itemShop.js
touch src/systems/shops/flowerShop.js
touch src/systems/shops/weaponShop.js
touch src/systems/shops/armorShop.js
touch src/systems/shops/casinoSystem.js
touch src/systems/shops/bank.js

# fx
touch src/systems/fx/flowerFX.js
touch src/systems/fx/combatFX.js

# sound
touch src/systems/sound/bgmManager.js
touch src/systems/sound/sfxManager.js

# save
touch src/systems/save/saveManager.js
touch src/systems/save/loadManager.js

# ===== UI =====
mkdir -p src/ui
touch src/ui/hud.js
touch src/ui/notify.js
touch src/ui/skillUI.js
touch src/ui/menu.js

# ===== DATA =====
mkdir -p src/data
touch src/data/monsters.json
touch src/data/skills.json
touch src/data/countries.json

echo "🚀 Refthalia_Project 完全構造を生成しました！"
