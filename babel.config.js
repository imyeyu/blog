module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset'
	]
};

module.exports = {
	plugins: [
		['prismjs', {
			languages: [
				'ini',
				'php',
				'sql',
				'css',
				'html',
				'json',
				'yaml',
				'java',
				'bash',
				'javascript',
				'typescript',
				'apacheconf',
				'properties'
			],
			plugins: ['line-numbers'],
			showLineNumbers: true,
			theme: 'okaidia',
			css: true
		}]
	]
};