<template>
	<div>
		<div class="bui_flex_row bui_cursor_p bui_bgc_silver_l_h bui_vm" :style="{ 'font-size': size / 16 + 'rem', padding: '0.5em 1em' }" @click="click">
			<div class="bui_flex_row_l" :style="{ 'padding-left': rank + 'em', color: tree.menuUrl == current ? realColor : $setColor('black,l') }">
				<template v-if="tree.children">
					<bui-fa-icon :icon="showChildren ? 'folder-open-o' : 'folder-o'"></bui-fa-icon>
				</template>
				<template v-else>
					<bui-fa-icon :icon="tree.menuUrl == current ? 'file-text' : 'file-text-o'"></bui-fa-icon>
				</template>
			</div>
			<div class="bui_flex_row_c bui_p_6_lr" :style="{ color: tree.menuUrl == current ? realColor : $setColor('black,l') }">{{ tree.menuName }}</div>
			<div class="bui_flex_row_r" v-if="tree.children && tree.children.length != 0"><bui-fa-icon :icon="showChildren ? 'angle-right' : 'angle-down'"></bui-fa-icon></div>
		</div>
		<div :style="{ display: showChildren ? 'block' : 'none' }">
			<template v-for="(tree, treeIndex) in tree.children">
				<bui-tree :key="treeIndex" :tree="tree" :rank="rank + 1" v-model="showChildren"></bui-tree>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			current: '',
			showChildren: false
		};
	},
	props: {
		tree: { default: {} },
		rank: { default: 0 },
		size: { default: 14 },
		color: { default: null },
		colorname: { default: 'turquoise' }
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
	model: {
		prop: 'showChildren',
		event: 'change'
	},
	mounted() {
		var _t = this;
	},
	methods: {
		click() {
			var _t = this;
			if (_t.tree.children) {
				_t.showChildren ? _t.$set(_t, 'showChildren', false) : _t.$set(_t, 'showChildren', true);
			} else {
				_t.$gotoUrl(_t.tree.menuUrl);
			}
		}
	},
	watch: {
		$route: {
			immediate: true,
			deep: true,
			handler() {
				var _t = this;
				_t.$set(_t, 'current', _t.$router.history.current.path);
				if (_t.tree.children) {
					if (_t.tree.children.findIndex(res => res.menuUrl == _t.current) != -1) {
						_t.$set(_t, 'showChildren', true);
					}
				}
			}
		},
		showChildren(nv, ov) {
			var _t = this;
			nv ? _t.$emit('change', nv) : null;
		}
	}
};
</script>
<style></style>
