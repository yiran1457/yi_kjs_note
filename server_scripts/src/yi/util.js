

// priority: 1000
let tick = 1000
let face = 0
let facemax = 6000
/*function ToDrawSixstar(x,y,z,r,step){
    let hsvcolor = generateGradientColor([0,0,0.75],[180,1,1],step)
    let rgbcolor = []
    for (let i0 = 0; i0 < hsvcolor.length; i0++) {
    rgbcolor.push(HsvToRgb(hsvcolor[i0][0],hsvcolor[i0][1],hsvcolor[i0][2]))
    }
    //console.info(hsvcolor)
    let Π = 3.14159
    let yipoint = []
    let spark =2*Π/step/8
    for (let i = 0; i < 8; i++){
    for (let j = 0; j < step; j++) {
    let outz1 = z + Math.sin(spark*j+i*step*spark+face/facemax*2*Π)*r
    let outx1 = x+Math.cos(spark*j+i*step*spark+face/facemax*2*Π)*r
    let outz2 = z+(Math.sin(i*step*spark+face/facemax*2*Π)-Math.sin((i+3)*step*spark+face/facemax*2*Π))*j*r/step-Math.sin(i*step*spark+face/facemax*2*Π)*r
    let outx2 = x+(Math.cos(i*step*spark+face/facemax*2*Π)-Math.cos((i+3)*step*spark+face/facemax*2*Π))*j*r/step-Math.cos(i*step*spark+face/facemax*2*Π)*r
    let lizi = Client.particleEngine.createParticle('minecraft:electric_spark', outx2, y, outz2, 0, 0, 0)
    lizi.setColor(rgbcolor[j][0]/255,rgbcolor[j][1]/255,rgbcolor[j][2]/255)
    lizi.setLifetime(1)
    let lizi1 = Client.particleEngine.createParticle('minecraft:electric_spark', outx1, y, outz1, 0, 0, 0)
    lizi1.setColor(54,0,150)
    lizi1.setColor(rgbcolor[step-j-1][0]/255,rgbcolor[step-j-1][1]/255,rgbcolor[step-j-1][2]/255)
    lizi1.setLifetime(1)
}}
    return yipoint
}*/

ItemEvents.rightClicked(event => {
    let{player}=event
    player.mainHandItem
    //player.sendSystemMessage( player.mainHandItem.nbt.getInt('energy'))
    
    
})

/*let lizi = Client.particleEngine.createParticle('minecraft:electric_spark', outx, y, outz, 0, 0, 0)
lizi.setColor(54,0,150)
lizi.setLifetime(2)
lizi.move(0,1,0)*/
ServerEvents.tick(event=>{
    if (face<facemax)face++
    else face=0
    let server = event.server
    if(tick<1)tick++
    else{/*
        let{players}=server
        let{x,y,z}=players[0]
        
        //ToDrawSixstar(x,y+1,z,10,60)
        let l1 = Client.particleEngine.createParticle('minecraft:electric_spark', x+2, y, z, 0, 0, 0)
        l1.setColor(1,0,0)
        l1.setLifetime(2)
        let l2 = Client.particleEngine.createParticle('minecraft:electric_spark', x, y, z+2, 0, 0, 0)
        l2.setColor(0,1,0)
        l2.setLifetime(2)
        let l3 = Client.particleEngine.createParticle('minecraft:electric_spark', x-2, y, z, 0, 0, 0)
        l3.setColor(0,0,1)
        l3.setLifetime(2)
        let l4 = Client.particleEngine.createParticle('minecraft:electric_spark', x, y, z-2, 0, 0, 0)
        l4.setColor(1,1,0)
        l4.setLifetime(2)
    let player=event.server.players[0]
    player.level*/
    tick = 0
    }
})
