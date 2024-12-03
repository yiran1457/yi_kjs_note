//requires:create
//requires:kubejs_create

ItemEvents.rightClicked(event => {
    const {x , y , z } = event.player
    const rayTrace = event.player.rayTrace(10)
    event.server.tell(rayTrace.facing)
    event.server.tell(event.player.facing.normal)
    console.log(event.player.facing.y)
    
    
})
ServerEvents.recipes(e=>{
e.cancel
    let setting = yi$tool.tetra$tool.setting
    yi$tool.tetra$tool.registry.materials
    .setKey('key','random')
    .setKey(setting.完整度奖励,10)
    .setKey(setting.魔法容量,500)
    .setKey(setting.密度,5)
    .setToolTier('tetra:maxed_forge_hammer')
    .setSecondaryKey("material","items",['minecraft:sea_lantern'])
    //.create()



    let test = JsonIO.read('./kubejs/config/yiconfig.json')
    test.create='false'
    test.mna='false'
    test.ars='false'
    JsonIO.write('./kubejs/config/yiconfig.json',test)



e.shaped(
    Item.of('minecraft:enchanted_book').enchant('minecraft:protection', 4),
    [' A '],
    {A:'minecraft:enchanted_book'})




    

create$tool.mechanical_crafting
.getEvent(e)
.setShape([
    '   BBB   ',
    '  BBBDAD ',
    '     AAA ',
    '    CDADB',
    '   CEC BB',
    '  CEC  BB',
    ' CEC   B ',
    'CEC      ',
    'CC       '
])
.addInput('A','ae2:fluix_pearl')
.addInput('B','alexsmobs:mimicream')
.addInput('C','gobber2:gobber2_rod_end')
.addInput('D','ae2:dense_energy_cell')
.addInput('E','ae2:fluix_block')
.addOutput('yi:tool_sword')
.over()

})