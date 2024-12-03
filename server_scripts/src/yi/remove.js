ServerEvents.recipes(event => { 
    //下面是一个简单的循环，用来移除各色各样的植物盆的配方
    let color = ['cataclysm:meat_shredder',
                'gobber2:gobber2_helmet_dragon',
                'gobber2:gobber2_chestplate_dragon',
                'gobber2:gobber2_leggings_dragon',
                'gobber2:gobber2_boots_dragon'
                ]
    for (let i of color) {
        event.remove({output:`${i}`})
    }
     
})