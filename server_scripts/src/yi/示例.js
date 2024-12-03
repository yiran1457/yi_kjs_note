/*
大多数设定物品/流体的参数可以只输入id
大部分参数为 (ID, 数量, NBT)

20Tick 等于 1秒
*/

ServerEvents.recipes((event) => {
    // 有序合成
    RecipesBuilder.shaped(event)
        .shape( // 设定合成形状, 每个字母表示对应的物品，下边是对应物品的列表
            "BAB",
            "BAB",
            "CAC"
        )
        .addItem("A", "minecraft:stone")
        .addItem("B", "minecraft:tnt", { "damage": 5 })
        .addTag("C", "forge:ores/iron")
        .output("minecraft:tnt", 5, { L: 0 }) // 设定输出物品 (物品id, 数量, nbt(可选))
        .build()

    // 无序合成
    RecipesBuilder.shapeless(event)
        .addItem("minecraft:tnt") // 添加合成材料
        .addItem("minecraft:stone")
        .addTag("forge:ingots/iron") // 添加一个使用标签的合成材料
        .output("minecraft:tnt", 64, { L: 0 }) // 设定合成结果 (物品ID, 数量, nbt(可选))
        .build()

    // 熔炼 (高炉配方)
    RecipesBuilder.blasting(event)
        .input("minecraft:oak_planks") // 设定输入材料
        .output("minecraft:oak_planks") // 设定输出物品
        .xp(1000) // 经验量
        .processTime(100) // 熔炼时间 (Tick)
        .build()

    // 序列组装
    RecipesBuilder.assembly(event)
        .input("minecraft:tnt") // 输入物品
        .loop(5) // 循环 5 次
        .addOutput("minecraft:stone") // 设定输出物品
        // .transitionalItem("minecraft:stone")  // 设定中间物品的ID, 不设定的话默认使用输入物品的ID
        .sequence() // 设定合成序列
        .filling("minecraft:water", 20) // 添加一个注液工序 (流体ID, 量(MB), NBT(可选))
        .deploying("minecraft:iron_ingot") // 添加一个安装物品工序
        .pressing() // 添加一个滚压工序
        .parent() // 结束设定合成序列
        .build()

    // 磨砂（做玫瑰石英的那个）
    RecipesBuilder.polishing(event)
        .input("minecraft:stone") // 设定输入物品
        .output("minecraft:smooth_stone") // 设定输出物品
        .build()

    // 滚压
    RecipesBuilder.pressing(event)
        .input("minecraft:ice") // 设定输入物品
        .output("minecraft:tnt") // 设定输出物品
        .build()

    // 混合搅拌
    RecipesBuilder.mixing(event)
        .addInputItem("minecraft:tnt", 2) // 添加输入物品(物品id, 数量(可选))
        .addInputItem("minecraft:iron_ingot")
        .addInputFluid("minecraft:water", 500) // 添加输入流体(流体id, 数量)
        .heat(2) // 需要的热量, 常温的话就去掉或吧参数改成0, 0 常温, 1 热, 2 超热
        .addOutputItem("minecraft:tnt", 3) // 设定输出物品 (物品ID, 数量, NBT(可选), 几率(可选))
        .addOutputFluid("minecraft:water", 1000)
        .build()

    // 研磨 (石磨配方)
    RecipesBuilder.milling(event)
        .input("minecraft:stone") // 设定输入物品
        .addOutput("minecraft:iron_ingot", 10) // 添加一个输出产物 参数: (物品ID, 数量, 几率) 或 (物品ID, 数量, NBT, 几率)
        .addOutput("minecraft:tnt", 1, 0.5) // 添加一个有几率的产物 (物品ID, 数量, 几率)
        .processTime(1000) // 设定物品研磨时间 (Tick)
        .build()

    // 动力合成器配方
    // 示例: 对称之杖
    RecipesBuilder.mechanicalCrafting(event)
        .shape([ // 每个字母表示对应的物品，下边是对应物品的列表
            " G ",
            "GEG",
            " P ",
            " B ",
            " O "
        ])
        .addTag("G", "forge:glass") // 设定对应字母所代表的物品标签 (字母, 标签ID, NBT(可选))
        .addItem("E", "minecraft:ender_pearl") // 设定对应字母所代表的物品 (字母, 物品ID, NBT(可选))
        .addItem("P", "minecraft:iron_ingot")
        .addItem("B", "create:brass_ingot")
        .addItem("O", "minecraft:obsidian")
        .output("create:wand_of_symmetry") // 设定输出物品 (物品ID, 数量, NBT(可选))
        // .noMirror()  // 设定合成表不能镜像排列
        .build()

    // 动力切割
    RecipesBuilder.cutting(event)
        .input("minecraft:tnt")
        .output("minecraft:stone", 5)
        .processTime(100)
        .build()

    // 注液
    RecipesBuilder.filling(event)
        .input("minecraft:stone") // 设定输入物品 (物品ID)
        .inputFluid("minecraft:water", 500) // 设定流体 (流体ID, 量, NBT(可选))
        .output("minecraft:ice") // 设定结果 (物品ID, 数量, NBT)
        .build()

    // 压缩塑性
    RecipesBuilder.compacting(event)
        .addInputItem("minecraft:tnt", 5)  // 添加一个输入物品 (物品ID, 数量(可选), NBT(可选))
        .addInputItem("minecraft:tnt", 5)
        .addInputTag("forge:ingots", 2)  // 添加一个输入带有标签的物品 (标签ID, 数量(可选), NBT(可选))
        .addInputFluid("minecraft:lava", 500)  // 添加一个输入流体 (流体ID, 量, NBT(可选))
        .addOutputItem("minecraft:iron_ingot")  // 添加一个输出物品 (物品ID, 数量(可选), NBT(可选))
        .addOutputFluid("minecraft:lava", 1000)  // 添加一个输出流体 (流体ID, 量, NBT(可选))
        .build()
})