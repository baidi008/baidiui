<template>
	<div class="bui_progress bui_block" :style="{ height: size / 16 + 'rem' }">
		<div
			:class="['bui_progress_item', 'bui_fc_white']"
			:style="{
				width: barWidth * 100 + '%',
				height: size / 16 + 'rem',
				'line-height': size / 16 + 'rem',
				'font-size': size / 16 / 2.4 + 'rem',
				'background-color': realColor
			}"
		>
			<template v-if="size >= 24">
				{{ $toFixed(value * 100) + '%' }}
			</template>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			barWidth: 0
		};
	},
	props: {
		value: { default: 0 },
		color: { default: null },
		colorname: { default: 'turquoise' },
		size: { default: 32 },
		fixed: { default: 2 }
	},
	computed: {
		realColor() {
			var _t = this;
			var _result = '';
			if (!_t.color) {
				_result = _t.$setColor(_t.colorname);
			} else {
				_result = _t.color;
			}
			return _result;
		}
	},
	methods: {},
	watch: {
		$props: {
			handler(nv, ov) {
				var _t = this;
				nv.value <= 0 ? _t.$set(_t, 'barWidth', 0) : _t.$set(_t, 'barWidth', nv.value);
			},
			deep: true,
			immediate: true
		}
	}
};
</script>

<style></style>
