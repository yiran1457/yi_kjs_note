// priority: 0
// ignored: true
ItemEvents.modification((event) => {
    forceModifyAttackDamage(event, "ec_tf_plugin:fiery_broad_sword", 99);
});

const $SwordItem = Java.loadClass("net.minecraft.world.item.SwordItem");

/**
 * 强制更改攻击伤害（请在`ItemEvents.modification`事件内使用）
 * @param {Internal.ItemModificationEventJS} event 物品修改事件
 * @param {Internal.ItemStack_} itemStack 物品
 * @param {number} attackDamage 攻击伤害
 */
function forceModifyAttackDamage(event, itemStack, attackDamage) {
    event.modify(itemStack, (item) => {
        let attackDamageField = $SwordItem.__javaObject__.getDeclaredField("f_43266_");

        attackDamageField.setAccessible(true);
        attackDamageField.setFloat(item, attackDamage - 1);
    });
}