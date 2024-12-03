PlayerEvents.loggedIn(event => {
    console.info("longgin")
})

let CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
PlayerEvents.chat(event => {
event.player.sendData("custom_data", {
    
        principalItem: 'minecraft:bedrock',
        inputItems: [
            'minecraft:command_block', 'minecraft:command_block', 'minecraft:command_block','minecraft:command_block'
        ],
        outputItem: "ars_nouveau:arcane_pedestal"
    })
    console.info("loaded")
})
/*
[
    ['minecraft:nether_star'],
    [['minecraft:netherite_block',2],['minecraft:gilded_blackstone',2],['minecraft:magma_block',2],['minecraft:basalt',2]],
    ['command','cataclysm:netherite_monstrosity']
    ],[
    ['minecraft:nether_star'],
    [['minecraft:nether_star',1],['cataclysm:void_stone',1],['minecraft:crying_obsidian',2],['minecraft:purpur_block',2],['minecraft:shulker_shell',2]],
    ['command','cataclysm:ender_guardian'],
    ],[
    ['minecraft:nether_star'],
    [['minecraft:nether_star',1],['minecraft:redstone_block',2],['minecraft:wither_skeleton_skull',3],['create:sturdy_sheet',2]],
    ['command','cataclysm:the_harbinger'],
    ],[
    ['minecraft:nether_star'],
    [['minecraft:bone_block',2],['minecraft:gold_block',1],['minecraft:sandstone',2],['create:brass_block',2],['cataclysm:necklace_of_the_desert',1]],
    ['command','cataclysm:ancient_remnant'],
    ],[
    ['minecraft:nether_star'],
    [['create:brass_block',2],['minecraft:diamond_block',2],['minecraft:nether_star',1],['cataclysm:black_steel_block',3]],
    ['command','cataclysm:maledictus'],
    ],[
    ['cataclysm:void_stone'],
    [['minecraft:crying_obsidian',2],['minecraft:obsidian',2]],
    ['command','cataclysm:ender_golem'],
    ],[
    ['quark:blaze_lantern'],
    [['minecraft:shield',2],['minecraft:nether_bricks',2]],
    ['command','cataclysm:ignited_revenant'],
    ],[
    ['minecraft:clay'],
    [['minecraft:amethyst_block',1],['minecraft:mossy_cobblestone',3]],
    ['command','cataclysm:amethyst_crab'],
    ],[
    ['minecraft:magma_block'],
    [['minecraft:redstone_block',1],['minecraft:iron_block',1],['minecraft:blackstone',2]],
    ['command','cataclysm:the_prowler'],
    ],[
    ['minecraft:sandstone'],
    [['create:brass_block',2],['minecraft:bone_block',2]],
    ['command','cataclysm:kobolediator'],
    ],[
    ['minecraft:sandstone'],
    [['create:brass_block',1],['minecraft:bone_block',3]],
    ['command','cataclysm:wadjet'],
    ],[
    ['minecraft:sea_lantern'],
    [['minecraft:dried_kelp_block',1],['minecraft:stone_bricks',2],['minecraft:brain_coral_block',1]],
    ['command','cataclysm:deepling_priest'],
    ],[
    ['minecraft:crying_obsidian'],
    [['minecraft:dried_kelp_block',1],['minecraft:stone_bricks',2],['minecraft:brain_coral_block',1]],
    ['command','cataclysm:deepling_warlock'],
    ],[
    ['minecraft:soul_sand'],
    [['minecraft:iron_block',2],['create:sturdy_sheet',2]],
    ['command','cataclysm:aptrgangr'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:snow_block',4],['minecraft:blue_ice',2],['minecraft:diamond_block',1]],
    ['command','mowziesmobs:frostmaw'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:gold_block',4],['minecraft:feather',2],['minecraft:blaze_rod',1]],
    ['command','mowziesmobs:umvuthi'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:iron_block',4],['create:sturdy_sheet',3]],
    ['command','mowziesmobs:wroughtnaut'],
    ]*/