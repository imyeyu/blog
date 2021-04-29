<template>
	<div class="comment-root" v-if="aid">
		<div class="write-container">
			<div class="write">
				<text-field
					ref="comment-nick"
					class="nick"
					label="昵称"
					:outlined="true"
					:isEnableTips="false"
					v-model:value="comment.nick"
				></text-field>
				<text-region
					class="content"
					label="评论"
					:isEnableTips="false"
					v-model:value="comment.data"
				></text-region>
				<div class="flex">
					<div>
						<div class="input-box">
							<button class="comment-commit" @click="commit">提交</button>
						</div>
					</div>
					<div class="captcha">
						<text-field
							v-model:value="captcha"
							placeholder="验证码"
						></text-field>
						<div>
							<img :src="require('@/assets/img/captcha.png')" alt="验证码" />
						</div>
					</div>
				</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="comments">
			<div v-for="comment in comments" :key="comment">
				<!-- 主评论 -->
				<div class="comment">
					<div class="user">
						<div class="face">
							<img src="/img/user/pic.png" alt="头像" />
						</div>
						<p class="name" v-text="comment.nick"></p>
					</div>
					<div class="content">
						<p class="text" v-text="comment.data"></p>
						<div class="light-gray right">
							<a
								class="icon replies-btn"
								href="javascript:;"
								@click="replyTo(comment.id, comment.nick)"
							>回复</a>
							<span class="replies" v-text="`（${comment.repliesLength}）`"></span>
							<span class="time" v-text="toDateTime(comment.createdAt)"></span>
						</div>
						<!-- 子评论 -->
						<div class="comment-replies">
							<div class="comment-sub" v-for="reply in comment.replies" :key="reply">
								<div>
									<div class="face-sub">
										<img src="/img/user/pic.png" alt="头像" />
									</div>
								</div>
								<div class="content-sub">
									<p>
										<a class="name-sub" href="#" v-text="reply.senderNick"></a>
										<span
											class="light-gray"
											v-if="reply.receiverNick !== comment.nick"
										> 回复 </span>
										<a
											class="receiver"
											href="#"
											v-if="reply.receiverNick !== comment.nick"
											v-text="reply.receiverNick"
										></a>
										<span class="text-sub" v-text="`: ${reply.data}`"></span>
									</p>
									<div class="light-gray right">
										<a
											class="replies-sub-btn"
											href="javascript:;"
											@click="replyTo(comment.id, reply.senderNick)"
										>回复</a>
										<span class="time" v-text="toDateTime(reply.createdAt)"></span>
									</div>
								</div>
							</div>
						</div>
						<!-- 子评论页面控制，comment.repliesI 表激活页数下标，从 0 开始 -->
						<div class="page-ctrl" v-if="1 < l(comment)">
							<!-- 上一页 -->
							<a
								class="prev"
								href="javascript:;"
								v-show="comment.repliesI !== 0"
								@click="changeReplyPage(comment, comment.repliesI - 1)"
							>上一页</a>
							<!-- 前补 -->
							<template v-if="2 < comment.repliesI">
								<a
									href="javascript:;"
									class="page"
									@click="changeReplyPage(comment, 0)"
								>1</a>
								<span
									class="light-gray"
									v-show="3 < comment.repliesI"
								>..</span>
							</template>
							<!-- 中间页数，页数小于 2 时扩充遍历 -->
							<template v-for="i in (comment.repliesI < 2 ? 7 - comment.repliesI : 5)" :key="i">
								<a
									href="javascript:;"
									:class="`page${comment.repliesI === i + comment.repliesI - 3 ? ' active' : ''}`"
									v-text="i + comment.repliesI - 2"
									v-if="0 < i + comment.repliesI - 2 && i + comment.repliesI - 3 < l(comment)"
									@click="changeReplyPage(comment, i + comment.repliesI - 3)"
								></a>
							</template>
							<!-- 后补 -->
							<template v-if="5 < l(comment) && comment.repliesI < l(comment) - 3">
								<span
									class="light-gray"
									v-show="comment.repliesI < l(comment) - 4"
								>..</span>
								<a
									href="javascript:;"
									class="page"
									v-text="l(comment)"
									@click="changeReplyPage(comment, l(comment) - 1)"
								></a>
							</template>
							<!-- 下一页 -->
							<a
								class="next"
								href="javascript:;"
								v-show="comment.repliesI < Math.floor(comment.repliesLength / 6)"
								@click="changeReplyPage(comment, comment.repliesI + 1)"
							>下一页</a>
						</div>
						<!-- 回复表单 -->
						<div class="reply" v-if="activeReply === comment.id">
							<textarea
								ref="reply"
								class="reply-data"
								rows="3"
								spellcheck="false"
								v-model="commentReply.data"
								:placeholder="`回复 ${commentReply.receiverNick}`"
							>
							</textarea>
							<div class="reply-ctrl">
								<button class="reply-commit" @click="commitReply">发表</button>
								<a href="javascript:;" @click="activeReply = -1">取消</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<loading
		:isFinished="isLoadFinished"
		:isError="isLoadError"
		:finishText="'已加载所有评论 (◡ ᴗ ◡ ✿)'"
	></loading>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { toDateTime } from '@/helpers/UnixTime';
import CommentAPI from '@/api/CommentAPI';
import { Comment, CommentReply } from '@/type/Comment';
import TextField from '@/components/TextInput/TextField.vue';
import TextRegion from '@/components/TextInput/TextRegion.vue';
import Loading from '@/components/Loading.vue';

export default defineComponent({
	components: {
		TextField,
		TextRegion,
		Loading
	},
	props: {
		aid: {
			type: Number,
			requied: true
		}
	},
	data(): {
		activeReply: number; // 激活的回复，-1 为不显示在任何位置

		captcha: string;
		comment: Comment;
		comments: Comment[];
		commentReply: CommentReply;

		isLoadError: boolean;
		isLoadFinished: boolean;
		} {
		return {
			activeReply: -1,
			captcha: '',
			comment: {
				articleId: this.aid,
				nick: '',
				data: ''
			},
			comments: [],
			commentReply: {
				commentId: -1,
				senderId: undefined,
				receiverId: undefined,
				senderNick: '',
				receiverNick: '',
				data: '',
			},
			isLoadError: false,
			isLoadFinished: false
		}
	},
	watch: {
		aid() {
			this.comment.articleId = this.aid;
		}
	},
	async mounted() {
		this.getComments();
		this.$store.state.scroller.add('Comment', this.onScroll);
	},
	methods: {
		toDateTime(unix: number) : string {
			return toDateTime(unix);
		},
		// 子评论页数
		l(comment: Comment) : number {
			return comment.repliesLength ? Math.ceil(comment.repliesLength / 6) : 0;
		},
		// 获取评论
		async getComments() {
			if (!this.isLoadFinished && this.aid) {
				const result = await CommentAPI.getComments(this.aid as number, this.comments.length);
				if (result.length !== 0) {
					this.comments = this.comments.concat(result.map((comment) => {
						comment.repliesI = 0;
						return comment;
					}));
				} else {
					this.isLoadFinished = true;
				}
			}
		},
		// 提交评论
		async commit() {
			const result = await CommentAPI.createComment(this.comment, this.captcha);
			if (result) {
				this.comments.unshift(result);
				this.comment.data = this.captcha = '';
			}
		},
		// 触发回复表单
		replyTo(cid: number, receiverNick: string = '') {
			this.activeReply = this.commentReply.commentId = cid;
			this.commentReply.receiverNick = receiverNick;
			this.commentReply.data = '';
			this.$nextTick(() => {
				(this.$refs.reply as HTMLTextAreaElement).focus();
            });
		},
		// 翻页回复
		async changeReplyPage(comment: Comment, toPage: number) {
			if (comment && comment.id) {
				comment.repliesI = toPage;
				const result = await CommentAPI.getCommentReplies(comment.id, toPage * 6);
				if (result) {
					comment.replies = result as any;
					this.activeReply = -1;
				}
			}
		},
		// 提交回复
		async commitReply() {
			if (this.comment.nick === '') {
				(this.$refs['comment-nick'] as any).requestFocus();
				return;
			}
			if (this.commentReply.data === '') {
				return;
			}
			this.commentReply.senderNick = this.comment.nick;
			const result = await CommentAPI.createCommentReply(this.commentReply);
			if (result) {
				const comment = this.comments.find((comment) => {
					return comment.id === result.commentId;
				});
				if (comment) {
					if (comment.repliesLength) {
						this.changeReplyPage(comment, Math.floor(comment.repliesLength++ / 6));
					}
				}
			}
		},
		onScroll(top: number, wasBottom: boolean) {
			if (wasBottom) {
				this.getComments();
			}
		}
	}
});
</script>
<style scoped>
	.comment-root {
		margin-top: 4rem;
	}
	/* 表单 */
	.write-container {
		width: 76%;
		margin: 12px auto 32px auto;
		display: flex;
		align-items: stretch;
	}
	.write-container .write {
		width: 100%;
		height: 296px;
		padding: 6px 0 18px 24px;
		position: relative;
		background: url('~@/assets/img/comment.png') no-repeat;
	}

	.write-container .right {
		width: 24px;
		min-width: 24px;
		background: url('~@/assets/img/comment-1.png');
	}

	.nick {
		width: 50%;
	}

	.write .content {
		width: 100%;
	}

	.comment-commit {
		border: 2px solid #EED7D7;
		padding: 1px 22px;
		font-size: 15px;
		margin-right: 6px;
		border-radius: 4px;
	}

	.comment-commit:hover {
		background: #EED7D7;
	}

	.comment-commit:active {
		background: #FFE0DF;
	}

	.captcha {
		width: 90px;
		display: flex;
	}
	/* 评论 */
	.comments {
		font-size: 13px;
		line-height: 1.5;
		border-top: 2px solid #CDDEF0;
	}

	.comment {
		display: flex;
		font-size: 13px;
		line-height: 1.5;
		border-bottom: 2px solid #CDDEF0;
	}

	.user {
		width: 120px;
		padding: 16px 8px;
		text-align: center;
		background: #E4EFFA;
	}

	.face {
		width: 61px;
		height: 61px;
		border: 1px solid #FBC7D4;
		margin: 0 auto 10px auto;
		padding: 3px;
	}

	.face img {
		width: 61px;
		height: 61px;
	}

	.content {
		width: 100%;
	}

	.text {
		padding: 12px 4px 4px 12px;
		min-height: 100px;
	}

	.replies-btn {
		padding-left: 22px;
		background-position: 0 -816px;
	}

	.time {
		padding-right: 8px;
	}
	/* 回复 */
	.comment-sub {
		display: flex;
		padding: 6px 0 2px 12px;
	}

	.comment-sub:nth-child(n + 2) {
		border-top: 1px #d7d7d7 dotted;
	}

	.comment-sub:first-child {
		border-top: 2px solid #E4EFFA;
		padding-top: 12px;
	}

	.face-sub {
		border: 1px solid #FBC7D4;
		padding: 2px;
	}

	.face-sub img {
		width: 32px;
		height: 32px;
	}

	.content-sub {
		width: 100%;
		margin-left: 6px;
	}

	.replies-sub-btn {
		visibility: hidden;
		margin-right: 4px;
	}

	.content-sub:hover .replies-sub-btn {
		visibility: visible;
	}
	/* 回复页面控制 */
	.page-ctrl {
		padding: 0 8px;
		font-size: 14px;
		line-height: 2;
	}

	.page-ctrl a {
		display: inline-block;
		padding: 0 2px;
		min-width: 18px;
		text-align: center;
	}

	.page-ctrl .active {
		color: #000;
		cursor: var(--default);
		text-decoration: none;
	}
	/* 回复表单 */
	.reply {
		width: 100%;
		padding: 12px 0;
		display: flex;
		border-top: 2px solid #E4EFFA;
		align-items: center;
		align-content: normal;
		flex-direction: column;
	}

	.reply-data {
		width: 90%;
		border: 2px solid #CDDEF0;
		background: transparent;
		margin-bottom: 4px;
	}

	.reply-ctrl {
		width: 90%;
		margin-left: -8px;
	}

	.reply-commit {
		border: none;
		padding: 4px 16px;
		background: #CDDEF0;
		margin-right: 10px;
		border-radius: 2px;
	}

	.reply-commit:hover {
		background: #B9CFE5;
	}

	@media screen and (max-width: 900px) {
		.write-container {
			width: 90%;
		}
	}
</style>