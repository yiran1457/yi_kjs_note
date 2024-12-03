console.log("RecipesBuilder version V1.0")

function newClass(parentClass, classObj, methods) {
    if (methods == undefined) {
        methods = classObj
        classObj = parentClass
    } else {
        classObj.prototype = Object.create(parentClass.prototype)
    }

    classObj.prototype.constructor = classObj

    if (methods != undefined) {
        for (var key in methods) {
            classObj.prototype[key] = methods[key]
        }
    }
    return classObj
}

const AbstractMethodError = newClass(Error, function(message) {
    Error.call(this, message)
    this.message = message
})

function checkValue(name, targetType, value, canEmpty) {
    if (canEmpty == undefined) {
        canEmpty = false
    }

    if (value == undefined && canEmpty) {
        return
    }

    if (typeof(value) != targetType) {
        const e = TypeError(`${name} 需要${targetType}类型 (传入了${typeof(value)}类型)`)
        Error.captureStackTrace(e)
        console.log(e.stack)
        throw e
    }
}


function item(itemId, count, nbt, chance) {
    if (typeof(nbt) == "number" && chance == undefined) {
        chance = nbt
        nbt = undefined
    }

    checkValue("itemId", "string", itemId, true)
    checkValue("count", "number", count, true)
    checkValue("nbt", "object", nbt, true)
    checkValue("chance", "number", chance, true)

    const data = {
        "item": itemId == undefined ? "" : itemId
    }
    if (count != undefined && count > 1) {
        data.count = count
    }
    if (nbt != undefined) {
        data.nbt = nbt
    }
    if (chance != undefined) {
        data.chance = chance
    }
    return data
}

function fluid(fluidId, amount, nbt, chance) {
    if (typeof(nbt) == "number" && chance == undefined) {
        chance = nbt
        nbt = undefined
    }

    checkValue("fluidId", "string", fluidId, true)
    checkValue("amount", "number", amount, true)
    checkValue("nbt", "object", nbt, true)
    checkValue("chance", "number", chance, true)

    const data = {
        "fluid": fluidId == undefined ? "" : fluidId
    }
    if (amount != undefined) {
        data.amount = amount
    }
    if (nbt != undefined) {
        data.nbt = nbt
    }
    if (chance != undefined) {
        data.chance = chance
    }
    return data
}

function tag(tagId, count, nbt, chance) {
    if (typeof(nbt) == "number" && chance == undefined) {
        chance = nbt
        nbt = undefined
    }

    checkValue("tagId", "string", tagId, true)
    checkValue("count", "number", count, true)
    checkValue("nbt", "object", nbt, true)
    checkValue("chance", "number", chance, true)

    const data = {
        "tag": tagId == undefined ? "" : tagId
    }
    if (count != undefined && count > 1) {
        data.count = count
    }
    if (nbt != undefined) {
        data.nbt = nbt
    }
    if (chance != undefined) {
        data.chance = chance
    }
    return data
}


const RecipesBuilder = newClass(function(event) {
    this.event = event
}, {
    build: function() {
        this.event.custom(this.generateJson())
    },

    generateJson: function() {
        throw new AbstractMethodError("generateJson")
    }
})

const MinecraftRecipesBuilder = newClass(RecipesBuilder, function(event) {
    RecipesBuilder.call(this, event)
    this.outputItem = {}
}, {
    add: function(type, value, nbt) {
        throw new AbstractMethodError("add")
    },

    addItem: function(name, itemId, nbt) {
        this.add("item", name, itemId, nbt)
        return this
    },

    addTag: function(name, tag, nbt) {
        this.add("tag", name, tag, nbt)
        return this
    },

    output: function(itemId, count, nbt) {
        this.outputItem = item(itemId, count, nbt)
        return this
    }
})

const InputOutputItemBuilder = newClass(RecipesBuilder, function(event) {
    RecipesBuilder.call(this, event)
    this.inputItem = item()
    this.outputItem = item()
}, {
    input: function(itemId, count, nbt) {
        this.inputItem = item(itemId, count, nbt)
        return this
    },

    inputTag: function(tagId, count, nbt) {
        this.inputItem = tag(tagId, count, nbt)
        return this
    },

    output: function(itemId, count, nbt) {
        this.outputItem = item(itemId, count, nbt)
        return this
    }
})

const ProecssTimeIOItemBuilder = newClass(InputOutputItemBuilder, function(event) {
    InputOutputItemBuilder.call(this, event)
    this.processingTime = -1
}, {
    processTime: function(time) {
        this.processingTime = time
        return this
    }
})

const MutilInputOutputItemBuilder = newClass(RecipesBuilder, function(event) {
    RecipesBuilder.call(this, event)
    this.inputItems = []
    this.outputItems = []
}, {
    addInputItem: function(itemId, count, nbt) {
        this.inputItems.push(item(itemId, count, nbt))
        return this
    },

    addInputFluid: function(fluidId, amount, nbt) {
        this.inputItems.push(fluid(fluidId, amount, nbt))
        return this
    },

    addInputTag: function(tagId, count, nbt) {
        this.inputItems.push(tag(tagId, count, nbt))
        return this
    },

    addOutputItem: function(itemId, count, nbt, chance) {
        this.outputItems.push(item(itemId, count, nbt, chance))
        return this
    },

    addOutputFluid: function(fluidId, amount, nbt, chance) {
        this.outputItems.push(fluid(fluidId, amount, nbt, chance))
        return this
    }
})

const ShapedBuilder = newClass(MinecraftRecipesBuilder, function(event) {
    MinecraftRecipesBuilder.call(this, event)
    this.shapes = ["   ", "   ", "   "]
    this.ids = {}
}, {
    shape: function(top, center, bottom) {
        this.shapes = [top, center, bottom]
        return this
    },

    add: function(type, name, value, nbt) {
        const dict = {}
        dict[type] = value
        if (nbt != undefined) {
            dict.nbt = nbt
        }

        this.ids[name] = dict
    },

    // Override
    generateJson: function() {
        return {
            "type": "minecraft:crafting_shaped",
            "pattern": this.shapes,
            "key": this.ids,
            "result": this.outputItem
        }
    }
})

const ShapelessBuilder = newClass(MinecraftRecipesBuilder, function(event) {
    MinecraftRecipesBuilder.call(this, event)
    this.items = []
}, {
    add: function(type, value, nbt) {
        const data = {}
        data[type] = value
        if (nbt != undefined) {
            data.nbt = nbt
        }

        this.items.push(data)
    },

    generateJson: function() {
        return {
            "type": "minecraft:crafting_shapeless",
            "ingredients": this.items,
            "result": this.outputItem
        }
    }
})

const SequenceBuilder = newClass(function(parent) {
    this.parentBuilder = parent
    this.sequeneFunctions = []
}, {
    parent: function() {
        return this.parentBuilder
    },

    filling: function(fluidId, amount, nbt) {
        this.sequeneFunctions.push((inputItem) => {
            return {
                "type": "create:filling",
                "ingredients": [
                    item(inputItem),
                    fluid(fluidId, amount, nbt)
                ],
                "results": [
                    item(inputItem)
                ]
            }
        })
        return this
    },

    deploying: function(itemId) {
        this.sequeneFunctions.push((inputItem) => {
            return {
                "type": "create:deploying",
                "ingredients": [
                    item(inputItem),
                    item(itemId)
                ],
                "results": [item(inputItem)]
            }
        })
        return this
    },

    pressing: function() {
        this.sequeneFunctions.push((inputItem) => {
            return {
                "type": "create:pressing",
                "ingredients": [item(inputItem)],
                "results": [item(inputItem)]
            }
        })
        return this
    },

    build: function(inputItem) {
        const sequene = []
        this.sequeneFunctions.forEach((v) => {
            sequene.push(v(inputItem))
        })

        return sequene
    }
})

const BlastingBuilder = newClass(ProecssTimeIOItemBuilder, function(event) {
    ProecssTimeIOItemBuilder.call(this, event)
    this.expCount = -1
}, {
    xp: function(xpCount) {
        this.expCount = xpCount
        return this
    },

    generateJson: function() {
        const data = {
            "type": "minecraft:blasting",
            "ingredient": this.inputItem,
            "result": this.outputItem
        }

        if (this.expCount != -1) {
            data.experience = this.expCount
        }

        if (this.processingTime != -1) {

            data.cookingtime = this.processingTime
        }

        return data
    }
})

const CreateAssemblyBuilder = newClass(RecipesBuilder, function(event) {
    RecipesBuilder.call(this, event)

    this.inputItem = ""
    this.loopCount = 1
    this.outputs = []
    this.sequenceBuilder = new SequenceBuilder(this)
    this.transitionalItemId = undefined
}, {
    input: function(itemId) {
        this.inputItem = itemId
        return this
    },

    loop: function(loop) {
        this.loopCount = loop
        return this
    },

    addOutput: function(itemId, count, nbt, chance) {
        this.outputs.push(item(itemId, count, nbt, chance))
        return this
    },

    sequence: function() {
        return this.sequenceBuilder
    },

    transitionalItem: function(itemId) {
        this.transitionalItemId = itemId
        return this
    },

    generateJson: function() {
        let transitionalItem = this.inputItem
        if (this.transitionalItemId != undefined) {
            transitionalItem = this.transitionalItemId
        }

        return {
            "type": "create:sequenced_assembly",
            "ingredient": {
                "item": this.inputItem
            },
            "loops": this.loopCount,
            "results": this.outputs,
            "sequence": this.sequenceBuilder.build(transitionalItem),
            "transitionalItem": {
                "item": transitionalItem
            }
        }
    }
})

const CreatePolishingBuilder = newClass(InputOutputItemBuilder, function(event) {
    InputOutputItemBuilder.call(this, event)
}, {
    generateJson: function() {
        return {
            "type": "create:sandpaper_polishing",
            "ingredients": [
                this.inputItem
            ],
            "results": [
                this.outputItem
            ]
        }
    }
})

const CreatePressingBuilder = newClass(InputOutputItemBuilder, function(event) {
    InputOutputItemBuilder.call(this, event)
}, {
    generateJson: function() {
        return {
            "type": "create:pressing",
            "ingredients": [
                this.inputItem
            ],
            "results": [
                this.outputItem
            ]
        }
    }
})

const CreateMixingBuilder = newClass(MutilInputOutputItemBuilder, function(event) {
    MutilInputOutputItemBuilder.call(this, event)
    this.heatLevel = 0
}, {
    heat: function(heatLevel) {
        this.heatLevel = heatLevel
        return this
    },

    generateJson: function() {
        const data = {
            "type": "create:mixing",
            "ingredients": this.inputItems,
            "results": this.outputItems
        }

        if (this.heatLevel == 1) {
            data.heatRequirement = "heated"
        } else if (this.heatLevel == 2) {
            data.heatRequirement = "superheated"
        }

        return data
    }
})

const CreateMillingBuilder = newClass(RecipesBuilder, function(event) {
    RecipesBuilder.call(this, event)
    this.inputItem = item()
    this.outputItems = []
    this.processingTime = 0
}, {
    input: function(itemId, count, nbt) {
        this.inputItem = item(itemId, count, nbt)
        return this
    },

    addOutput: function(itemId, count, nbt, chance) {
        this.outputItems.push(item(itemId, count, nbt, chance))
        return this
    },

    processTime: function(time) {
        this.processingTime = time
        return this
    },

    generateJson: function() {
        return {
            "type": "create:milling",
            "ingredients": [this.inputItem],
            "processingTime": this.processingTime,
            "results": this.outputItems
        }
    }
})

const CreateMechanicalCraftingBuilder = newClass(RecipesBuilder, function(event) {
    RecipesBuilder.call(this, event)
    this.craftingShape = []
    this.items = {}
    this.outputItem = item()
    this.noMirror = false
}, {
    shape: function(shape) {
        this.craftingShape = shape
        return this
    },

    addItem: function(name, itemId, nbt) {
        this.items[name] = item(itemId, undefined, nbt)
        return this
    },

    addTag: function(name, tagId, nbt) {
        this.items[name] = tag(tagId, undefined, nbt)
        return this
    },

    output: function(itemId, count, nbt) {
        this.outputItem = item(itemId, count, nbt)
        return this
    },

    noMirror: function() {
        this.noMirror = true
        return this
    },

    generateJson: function() {
        return {
            "type": "create:mechanical_crafting",
            "acceptMirrored": !this.noMirror,
            "key": this.items,
            "pattern": this.craftingShape,
            "result": this.outputItem
        }
    }
})

const CreateCuttingBuilder = newClass(ProecssTimeIOItemBuilder, function(event) {
    ProecssTimeIOItemBuilder.call(this, event)
}, {
    generateJson: function() {
        return {
            "type": "create:cutting",
            "ingredients": [this.inputItem],
            "processingTime": this.processingTime,
            "results": [this.outputItem]
        }
    }
})

const CreateFillingBuilder = newClass(InputOutputItemBuilder, function(event) {
    InputOutputItemBuilder.call(this, event)
    this.inputFluid_ = fluid()
}, {
    inputFluid: function(fluidId, amount, nbt) {
        this.inputFluid_ = fluid(fluidId, amount, nbt)
        return this
    },

    generateJson: function() {
        return {
            "type": "create:filling",
            "ingredients": [
                this.inputItem,
                this.inputFluid_
            ],
            "results": [this.outputItem]
        }
    }
})

const CreateCompactingBuilder = newClass(MutilInputOutputItemBuilder, function(event) {
    MutilInputOutputItemBuilder.call(this, event)
}, {
    generateJson: function() {
        return {
            "type": "create:compacting",
            "ingredients": this.inputItems,
            "results": this.outputItems
        }
    }
})


RecipesBuilder.shaped = function(event) {
    return new ShapedBuilder(event)
}

RecipesBuilder.shapeless = function(event) {
    return new ShapelessBuilder(event)
}

RecipesBuilder.blasting = function(event) {
    return new BlastingBuilder(event)
}

RecipesBuilder.assembly = function(event) {
    return new CreateAssemblyBuilder(event);
}

RecipesBuilder.polishing = function(event) {
    return new CreatePolishingBuilder(event)
}

RecipesBuilder.pressing = function(event) {
    return new CreatePressingBuilder(event)
}

RecipesBuilder.mixing = function(event) {
    return new CreateMixingBuilder(event)
}

RecipesBuilder.milling = function(event) {
    return new CreateMillingBuilder(event)
}

RecipesBuilder.mechanicalCrafting = function(event) {
    return new CreateMechanicalCraftingBuilder(event)
}

RecipesBuilder.cutting = function(event) {
    return new CreateCuttingBuilder(event)
}

RecipesBuilder.filling = function(event) {
    return new CreateFillingBuilder(event)
}

RecipesBuilder.compacting = function(event) {
    return new CreateCompactingBuilder(event)
}

global["RecipesBuilder"] = RecipesBuilder

try {
    module.exports = RecipesBuilder
} catch (Error) {}