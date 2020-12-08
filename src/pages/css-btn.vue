<template>
	<div class="bui_p_48">
		<div class="bui_row_p_32">
			<!--预设按钮-->
			<com-title title="预设按钮" info="btn"></com-title>
			<div>
				<div class="bui_inline bui_row_p_12">
					<div>
						<button :class="['bui_btn']">
							<i class="fa fa-user fa-fw"></i>
							我是一个普通按钮
						</button>
					</div>
					<div>
						<button :class="['bui_btn', 'bui_btn_sq']"><i class="fa fa-user fa-fw"></i></button>
					</div>
					<div><button :class="['bui_btn', 'bui_btn_sq']">B</button></div>
				</div>
			</div>
			<div>
				<bui-code>
					<pre><div class="bui_btn">text</div></pre>
				</bui-code>
			</div>
			<!--预设按钮-->
			<!--颜色-->
			<com-title title="颜色" info="color"></com-title>
			<div>
				<div class="bui_inline bui_row_p_12">
					<template v-for="color in $colorArray">
						<div><button :class="['bui_btn', 'bui_bgc_' + color]">深色按钮</button></div>
						<div><button :class="['bui_btn', 'bui_btn_light', 'bui_bgc_' + color]">浅色按钮</button></div>
					</template>
				</div>
			</div>
			<div>
				<bui-code>
					<pre><template v-for="color in $colorArray"><div :class="['bui_btn', 'bui_bgc_' + color]">{{color}}</div>
	<div :class="['bui_btn','bui_btn_light', 'bui_bgc_' + color]">{{color}}</div>
	</template></pre>
				</bui-code>
			</div>
			<!--颜色-->
			<!--尺寸-->
			<com-title title="尺寸" info="size"></com-title>
			<div>
				<div class="bui_inline bui_row_p_12">
					<template v-for="size in [24, 32, 48, 64]">
						<div>
							<button :class="['bui_btn', 'bui_bgc_white', 'bui_btn_' + size]">{{ size + 'px' }}</button>
						</div>
					</template>
				</div>
			</div>
			<div>
				<bui-code>
					<pre><template v-for="size in [24, 32, 48, 64]"><div><button :class="['bui_btn', 'bui_bgc_white', 'bui_btn_' + size]">{{size+'px'}}</button></div>
	</template></pre>
				</bui-code>
			</div>
			<!--尺寸-->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			size: 24,
			direction: '',
			directionArray: [
				{ name: 'top', value: '_t' },
				{ name: 'bottom', value: '_b' },
				{ name: 'left', value: '_l' },
				{ name: 'right', value: '_r' },
				{ name: 'all', value: '' }
			],
			sizeArray: [1, 2, 4, 8, 16]
		};
	},
	mounted() {}
};
</script>

<style></style>
