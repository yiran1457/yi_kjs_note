
ServerEvents.tags('block', event => {
    event.add('minecraft:wither_immune', 'integrateddynamics:cable')
    event.add('minecraft:dragon_immune', 'integrateddynamics:cable')
})

 ServerEvents.tags('item', event => {
    event.add('k:allowunbreakable', 'tetra:modular_sword')
    event.add('k:allowunbreakable', 'tetra:modular_double')
    event.add('k:allowunbreakable', 'tetra:modular_bow')
    event.add('k:allowunbreakable', 'tetra:modular_crossbow')
    event.add('k:allowunbreakable', 'tetra:modular_single')
    event.add('k:allowunbreakable', 'tetra:modular_shield')
    event.add('k:allowunbreakable', 'create:extendo_grip')
 })
 
 ServerEvents.recipes((event) => {
    
    //unbreakableCrafting('#k:allowunbreakable', event)
    
    const { create } = event.recipes

    event.shapeless(Item.of('minecraft:recovery_compass', "{RepairCost:0,Unbreakable:1b,display:{Lore:['{\"text\":\"这只是一个示例，不是最终结果\"}'],Name:'{\"color\":\"#114514\",\"text\":\"不毁之物\"}'}}"), ['*', Item.of('minecraft:nether_star', "{RepairCost:0,display:{Lore:[\'{\"text\":\"其中蕴含了不毁的奥秘\"}\'], Name:'{\"color\":\"#114514\",\"text\":\"不毁核心\"}'}}").weakNBT()])  
        .modifyResult((/**@type {$ModifyRecipeCraftingGrid_}*/inputitem, /**@type {$ItemStack_}*/outputitem) => {
            let outputitemarr = inputitem.findAll()
            for(let i = 0; i < outputitemarr.length; i++){
            if(outputitemarr[i]!=Item.of('minecraft:nether_star', "{RepairCost:0,display:{Lore:[\'{\"text\":\"其中蕴含了不毁的奥秘\"}\'], Name:'{\"color\":\"#114514\",\"text\":\"不毁核心\"}'}}")&&outputitemarr[i]!=Item.of('minecraft:air',0)){
                outputitem= outputitemarr[i]
            }}
            outputitem.nbt.merge({"Unbreakable": true})
            return outputitem.withCount(1)
        })


    
    create.mechanical_crafting(Item.of('minecraft:nether_star', "{RepairCost:0,display:{Lore:[\'{\"text\":\"其中蕴含了不毁的奥秘\"}\'], Name:'{\"color\":\"#114514\",\"text\":\"不毁核心\"}'}}").weakNBT(), [
        "BBBBB" ,
        "B A B" ,
        "BAEAB" ,
        "B A B" ,
        "BBBBB" 
    ], {
        A: 'minecraft:echo_shard',
        B: 'alexsmobs:mimicream',
        E: 'minecraft:nether_star'
    })
})


const unbreakableCrafting = (unbreakable_item, event) => { 
    event.shapeless(Item.of('minecraft:recovery_compass', "{RepairCost:0,Unbreakable:1b,display:{Lore:['{\"text\":\"这只是一个示例，不是最终结果\"}'],Name:'{\"color\":\"#114514\",\"text\":\"不毁之物\"}'}}"), [unbreakable_item, Item.of('minecraft:nether_star', "{RepairCost:0,display:{Lore:[\'{\"text\":\"其中蕴含了不毁的奥秘\"}\'], Name:'{\"color\":\"#114514\",\"text\":\"不毁核心\"}'}}").weakNBT()])  
        .modifyResult((inputitem, outputitem) => {
            outputitem= inputitem.find(unbreakable_item)
            outputitem.nbt.merge({"Unbreakable": true})
            return outputitem.withCount(1)
        })
}

let createtool$type = ['yi:tool_axe','yi:tool_pickaxe','yi:tool_shovel','yi:tool_sword','yi:tool_hoe']
ItemEvents.firstRightClicked(e=>{
    let currentTool = e.player.mainHandItem//.getHeldItem('main_hand')
    let currentToolNBT = currentTool.nbt
    if(createtool$type.includes(currentTool.id) && e.player.isCrouching() && !e.target.block){
        let toolIndex = createtool$type.indexOf(currentTool.id)
        if(toolIndex === createtool$type.length - 1) {
            toolIndex = 0
        }
        else(toolIndex += 1)
        currentTool.count--
        return e.player.setMainHandItem(Item.of(createtool$type[toolIndex], currentToolNBT))
    }
})


BlockEvents.broken(e=>{
    let mainHandItem = e.player.mainHandItem
    if(createtool$type.includes(mainHandItem.id)){
        mainHandItem.nbt.putInt('energy', Math.max(mainHandItem.nbt.getInt('energy')-200,0))
    }
})