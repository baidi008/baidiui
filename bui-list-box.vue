<template>
	<div>
		<template v-if="!array">
			<div class="bui_p_24 bui_ta_c">
				<div style="margin: -6rpx;">
					<div class="bui_p_6"><bui-fa-icon icon="circle-o-notch fa-spin" size="32"></bui-fa-icon></div>
					<div class="bui_p_6"><p class="bui_fc_silver_d">正在加载中...</p></div>
				</div>
			</div>
		</template>
		<template v-else>
			<template v-if="array.length == 0">
				<div class="bui_p_24 bui_ta_c">
					<div style="margin: -6rpx;">
						<div class="bui_p_6"><bui-fa-icon icon="unlink" size="32"></bui-fa-icon></div>
						<div class="bui_p_6"><p class="bui_fc_silver_d">没有找到符合条件的结果</p></div>
					</div>
				</div>
			</template>
			<template v-else>
				<slot></slot>
			</template>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		array: null
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style></style>
