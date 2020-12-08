<template>
	<div :style="{ display: 'inline-block' }">
		<p
			:style="{
				'white-space': 'nowarp',
				height: size / 16 + 'rem',
				'line-height': size / 16 + 'rem',
				padding: '0 ' + (size / 16) * 0.25 + 'rem',
				'border-radius': radius == 'round' ? (size / 16) * 0.5 + 'rem' : (size / 16) * 0.25 + 'rem',
				'background-color': realColor,
				color: '#fff',
				'font-size': (size / 16) * 0.5 + 'rem'
			}"
		>
			<slot></slot>
		</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			realColor: null
		};
	},
	props: {
		value: { default: 'undefined' },
		color: {
			default: false
		},
		colorname: {
			default: 'turquoise'
		},
		size: { default: 16 },
		radius: { default: 'radius' }
	},
	mounted() {},
	watch: {
		$props: {
			handler(nv, ov) {
				var _t = this;
				if (!_t.color) {
					_t.$set(_t, 'realColor', _t.$setColor(_t.colorname));
				} else {
					_t.$set(_t, 'realColor', _t.color);
				}
			},
			deep: true,
			immediate: true
		}
	}
};
</script>

<style></style>
