
const { $PatchouliAPI } = require("packages/vazkii/patchouli/api/$PatchouliAPI")
const { $Character } = require("packages/java/lang/$Character")

BlockEvents.rightClicked('minecraft:diamond_block', (event) => {
    const { item, level, block } = event
    const { pos } = block
    if(item != "minecraft:stick" || level.isClientSide()) {
        return
    }
    let rotation1 = Test_MultiBlock_Machine().validate(level, pos)
    if(rotation1 === null){
        return
    }
    block.up.popItem("clay_ball")
})

BlockEvents.rightClicked('minecraft:oak_log', (event) => {
    $PatchouliAPI.get().showMultiblock($PatchouliAPI.get().getMultiblock("kubejs:test_multiblock_machine"),null,event.block.pos.offset(0,2,0),"none")
})
const Test_MultiBlock_Machine = () =>
    $PatchouliAPI.get().makeMultiblock(
        [
            ["___", "___", "___"],
            ["___", "_0_", "___"],
            ["ggg", "ggg", "ggg"],
        ],
        /*new $Character('_'),
        $PatchouliAPI.get().anyMatcher(),*/
        new $Character('g'),Block.getBlock('minecraft:beacon'),
        new $Character('0'),Block.getBlock('minecraft:diamond_block')
    )


    //try{$PatchouliAPI.get().registerMultiblock(ResourceLocation("kubejs:test_multiblock_machine"),Test_MultiBlock_Machine())}catch(e){console.error(e)}
ServerEvents.loaded(event => {
    console.info("loaded")
    $PatchouliAPI.get().registerMultiblock(ResourceLocation("kubejs:test_multiblock_machine"),Test_MultiBlock_Machine())
})

ServerEvents.recipes(event => {
    let findRecipes = event.findRecipes({type:'create:item_application'})
    for(let i = 0 ; i < findRecipes.length ; i++){
        let input = []
        let ingredients = findRecipes[i].json.get('ingredients')
        let results = findRecipes[i].json.get('results').get(0).get('item')
        for(let j = 0 ; j < ingredients.size() ; j++){
            let keySet = ingredients.get(j).keySet()[0]
            let value = ingredients.get(j).get(keySet).toString().slice(1,-1)
            if(keySet=='tag'){input.push("#"+ value)}
            else{input.push(value)}
        }
        event.recipes.minecraft.crafting_shapeless(results,input)
    }
})

ServerEvents.command('xp',e=>{
    if(e.parseResults.context.source.level.dimension=='minecraft:overworld'){
        e.parseResults.context.source.sendSystemMessage("你无权在主世界使用此指令")
        e.cancel()
    }
})