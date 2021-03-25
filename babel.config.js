module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset'
	]
}

module.exports = {
	plugins: [
		['prismjs', {
			languages: ['javascript', 'typescript', 'json', 'yaml', 'java', 'php', 'sql', 'html', 'css'],
			plugins: ['line-numbers'],
			showLineNumbers: true,
			theme: 'okaidia',
			css: true
		}]
	]
}