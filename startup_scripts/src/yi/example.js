// priority: 0
const  $Item$Properties  = Java.loadClass("net.minecraft.world.item.Item$Properties")
const  $PickaxeItem  = Java.loadClass("net.minecraft.world.item.PickaxeItem")
const  $ItemAttributeModifierEvent  = Java.loadClass("net.minecraftforge.event.ItemAttributeModifierEvent")
const  $PlayerEvent$BreakSpeed  = Java.loadClass("net.minecraftforge.event.entity.player.PlayerEvent$BreakSpeed")
const  $Rarity  = Java.loadClass("net.minecraft.world.item.Rarity")
const  $BasicItemJS$Builder  = Java.loadClass("dev.latvian.mods.kubejs.item.custom.BasicItemJS$Builder")
const  $EventBuses  = Java.loadClass("dev.architectury.platform.forge.EventBuses")
const  $TetraRegistries  = Java.loadClass("se.mickelus.tetra.TetraRegistries")
const  $DeferredRegister  = Java.loadClass("net.minecraftforge.registries.DeferredRegister")
const  $IForgeRegistry  = Java.loadClass("net.minecraftforge.registries.IForgeRegistry")
const  $ModularArtifact  = Java.loadClass("net.acetheeldritchking.art_of_forging.item.modular.ModularArtifact")

const reg = $TetraRegistries


reg.items.register($EventBuses.getModEventBus("kubejs").get())

$Rarity.create('test',"dark_red")

let Bow = Java.loadClass('net.minecraft.world.item.BowItem')
const Prop = Java.loadClass("net.minecraft.world.item.Item$Properties")
const defProperties = new Prop()
 
let createtool$type = ['axe','pickaxe','shovel','sword','hoe']
//物品(Trident
StartupEvents.registry("item",event=>{

    
    let j
    for(let i = 0;i<50;i++){
        j = i.toString()
    event.create(j,"basic")}

    
    defProperties.defaultDurability(-1)
    defProperties.rarity("epic")
    event.createCustom('yisbow',() => {
        let item = new Bow(defProperties)
        return item
    })
    
    
    event.createCustom('yi:pickaxe',()=>{
        let setting = new $Item$Properties()
        setting.durability(-1)
        setting.rarity('test')
        setting.defaultDurability(1)
        let item = new $PickaxeItem(1,1,1,setting)
        console.info(item.getTier())
        item.setTier(tier=>{
            tier.setLevel(1)
            tier.setSpeed(1)
        })
        console.info(item.getTier())
        item.attachCapability(
            CapabilityBuilder.ENERGY.customItemStack()
                .canExtract(i => true)
                .canReceive(i => true)
                .receiveEnergy((itm, i, sim) => {
                    let energy = itm.nbt.getInt('energy')
                    let maxenergy = itm.nbt.getInt('maxenergy')+648000
                    let inenergy = Math.min(10000 , i , maxenergy - energy)
                    if(!sim){
                    itm.nbt.putInt('energy' , energy + inenergy)}
                    return inenergy
                })
                .getEnergyStored(i => {
                    let energy = i.nbt.getInt('energy')
                    return energy
                })
                .getMaxEnergyStored(i => i.nbt.getInt('maxenergy')+648000)
                .extractEnergy((itm, i, sim) => {
                    let energy = itm.nbt.getInt('energy')
                    let outenergy = Math.min(10000 , i , energy)
                    if(!sim){
                    itm.nbt.putInt('energy' , energy - outenergy)}
                    return outenergy
                })
        )
        return item
    })


    for(let index = 0 ; index < createtool$type.length ; index++){
        event.create(`yi:tool_${createtool$type[index]}`,createtool$type[index])
        .modifyTier(t=>{
            t.setSpeed(20)
            t.setLevel(3)})
        .rarity('epic')
        .color(() => Color.rgba(255,102,255,0.75))
        .barColor((i)=> Color.PINK_DYE)
        .barWidth((i)=>{
            let return0 = 0
            if(i.nbt!=null){
            let energy = i.nbt.getInt('energy')
            let maxenergy = i.nbt.getInt('maxenergy')+648000
            return0 = energy / maxenergy * 13}
            return return0})
        .attachCapability(
            CapabilityBuilder.ENERGY.customItemStack()
                .canExtract(i => true)
                .canReceive(i => true)
                .receiveEnergy((itm, i, sim) => {
                    let energy = itm.nbt.getInt('energy')
                    let maxenergy = itm.nbt.getInt('maxenergy')+648000
                    let inenergy = Math.min(10000 , i , maxenergy - energy)
                    if(!sim){
                    itm.nbt.putInt('energy' , energy + inenergy)}
                    return inenergy
                })
                .getEnergyStored(i => i.nbt.getInt('energy'))
                .getMaxEnergyStored(i => i.nbt.getInt('maxenergy')+648000)
                .extractEnergy((itm, i, sim) => {
                    let energy = itm.nbt.getInt('energy')
                    let outenergy = Math.min(10000 , i , energy)
                    if(!sim){
                    itm.nbt.putInt('energy' , energy - outenergy)}
                    return outenergy
                })
        )}

})
StartupEvents.registry("block", event => {
    event.create("test_crop", "crop")
        .age(3,cbb=>{
            cbb.shape(0,0,0,0,16,2,16)
            cbb.shape(1,0,0,0,16,8,16)
            cbb.shape(2,0,0,0,16,12,16)
            cbb.shape(3,0,0,0,16,16,16)
        })
        .growTick((blockstate, random) => {
            return 25;
        })
        .bonemeal(rtc => {     
            return rtc.random.nextInt(2)
        })
        .crop(Item.of('kubejs:test_crop_seed'),1)
        .dropSeed(false)
        .survive((blockstate, level, pos) => {
            // 判断区块是否被加载
            if (level.isAreaLoaded(pos,1)){
                // 判断是否能够看到天空
                if(level.canSeeSky(pos)){
                    // 获取天空对作物的光照等级是否小于等于8
                    if (level.getBrightness("sky",pos) <= 8){
                        // 判断方块下面是否为下界合金块
                        if (level.getBlockState(pos.below()).is(Blocks.NETHERITE_BLOCK)){
                            return true
                        }
                    }
                }else{
                    // 判断方块产生的光照等级是否小于等于8
                    if (level.getBrightness("block",pos) <= 8){
                        if (level.getBlockState(pos.below()).is(Blocks.NETHERITE_BLOCK)){
                            return true
                        }
                    }
                }
            }
            return false
        })
        .texture("0", "minecraft:block/wheat_stage0")
        .texture("1", "minecraft:block/wheat_stage3")
        .texture("2", "minecraft:block/wheat_stage5")
        .texture("3", "minecraft:block/wheat_stage7")
        .item(seed => seed.texture("minecraft:wheat_seeds"))
})
//方块
StartupEvents.registry("block",event=>{
    event.create("sussy_dynamo")
        .blockEntity(info => {
            info.inventory(9,1)
            info.rightClickOpensInventory()
            info.attachCapability(CapabilityBuilder.ITEM.blockEntity()
                .insertItem((itm,slot,stack,sim)=>{return Item.of('yi:tool_axe')})
                .extractItem((itm,slot,stack,sim)=>{return Item.of('yi:tool_axe')})
                .availableOn((a,b)=>true)
                
            )
            info.attachCapability(CapabilityBuilder.ENERGY.customBlockEntity()
                .canExtract(() => true)
                .canReceive(() => true)
                .extractEnergy((be, amount, simulate) => {
                    let energy = be.persistentData.getInt("energy")
                    let extracted = Math.min(energy, amount)
                    if (!simulate) {
                        be.persistentData.putInt("energy", energy - extracted)
                    }
                    return extracted
                })
                .receiveEnergy((be, amount, simulate) => {
                    let energy = be.persistentData.getInt("energy")
                    let received = Math.min(1919810 - energy, amount)
                    if (!simulate) {
                        be.persistentData.putInt("energy", energy + received)
                    }
                    return received

                })
                .getEnergyStored(be => {
                    return be.persistentData.getInt("energy")
                })
                .getMaxEnergyStored(() => 1919810)
            )
        })


    event.create("lycanitesmobs:demonstonepillar","basic")
    .property(BlockProperties.AXIS)
    .placementState(callblock=>callblock.set(
        BlockProperties.AXIS,callblock.nearestLookingVerticalDirection.axis
    ))
    event.create("lycanitesmobs:demonstonechiseled","basic")
    event.create("lycanitesmobs:demoncrystal","basic")
    event.create("lycanitesmobs:demonstone","basic")
    event.create("lycanitesmobs:demonstonebrick","basic")
    event.create("lycanitesmobs:demonstonetile","basic")
})
ItemEvents.modification(event => {
    event.modify('diamond_pickaxe',item => {
        let bulider =  $BasicItemJS$Builder('cataclysm:meat_shredder')
        bulider.barColor((i)=> Color.PINK_DYE)
        item.setItemBuilder(bulider)
    })
        event.modify('cataclysm:meat_shredder',i => {
            let builder = new $BasicItemJS$Builder('cataclysm:meat_shredder')
            .attachCapability(
                CapabilityBuilder.ENERGY.customItemStack()
                    .canExtract(i => true)
                    .canReceive(i => true)
                    .receiveEnergy((itm, i, sim) => {
                        let energy = itm.nbt.getInt('energy')
                        let maxenergy = itm.nbt.getInt('maxenergy')+648000
                        let inenergy = Math.min(10000 , i , maxenergy - energy)
                        if(!sim){
                        itm.nbt.putInt('energy' , energy + inenergy)}
                        return inenergy
                    })
                    .getEnergyStored(i => i.nbt.getInt('energy'))
                    .getMaxEnergyStored(i => i.nbt.getInt('maxenergy')+648000)
                    .extractEnergy((itm, i, sim) => {
                        let energy = itm.nbt.getInt('energy')
                        let outenergy = Math.min(10000 , i , energy)
                        if(!sim){
                        itm.nbt.putInt('energy' , energy - outenergy)}
                        return outenergy
                    })
            )
            i.setItemBuilder(builder)
          })
      
  
    event.modify('cataclysm:infernal_forge',i => {
        i.setAttackDamage(999)
        i.setAttackSpeed(1.5)
        let builder = new $BasicItemJS$Builder('cataclysm:infernal_forge')
        i.setItemBuilder(builder)
      })

          
    for(let index = 0 ; index < createtool$type.length ; index++){
event.modify(`yi:tool_${createtool$type[index]}`,item=>{
    item.setMaxDamage(-1)
})}
    
    event.modify('create:minecart_contraption', item => {
        item.maxStackSize = 1
    })
})



ForgeEvents.onEvent($ItemAttributeModifierEvent,event=>{
    global.eventTest(event);
})
/**@param {$ItemAttributeModifierEvent} event */
global.eventTest = event =>{
    try{for(let index = 0 ; index < createtool$type.length ; index++){
    if(event.itemStack.id == `yi:tool_${createtool$type[index]}` && event.itemStack.nbt!= null){
        
    }   else if(event.itemStack.id == `yi:tool_${createtool$type[index]}` ){event.itemStack.nbt={};event.itemStack.nbt.putInt('energy',0)}
    }}catch(err){
        console.error(err);
    }
}

ForgeEvents.onEvent($PlayerEvent$BreakSpeed,e=>{
    global.PlayerBreak(e)
})
let createtool$type1 = ['yi:tool_axe','yi:tool_pickaxe','yi:tool_shovel','yi:tool_sword','yi:tool_hoe']
/**@param {$PlayerEvent$BreakSpeed} e */
global.PlayerBreak = e=>{
    try{
        let entity = e.entity
        if(createtool$type1.includes(entity.mainHandItem.id)&&entity.mainHandItem.nbt.getInt('energy')==0)
            e.setCanceled(true)
    }catch(err){
        console.error(err);
    }
}