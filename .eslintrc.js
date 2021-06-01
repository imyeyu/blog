module.exports = {
    env: {
        "browser": true,
        "node": true,
		"es6": true
    },
	parser: "vue-eslint-parser",
    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/recommended"
    ],
    parserOptions: {
        "ecmaVersion": 12,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    plugins: [
        "vue",
        "@typescript-eslint"
    ],
    rules: {                                                           // 注释是解释使用该设置的效果，而不是设置属性本身
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// 其他
		"camelcase": 2,                                                // 变量驼峰式命名
		"quotes": ["error", "single"],                                 // 强制单引字符串
		"eqeqeq": ["error", "always"],                                 // 强制全等比较
		"semi": ["error", "always"],                                   // 强制语句分号结束
		// 逗号
		"comma-style": [2, "last"],                                    // 逗号出现在行末 [first, last]
		"comma-dangle": [2, "never"],                                  // 数组或对象不可带最后一个逗号 [never, always, always-multiline]
		// 空格
		"comma-spacing": [2, { "before": false, "after": true }],      // 逗号后需要空格
		"semi-spacing": ["error", { "before": false, "after": true }], // 分号后需要空格
		"computed-property-spacing": [2, "never"],                     // 以方括号取对象属性时，[ 后面和 ] 前面需要空格, [never, always]
		"space-before-function-paren": ["error", {                     // 函数括号前空格
			"anonymous": "always",                                         // 针对匿名函数表达式，比如 function () {}
			"named": "never",                                              // 针对命名函数表达式，比如 function foo() {}
			"asyncArrow": "always"                                         // 针对异步的箭头函数表达式，比如 async () => {}
		}],
		// 缩进
		"no-mixed-spaces-and-tabs": "off",                             // 允许混合缩进
		"no-tabs": ["error", { allowIndentationTabs: true }],          // 使用 Tab 缩进
		"indent": ["error", "tab", {                                   // Tab 缩进相关
			SwitchCase: 1                                              //     Switch Case 缩进一级
		}],
		// 框架
		"@typescript-eslint/ban-types": "off",                         // TS 允许空对象
		"@typescript-eslint/no-empty-function": "off",                 // TS 允许空函数
		"vue/no-multiple-template-root": "off",                        // Vue3 支持多个根节点
		"@typescript-eslint/no-this-alias": "off",                     // 允许 this 变量本地化
		"vue/no-v-model-argument": "off",                              // 允许 v-model 支持参数
    }
};