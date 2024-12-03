//requires:tetra
//priority:1

yi$tool.tetra$tool = {
    registry:{
        materials:new registry$materials
    },
    setting:{
        key:"key",
        类别:"category",
        硬度:"primary",
        密度:"secondary",
        韧性:"tertiary",
        耐久:"durability",
        完整度消耗:"integrityCost",
        完整度奖励:"integrityGain",
        魔法容量:"magicCapacity",
        工具等级:"toolLevel",
        工具效率:"toolEfficiency"}
}
/**默认为樱桃木属性 */
function registry$materials(){
    this.json = {
        "key": "cherry",
        "category": "wood",
        "primary": 3.5,
        "secondary": 1.7,
        "tertiary": 6.5,
        "durability": 70,
        "integrityCost": 1,
        "integrityGain": 5,
        "magicCapacity": 80,
        "toolLevel": "minecraft:wood",
        "toolEfficiency": 2,
        "tints": {
            "glyph": "e3b1ab",
            "texture": "f5c8c2"
        },
        "textures": [
            "crude",
            "wooden"
        ],
        "material": {
            "items": [
                "minecraft:cherry_planks"
            ]
        },
        "requiredTools": {
            "axe_dig": "minecraft:stone"
        }
    }
    this.setKey = function(/**@type {yi.tetra.key0}*/key,value){this.json[key] = value;return this}
    this.setMaterialType = function(/**@type {yi.tetra.MaterialType}*/type){this.json.category = type;return this}
    this.setSecondaryKey = function(/**@type {yi.tetra.key1}*/key1,/**@type {yi.tetra.key2}*/key2,value){this.json[key1][key2] = value;return this}
    this.setNeedTool = function(/**@type {yi.tetra.requiredTools}*/type,/**@type {yi.tetra.tier}*/tier){this.json.requiredTools[type] = tier;return this}
    this.create = function(){JsonIO.write(`./kubejs/data/tetra/materials/${this.json.category}/${this.json.key}.json`,this.json)}
}
ItemEvents.rightClicked(event=>{
    event.player.lookAngle
})