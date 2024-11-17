//仅供个人查询api方法
public class PatchouliAPI {

// ================================================================================================
// Multiblocks
// ================================================================================================

/**
 * 根据 ID 获取多方块，如果不存在则返回 null。
 */
@Nullable
IMultiblock getMultiblock(ResourceLocation id);

/**
 * 根据资源位置注册一个多方块。这不仅会注册多方块，还会将其资源位置设置为传递的资源位置。
 */
IMultiblock registerMultiblock(ResourceLocation id, IMultiblock mb);

/**
 * @return 当前在世界中可视化显示的多方块，如果没有多方块被可视化则返回 null。仅在客户端有效。
 */
@Nullable
IMultiblock getCurrentMultiblock();
/**
 * 设置给定的多方块为当前可视化的多方块。这将覆盖任何当前正在可视化的多方块。
 * 仅在客户端有效。
 * 
 * @param multiblock  要可视化的多方块
 * @param displayName 显示在完成条上方的名称
 * @param center      多方块中心的位置
 * @param rotation    可视化的方向
 */
void showMultiblock(IMultiblock multiblock, Component displayName, BlockPos center, Rotation rotation);

/**
 * 清除当前可视化的多方块。仅在客户端有效。
 */
void clearMultiblock();

/**
 * 根据给定的模式和目标创建一个多方块。这与配方注册的方式相同，只是它是一个二维数组。
 * 模式的工作方式与使用 JSON 注册多方块的方式相同。有关更多信息，请参阅 Patchouli 维基上的多方块页面。
 * <br>
 * <br>
 * 至于目标数组，它的格式也与配方相同。每个字符后面跟着一个对象，依此类推，定义每种类型。
 * 对象可以是 Block、BlockState 或 IStateMatcher。
 */
IMultiblock makeMultiblock(String[][] pattern, Object... targets);

/**
 * 创建一个稀疏的多方块。这在多方块较大且难以用二维网格指定的情况下非常有用。
 * 稀疏多方块的中心始终为 (0, 0, 0)，而 {@code positions} 的键相对于该空间。
 */
IMultiblock makeSparseMultiblock(Map<BlockPos, IStateMatcher> positions);

/**
 * 使用传递的 BlockState 进行显示，并使用传递的谓词进行验证，创建一个 IStateMatcher。
 */
IStateMatcher predicateMatcher(BlockState display, Predicate<BlockState> predicate);

/**
 * 使用传递的 Block 的默认状态进行显示，并使用传递的谓词进行验证，创建一个 IStateMatcher。
 */
IStateMatcher predicateMatcher(Block display, Predicate<BlockState> predicate);

/**
 * 使用传递的 BlockState 进行显示和验证，要求世界中的状态必须完全相同，创建一个 IStateMatcher。
 */
IStateMatcher stateMatcher(BlockState state);
/**
 * 使用传递的 BlockState 进行显示和验证，要求只有指定的属性相同，创建一个 IStateMatcher。
 */
IStateMatcher propertyMatcher(BlockState state, Property<?>... properties);

/**
 * 使用传递的 Block 的默认状态进行显示和验证，要求世界中的状态仅具有相同的方块，创建一个 IStateMatcher。
 */
IStateMatcher looseBlockMatcher(Block block);

/**
 * 使用传递的 Block 的默认状态进行显示和验证，要求世界中的状态必须完全相同，创建一个 IStateMatcher。
 */
IStateMatcher strictBlockMatcher(Block block);

/**
 * 创建一个 IStateMatcher，该匹配器总是验证为 true，并在显示时显示传递的 BlockState。
 */
IStateMatcher displayOnlyMatcher(BlockState state);
/**
 * 创建一个 IStateMatcher，该匹配器总是验证为 true，并在显示时显示传递的 Block 的默认状态。
 */
IStateMatcher displayOnlyMatcher(Block block);

/**
 * @return 返回一个接受给定标签中任何方块的状态匹配器
 */
IStateMatcher tagMatcher(TagKey<Block> block);

/**
 * 创建一个只接受空气方块的 IStateMatcher。
 */
IStateMatcher airMatcher();

/**
 * 创建一个接受任何状态的 IStateMatcher。
 */
IStateMatcher anyMatcher();
	}

}
