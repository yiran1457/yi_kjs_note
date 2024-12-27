
let tooltip_path
//设置lang的命名空间
let namespace = 'autotooltip'
//设置默认lang类型
let deflang = 'en_us'
//设置默认lang路径
let deflang_path = 'kubejs/assets/' + namespace + '/lang/' + deflang + '.json'

ClientEvents.loggedIn(e => {
    //获取客户端对应lang的路径
    tooltip_path = 'kubejs/assets/' + namespace + '/lang/' + Client.languageManager.selected + '.json'
})

/*
    lang键以tooltip.modid.itemid为开头，后面可随意添加
    若添加了shift或ctrl会进行对应的检测(.shift|.noshift|.ctrl|.noctrl)
    示例json
    {
        "tooltip.minecraft.iron_ingot.shift.ctrl":"shift+ctrl",
        "tooltip.minecraft.iron_ingot.noshift.ctrl":"noshift+ctrl",
        "tooltip.minecraft.iron_ingot.shift.noctrl":"shift+noctrl",
        "tooltip.minecraft.iron_ingot.noshift.noctrl":"noshift+noctrl",
        "tooltip.minecraft.iron_ingot.noshift":"noshift",
        "tooltip.minecraft.iron_ingot.shift":"shift",
        "tooltip.minecraft.iron_ingot.noctrl":"noctrl",
        "tooltip.minecraft.iron_ingot.ctrl":"ctrl",
        "tooltip.minecraft.iron_ingot":"common"
    }
 */

ItemEvents.tooltip(e => {
    //合并默认lang和客户端lang，使客户端lang缺失时使用默认lang
    Object.assign(JsonIO.read(deflang_path), JsonIO.read(tooltip_path))
        .forEach(/**@param {String} langkey*/langkey => {
            //切分键名成数组
            let itemid = langkey.split('.')
            //判断键名首位是否为 tooltip
            if (itemid[0] = 'tooltip') {
                //将itemid数组合并成物品id
                itemid = itemid[1] + ':' + itemid[2]
                e.addAdvanced(itemid, (item, unkonwn, text) => {
                    //进行对shift和ctrl的需求判断
                    {
                        if (langkey.includes('shift') && langkey.includes('ctrl')) {
                            if (langkey.includes('.shift') && langkey.includes('.ctrl')) {
                                if (e.shift && e.ctrl) { text.add(1, Text.translatable(langkey)) }
                            }
                            else if (langkey.includes('.noshift') && langkey.includes('.ctrl')) {
                                if (!e.shift && e.ctrl) { text.add(1, Text.translatable(langkey)) }
                            }
                            else if (langkey.includes('.shift')) {
                                if (e.shift && !e.ctrl) text.add(1, Text.translatable(langkey))
                            }
                            else if (!e.shift && !e.ctrl) { text.add(1, Text.translatable(langkey)) }
                        }
                        else if (langkey.includes('shift')) {
                            if (langkey.includes('.shift')) {
                                if (e.shift) { text.add(1, Text.translatable(langkey)) }
                            }
                            else if (!e.shift) { text.add(1, Text.translatable(langkey)) }
                        }
                        else if (langkey.includes('ctrl')) {
                            if (langkey.includes('.ctrl')) {
                                if (e.ctrl) { text.add(1, Text.translatable(langkey)) }
                            }
                            else if (!e.ctrl) { text.add(1, Text.translatable(langkey)) }
                        }
                        else {
                            text.add(1, Text.translatable(langkey))
                        }
                    }
                })
            }
        })
})
