module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/standard',
		'@vue/typescript/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// 其他
		"camelcase": 2,                                                // 驼峰模式
		"quotes": ["error", "single"],                                 // 强制单引字符串
		"eqeqeq": ["error", "always"],                                 // 强制全等比较
		"semi": ["error", "always"],                                   // 强制语句分号结束
		// 逗号
		"comma-style": [2, "last"],                                    // 逗号出现行头还是行末 [first, last]
		"comma-dangle": [2, "never"],                                  // 数组或对象不可带左后一个逗号 [never, always, always-multiline]
		// 空格
		"comma-spacing": [2, { "before": false, "after": true }],      // 控制逗号前后空格
		"semi-spacing": ["error", { "before": false, "after": true }], // 强制分号后空格
		"computed-property-spacing": [2, "never"],                     // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, [never, always]
		// 缩进
		"no-mixed-spaces-and-tabs": "error",                           // 禁止混合缩进，除非需要对齐
		"no-tabs": ["error", { allowIndentationTabs: true }],          // 使用 Tab 缩进
		"indent": ["error", "tab", {                                   // Tab 缩进相关
			SwitchCase: 1                                              //     Switch Case 缩进级别
		}],
	}
}