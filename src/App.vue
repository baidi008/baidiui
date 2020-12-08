<template>
	<div id="app" :class="[$root.win.dev != 'mobile' ? 'bui_flex_row' : 'bui_flex_column','bui_fs_14']" style="height: 100%;">
		<div :class="$root.win.dev != 'mobile' ? 'bui_flex_row_l' : 'bui_flex_column_t'"><com-nav></com-nav></div>
		<div :class="[$root.win.dev != 'mobile' ? 'bui_flex_row_c' : 'bui_flex_column_m', 'bui_scrollbar']">
			<div class="bui_flex_column" style="height: 100%;">
				<!-- 	<div class="bui_flex_column_t"><div class="bui_p_12 bui_p_24_lr bui_shadow">header</div></div> -->
				<div class="bui_flex_column_m bui_scrollbar" id="page"><router-view></router-view></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	mounted() {},
	watch: {
		$route() {
			var _t = this
			$(_t.$el)
				.find('#page')
				.scrollTop(0)
		}
	}
}
</script>

<style></style>
