<template>
	<div class="item clazz">
		<div class="title icon"></div>
		<ul class="first none-style" @click="$store.state.dialogBus.warning('暂时不可用')">
			<li>HTML / CSS</li>
			<li>Javascript</li>
			<li>Java</li>
			<li>Java Web</li>
			<li>Flutter</li>
			<li>Python</li>
			<li>PHP</li>
			<li>MySQL</li>
			<li>服务器</li>
			<li class="icon">
				<span>其他</span>
				<ul class="second none-style">
					<li>软件</li>
					<li>游戏</li>
					<li>音乐</li>
					<li>其他</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<style scoped>
	.clazz .title {
		background-position: 6px -126px;
	}

	.clazz .first {
		width: 80%;
		padding: 8px 0;
		display: flex;
		flex-wrap: wrap;
	}

	.clazz .second {
		left: 90%;
		width: 100%;
		bottom: -2px;
		border: 2px solid #CCC;
		padding: 6px 10px;
		opacity: 0;
		position: absolute;
		visibility: hidden;
		transition: 200ms;
		background: #F4F4F4;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .7);
	}

	.clazz li {
		border: 2px solid transparent;
		height: 26px;
		position: relative;
		font-size: 14px;
		font-family: "Consolas";
		line-height: 26px;
		text-indent: 6px;
	}

	.first > li {
		width: calc(50% - 4px);
	}

	.second > li {
		width: calc(100% - 4px);
	}

	.clazz li:before {
		content: "";
		top: 50%;
		left: -3px;
		width: calc(100% - 2px);
		height: 12px;
		position: absolute;
		margin-top: -6px;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
	}

	.clazz li:after {
		content: "";
		top: -3px;
		left: 50%;
		width: 78px;
		height: calc(100% - 2px);
		position: absolute;
		border-top: 4px solid transparent;
		margin-left: -39px;
		border-bottom: 4px solid transparent;
	}

	.clazz li:hover {
		border: 2px solid #CA9381;
	}

	.clazz li:hover:before {
		border-left: 4px solid #F4F4F4;
		border-right: 4px solid #F4F4F4;
	}

	.clazz li:hover:after {
		border-top: 4px solid #F4F4F4;
		border-bottom: 4px solid #F4F4F4;
	}

	.second > li:active,
	.first > li:nth-last-child(n + 2):active {
		height: 22px;
		margin: 2px;
		line-height: 22px;
		text-indent: 4px;
	}

	.first > li:nth-last-child(n + 2):active {
		width: calc(50% - 8px);
	}

	.second > li:active {
		width: calc(100% - 8px);
	}

	.first > li:last-child {
		transition: background 200ms;
		background-position: 64px -361px;
	}

	.first > li:last-child:hover {
		transition: background 200ms;
		background-position: 70px -361px;
	}

	.first > li:last-child:hover .second {
		left: calc(100% + 2px);
		opacity: 1;
		transition: 200ms;
		visibility: visible;
	}
</style>