
<h1>Materials</h1>
  <p>
    暂时为机翻
    <br>
    <br>
    <br>
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
>标记是否应替换或合并此原理图定义的现有条目（如果有）。由其他 Mod 和数据包添加的材料的默认行为是将它们设置的值合并到现有条目中（如果有）。通过将 replace 设置为 true，可以完全替换 tetra 注册的材质，这在想要删除某些内容时非常有用。<br>

>-key string <br>
>-材料的标识符，将用作来自该材料的模块变体的后缀。 <br>

>category optional string <br>
>应用于来自此材料的所有模块变体。 <br>

>hidden optional boolean <br>
>如果设置为 true，此材料将不会出现在全息球中。 <br>

>hiddenOutcomes optional boolean <br>
>如果设置为 true，由此材料派生的模块和改进变体将不会出现在全息球中。 <br>

>primary number <br>
>主属性和效果的乘数。应代表硬度、锋利度或将此材料塑造成具有坚硬/锋利边缘的能力。材料模块变体在确定属性和效果时参考这一点。 <br>

>secondary number <br>
>次级属性和效果的乘数。应代表材料密度、刚性或重量，以及挥动时携带多少动能。材料模块变体在确定属性和效果时参考这一点。 <br>

>tertiary number <br>
>三级属性和效果的乘数。应代表柔韧度或抗拉强度，以及弯曲时材料回弹的速度。材料模块变体在确定属性和效果时参考这一点。 <br>

>durability number <br>
>耐久性基础，模块使用这个来确定固定或乘数的耐久性加成。 <br>

>integrityGain number <br>
>提供完整性的模块的乘数。 <br>

>integrityCost number <br>
>消耗完整性的模块的乘数。 <br>

>magicCapacity unknown <br>
>由这种材料制成的主要模块变体的魔法容量。 <br>

>toolLevel Tier <br>
>提供工具的模块，这些工具根据材料的不同而变化，使用这个来确定工具的等级。 <br>

>toolEfficiency number <br>
>提供工具的模块，这些工具根据材料的不同而变化，使用这个来确定工具的效率。 <br>

>effects optional Tiered data <br>
>将由从这种材料制作的模块和改进继承的效果。 <br>

>attributes optional map[ string : number ] <br>
>从材料获得的固有属性，所有从这种材料制作的模块和改进都将继承这些属性。 <br>

>aspects optional map[ string : unknown ] <br>
>将由从这种材料制作的模块和改进继承的方面。当材料应影响模块如何通过改进和附魔进行修改时使用。 <br>

>improvements optional map[ string : unknown ] <br>
>所有主要模块制成此材料将具有这些改进。当主要模块制成材料应具有一些效果，但次要模块或改进不应具有时有用。 <br>

>tags optional array[ string ] <br>
>从这种材料衍生的变体和改进将具有此处列出的标签。变体和改进可以添加额外的标签。这是一个临时解决方案，请参阅模块变体的模式以获取更多信息。 <br>

>tints optional <br>
>>glyph optional Hexadecimal <br>
>>用于在UI中着色符号的十六进制字符串。 <br>
>>
>>texture optional Hexadecimal <br>
>>用于纹理着色的十六进制字符串 <br>

>textures array[ string ] <br>
>这是该材料希望使用的一系列纹理后缀，将使用与引用材料变体中的‘availableTextures’（可用纹理）匹配的第一个后缀。 <br>

>textureOverrides optional array[ string ] <br>
>引用具有与这些值之一匹配的基本路径的模型的模块将被迫使用此材料的第一个纹理后缀，即使该后缀未列在'availableTextures'中。如果插件想要为某些模块添加特定纹理，则这很有用，这些模块由基础tetra或其他插件添加。Obsidian在基础tetra中有此示例。 <br>

>tintOverrides optional boolean <br>
>如果设置为 true，当通过 'textureOverrides' 方法提供纹理时，纹理仍将使用材料的着色进行着色。当 textureOverrides 已经具有彩色纹理时，保留此值为 false。 <br>

>material  <br>
>>items optional array[ Resource location ] <br>
>>可以用作此结果材料的物品列表。必须设置此字段或'tag'字段。 <br>
>>
>>tag optional Resource location <br>
>>一个标签，用于确定物品是否可以用作此结果的材料。必须设置此字段或'items'字段。 <br>
>>
>>nbt optional map[ string : unknown ] <br>
>>如果材料应具有特定的 nbt 数据，则可以设置。 <br>
>>
>>count optional number <br>
>>确定匹配此结果所需的物品数量。这也决定了在制作时消耗多少物品。 <br>
>
>定义从此材料派生的结果需要哪个物品。count 字段可以偏移或乘以引用结果。 <br>

>requiredTools optional Tiered data <br>
>定义从这种材料派生的结果所需的工具（及其级别），结果可以添加额外的工具并乘以/偏移此处提供的级别。 <br>

>experienceCost optional number <br>
>从这种材料派生的结果将具有此经验成本，结果可以从这个值中添加或减去。 <br>

>features optional array[ string ] <br>
>在查看材料的全息球时显示功能，用于描述与这种材料相关的制作效果行为。例如，tetracelium 使用此功能来描述 Twilight Forest 金属如何根据模块类型应用不同的附魔。 <br>
</p>
<h2>示例:</h2>
    
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
    
<h2>相关的本地化键值</h2>
<p>
用于与材质相关的本地化条目的键：<br>
<br>
tetra.material.&lt;material_key>: 材质的名称，显示在全息球和工作台的“适用材质”工具提示中 <br>
tetra.material.&lt;material_key>.prefix: 用于为源自此材料的模块变体和改进添加前缀 <br>
tetra.material.feature.&lt;feature_key>: 用于功能的标签，显示在全息球中 <br>
tetra.material.feature.&lt;feature_key>.tooltip: 将鼠标悬停在 holosphere UI 中的功能时，会显示此工具提示 <br>
tetra.material.feature.&lt;feature_key>.tooltip_extended: (可选) 这会在按住 Shift 键的同时悬停要素时添加到工具提示中<br>
</p>
<h2></h2>文件结构</h2>
<p>
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
    
</p>















