<template>
	<div
		class="bui_bds_1_b bui_p_12_tb bui_p_24_lr bui_flex_row bui_vm"
		:class="[disabled ? 'bui_bgc_silver_l' : 'bui_bgc_white']"
		@click="onClick()"
		hover-class="bui_bgc_silver_l"
	>
		<div class="bui_flex_row_l bui_p_12_r" v-if="title || icon">
			<template v-if="type == 'title'">
				<bui-fa-icon icon="lens" :color="iconColor" size="24"></bui-fa-icon>
			</template>
			<slot name="left"></slot>
		</div>
		<div class="bui_flex_row_c">
			<div v-if="title" :class="[type == 'title' ? 'bui_fs_20' : '', 'bui_fs_14']">{{ title }}</div>
			<div v-if="info" class="bui_fs_12 bui_fc_black_f">{{ info }}</div>
			<slot></slot>
		</div>
		<div class="bui_flex_row_r bui_p_12_l">
			<bui-fa-icon icon="angle-right" v-if="arrow"></bui-fa-icon>
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		type: { default: 'list' },
		icon: { default: false },
		iconColor: { default: 'turquoise' },
		title: { default: null },
		info: { default: null },
		arrow: {
			default: false
		},
		disabled: {
			default: false
		}
	},
	methods: {
		onClick() {
			var _t = this;
			!_t.disabled ? _t.$emit('click') : null;
		},
		onSwitchChange(e) {
			var _t = this;
			!_t.disabled ? _t.$emit('switchChange', e.detail) : null;
		}
	},
	watch: {
		value: {
			handler(nv, ov) {
				var _t = this;
				nv < 0 ? _t.$set(_t, 'value', 0) : null;
			}
		}
	},
	onLoad() {
		var _t = this;
	}
};
</script>

<style></style>
