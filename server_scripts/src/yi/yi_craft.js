
ServerEvents.recipes((event) => {
    
event.shapeless('minecraft:iron_ingot', [Item.of('minecraft:iron_block', 1, '{sx:[{shangh:1}]}')]).stage("Tier1")
    
    const { create } = event.recipes
    create.mechanical_crafting("minecraft:cow_spawn_egg", [
        "BBBBBBBB" 
    ], {
        B: "minecraft:beef"
        //,E: Item.of('minecraft:nether_star', "{RepairCost:0,display:{Name:'{\"text\":\"星\"}'}}").weakNBT()
    })

    event.shaped('minecraft:book', [
        'CCC',
        'WGL',
        'CCC'
      ], {
        C: '#forge:cobblestone',
        L: Item.of('minecraft:enchanted_book', '{StoredEnchantments:[{lvl:1,id:"minecraft:sweeping"}]}').weakNBT(),
        // 尽管格式是相同的，但是对于附魔来说，你还可以将其简写成如下形式：
        W: Item.of('minecraft:enchanted_book').enchant('minecraft:respiration', 2).weakNBT(),
        G: '#forge:glass'
      })

/*
    RecipesBuilder.mechanicalCrafting(event)
        .shape([ 
            "DECED",
            "FBGBF",
            "CGAGC",
            "FBGBF",
            "DECED"
        ])
        .addItem("A", "refinedstorage:controller") 
        .addItem("B", "integrateddynamics:coal_generator")
        .addItem("C", "minecraft:coal_block")
        .addItem("D", "refinedstorage:advanced_processor")
        .addItem("E", "refinedstorage:destruction_core")
        .addItem("F", "refinedstorage:construction_core")
        .addItem("G", "refinedstorage:network_receiver")
        .output("refinedstorage:creative_controller") 
        .build()
*/
        RecipesBuilder.mechanicalCrafting(event)
        .shape([   
            "ABCDDDCBA",
            "AEBCDCBEA",
            "AEAFFFAEA",
            "AEGFFFGEA",
            "AGGGHGGGA"
        ])
        .addItem("A", 'minecraft:netherite_ingot') 
        .addItem("B", 'create_sa:heat_engine')
        .addItem("C", 'create_sa:steam_engine')
        .addItem("D", 'create_sa:hydraulic_engine')
        .addItem("E", 'minecraft:nether_star',{RepairCost:0,display:{Name:'{\"text\":\"星\"}'}})
        .addItem("F", 'create:blaze_burner')
        .addItem("G", 'create:blaze_cake')
        .addItem("H", 'create:rotation_speed_controller')
        .output('create:creative_motor') 
        .build()

/*
            // 有序合成
    RecipesBuilder.shaped(event)
    .shape( 
        "EDE",
        "CCB",
        "AAA"
    )
    .addItem("A", "minecraft:obsidian")
    .addItem("B", "pointblank:processor")
    .addTag("C", "forge:glass_panes")
    .addItem("D", "minecraft:nether_star")
    .addItem("E", "minecraft:netherite_ingot")
    .output("pointblank:printer") 
    .build()*/

    // 序列组装
    RecipesBuilder.assembly(event)
        .input("minecraft:cobblestone") // 输入物品
        .loop(1) // 循环 5 次
        .addOutput("minecraft:ancient_debris") // 设定输出物品
        // .transitionalItem("minecraft:stone")  // 设定中间物品的ID, 不设定的话默认使用输入物品的ID
        .sequence() // 设定合成序列
        .pressing() // 添加一个滚压工序
        .filling("minecraft:lava", 200) // 添加一个注液工序 (流体ID, 量(MB), NBT(可选))
        .deploying("minecraft:netherite_scrap") // 添加一个安装物品工序
        .deploying("create:cinder_flour") 
        .parent() // 结束设定合成序列
        .build()

        

    // 混合搅拌
    RecipesBuilder.mixing(event)
    .addInputItem("minecraft:cobblestone") // 添加输入物品(物品id, 数量(可选))
    .addInputItem("minecraft:quartz")
    .addOutputItem("minecraft:diorite") // 设定输出物品 (物品ID, 数量, NBT(可选), 几率(可选))
    .build()
    
    // 混合搅拌
    RecipesBuilder.mixing(event)
    .addInputItem("minecraft:cobblestone") // 添加输入物品(物品id, 数量(可选))
    .addInputItem("minecraft:blue_dye")
    .addInputFluid("create_enchantment_industry:experience", 200) // 添加输入流体(流体id, 数量)
    .heat(2) // 需要的热量, 常温的话就去掉或吧参数改成0, 0 常温, 1 热, 2 超热
    .addOutputItem("minecraft:lapis_ore") // 设定输出物品 (物品ID, 数量, NBT(可选), 几率(可选))
    .build()

    // 混合搅拌
    RecipesBuilder.mixing(event)
    .addInputItem('create:polished_rose_quartz', 2) // 添加输入物品(物品id, 数量(可选))
    .addInputItem('art_of_forging:forged_steel_ingot')
    .addInputItem('minecraft:netherite_ingot')
    .addInputItem('minecraft:blaze_powder',3)
    .heat(2) // 需要的热量, 常温的话就去掉或吧参数改成0, 0 常温, 1 热, 2 超热
    .addOutputItem('create:chromatic_compound', 2) // 设定输出物品 (物品ID, 数量, NBT(可选), 几率(可选))
    .build()
    
    // 混合搅拌
    RecipesBuilder.mixing(event)
    .addInputItem("minecraft:leather", 2) // 添加输入物品(物品id, 数量(可选))
    .addInputItem("minecraft:black_dye")
    .addInputItem("minecraft:slime_ball")
    .addInputFluid("minecraft:water", 200) // 添加输入流体(流体id, 数量)
    .heat(1) // 需要的热量, 常温的话就去掉或吧参数改成0, 0 常温, 1 热, 2 超热
    .addOutputItem("minecraft:ink_sac", 4) // 设定输出物品 (物品ID, 数量, NBT(可选), 几率(可选))
    .build()

        
    RecipesBuilder.polishing(event)
    .input("minecraft:lapis_lazuli") // 设定输入物品
    .output("tetra:pristine_lapis") // 设定输出物品
    .build()
    
    RecipesBuilder.polishing(event)
    .input("minecraft:emerald") // 设定输入物品
    .output("tetra:pristine_emerald") // 设定输出物品
    .build()
    
    RecipesBuilder.polishing(event)
    .input("minecraft:diamond") // 设定输入物品
    .output("tetra:pristine_diamond") // 设定输出物品
    .build()

    RecipesBuilder.polishing(event)
    .input("minecraft:amethyst_shard") // 设定输入物品
    .output("tetra:pristine_amethyst") // 设定输出物品
    .build()
    })