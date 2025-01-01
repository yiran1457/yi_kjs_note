<h1>Materials</h1>
  <p>
    现在可以按材料定义某些属性，然后模块和蓝图可以引用这些属性。<br>
    <br>
    材料数据按照材料类型组织在文件夹中（例如，wood、metal 或 skin），每个材料对应一个文件/资源。模块和蓝图可以引用特定的材料（例如，wood/spruce 或 misc/bone）或某种类型的全部材料（例如，wood 或 metal），并定义这些材料的属性如何应用于模块。<br>
    <br>
    材料数据从 data/tetra/materials/ 文件夹加载
  </p>
<h2>Material</h2>
  <p>
  在 tetra 中定义材料数据。此资源中的大多数字段都可用于模块变体和原理图结果，并且在该上下文中阅读时可能更容易理解。

  Format:<br>
    >replace optional boolean <br>
    >标记是否应替换或合并此原理图定义的现有条目（如果有）。由其他 Mod 和数据包添加的材质的默认行为是将它们设置的值合并到现有条目中（如果有）。通过将 replace 设置为 true，可以完全替换 tetra 注册的材质，这在想要删除某些内容时非常有用。 <br>
    >key string <br>
    >材料的标识符，将用作此材料的模块变体的后缀。 <br>
    >category optional string <br>
    >适用于此材料的所有模块变体。 <br>
    >hidden optional boolean <br>
    >如果设置为 true，则此材料不会显示在全息层中。 <br>
    >hiddenOutcomes optional boolean <br>
    >如果设置为 true，则从此材料派生的 module 和 improvement 变体将不会显示在 holosphere 中。 <br>
    >primary number <br>
    >主要属性和效果的乘数。应表示硬度、锐度或将此材料塑造成具有硬/锐边的能力。材质模块变体在确定属性和效果时引用此属性。 <br>
    >secondary number <br>
    >次要属性和效果的乘数。应表示材料密度、刚度或重量，即摆动时携带多少动能。材质模块变体在确定属性和效果时引用此属性。 <br>
    >tertiary number <br>
    >三级属性和效果的乘数。应代表柔韧性或抗拉强度，这种材料在弯曲时回弹的速度有多快。材质模块变体在确定属性和效果时引用此属性。 <br>
    >durability number <br>
    >耐久度基础，模块使用它来决定平坦或乘数耐久度加成。 <br>
    >integrityGain number <br>
    >提供完整性的模块的乘数。 <br>
    >features optional array[ string ]
    >在 holosphere 中查看材料时，会显示特征，用于描述与此材料相关的制作效果行为。例如，tetracelium 使用它来描述 Twilight Forest 金属如何根据模块类型应用不同的附魔。
</p>
Examples:
{
  "key": "oak",
  "category": "wood",
  "primary": "3",
  "secondary": "4",
  "tertiary": "6",
  "durability": "5.2",
  "integrityCost": "1",
  "integrityGain": "4",
  "magicCapacity": "90",
  "toolLevel": "1",
  "toolEfficiency": "2",
  "tints": {
    "glyph": "oak_glyph",
    "texture": "oak"
  },
  "textures": [
    "crude",
    "default"
  ],
  "material": {
    "tag": "minecraft:planks"
  },
  "requiredTools": {
    "axe": 1
  }
}
{
  "key": "diamond",
  "category": "gem",
  "primary": "6",
  "secondary": "7",
  "tertiary": "0",
  "durability": "156.1",
  "integrityCost": "2",
  "integrityGain": "2",
  "magicCapacity": 60,
  "toolLevel": "4",
  "toolEfficiency": "8",
  "tints": {
    "glyph": "diamond_glyph",
    "texture": "diamond"
  },
  "textures": [
    "shiny",
    "crude",
    "default"
  ],
  "material": {
    "item": "minecraft:diamond"
  },
  "improvements": {
    "arrested": 0
  },
  "requiredTools": {
    "hammer": 3
  }
}
Relevant localization keys
用于与材质相关的本地化条目的键：

tetra.material.<material_key>: The name of the material, displayed in the holosphere and in the "applicable materials" tooltip in the workbench
tetra.material.<material_key>.prefix:Used to prefix module variants and improvements derived from this material
tetra.material.feature.<feature_key>:The label used for a feature, displayed in the holosphere
tetra.material.feature.<feature_key>.tooltip: This tooltip is displayed when hovering a feature in the holosphere UI
tetra.material.feature.<feature_key>.tooltip_extended: (Optional) This is added to the tooltip while hovering a feature while holding shift
Structure
原版材质的分组/结构如下：

├── fabric
│   └── wool.json
├── fibre
│   ├── phantom_membrane.json
│   ├── string.json
│   ├── twisting_vine.json
│   ├── vine.json
│   └── weeping_vine.json
├── gem
│   ├── diamond.json
│   └── emerald.json
├── metal
│   ├── gold.json
│   ├── iron.json
│   └── netherite.json
├── misc
│   ├── blaze_rod.json
│   ├── bone.json
│   └── end_rod.json
├── scale
│   └── turtle_scute.json
├── skin
│   ├── hide.json
│   └── leather.json
├── stone
│   ├── andesite.json
│   ├── blackstone.json
│   ├── diorite.json
│   ├── flint.json
│   ├── granite.json
│   ├── obsidian.json
│   └── stone.json
└── wood
    ├── acacia.json
    ├── birch.json
    ├── crimson.json
    ├── dark_oak.json
    ├── oak.json
    ├── spruce.json
    └── warped.json
















