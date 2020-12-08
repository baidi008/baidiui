<template>
	<div class="bui_vm">
		<bui-fa-icon icon="bars" :color="$setColor('turquoise')"></bui-fa-icon>
		<span class="bui_fs_24 bui_p_6_lr">{{ title }}</span>
		<span class="bui_fs_12 bui_fc_silver_d ">{{ info }}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		title: { default: '' },
		info: { default: '' },
		color: { default: '' }
	}
};
</script>

<style></style>
