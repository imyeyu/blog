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
					<div class="captcha-box">
						<text-field
							v-model:value="captchaC"
							placeholder="验证码"
						></text-field>
						<div>
							<captcha ref="captchaC" :width="74" :height="24" from="COMMENT" />
						</div>
					</div>
				</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="comments">
			<div v-for="c in comments" :key="c">
				<!-- 主评论 -->
				<div class="comment">
					<div class="user">
						<!-- 主评论头像 -->
						<div class="face">
							<img v-if="c.user && c.user.data.hasAvatar" :src="resURL(`res@/user/avatar/${c.user.id}.png`)" alt="头像" />
							<img v-else :src="resURL('res@/user/avatar/default.png')" alt="头像" />
						</div>
						<p class="name" v-text="c.nick"></p>
					</div>
					<div class="content">
						<!-- 主评论内容 -->
						<p class="text" v-text="c.data"></p>
						<div class="light-gray right">
							<a
								class="icon replies-btn"
								href="javascript:;"
								@click="replyTo(c.id, c.nick)"
							>回复</a>
							<span class="replies" v-text="`（${c.repliesLength}）`"></span>
							<span class="time" v-text="toDateTime(c.createdAt)"></span>
						</div>
						<!-- 子评论 -->
						<div class="comment-replies">
							<div class="comment-sub" v-for="reply in c.replies" :key="reply">
								<!-- 子评论头像 -->
								<div>
									<div class="face-sub">
										<img v-if="c.user && c.user.data.hasAvatar" :src="resURL(`res@/user/avatar/${c.user.id}.png`)" alt="头像" />
										<img v-else :src="resURL('res@/user/avatar/default.png')" alt="头像" />
									</div>
								</div>
								<!-- 子评论内容 -->
								<div class="content-sub">
									<p>
										<!-- 回复用户 -->
										<a class="name-sub" href="#" v-text="reply.senderNick"></a>
										<span
											class="light-gray"
											v-if="reply.receiverNick !== c.nick"
										> 回复 </span>
										<!-- 被回复用户 -->
										<a
											class="receiver"
											href="#"
											v-if="reply.receiverNick !== c.nick"
											v-text="reply.receiverNick"
										></a>
										<span class="text-sub" v-text="`: ${reply.data}`"></span>
									</p>
									<!-- 回复内容 -->
									<div class="light-gray right">
										<a
											class="replies-sub-btn"
											href="javascript:;"
											@click="replyTo(c.id, reply.senderNick)"
										>回复</a>
										<span class="time" v-text="toDateTime(reply.createdAt)"></span>
									</div>
								</div>
							</div>
						</div>
						<!-- 子评论页面控制，c.repliesI 表激活页数下标，从 0 开始 -->
						<!-- 如有省略页，至少两页才触发，中间页最多 5 页，如果 5 页可以遍历完，后面不省略 -->
						<!-- 1 2 3 4 5 .. 8 -->
						<!-- 1 .. 4 5 6 7 8 .. 11 -->
						<!-- 1 .. 5 6 7 8 9 10 -->
						<!-- 1 .. 8 9 10 -->
						<div class="page-ctrl" v-if="1 < l(comment)">
							<!-- 上一页 -->
							<a
								class="prev"
								href="javascript:;"
								v-show="c.repliesI !== 0"
								@click="changeReplyPage(comment, c.repliesI - 1)"
							>上一页</a>
							<!-- 前补 -->
							<template v-if="2 < c.repliesI">
								<!-- 第一页 -->
								<a
									href="javascript:;"
									class="page"
									@click="changeReplyPage(comment, 0)"
								>1</a>
								<!-- 如果激活页大于 3，省略中间页，效果：1 .. 4 5 6 -->
								<span
									class="light-gray"
									v-show="3 < c.repliesI"
								>..</span>
							</template>
							<!-- 中间页数，页数小于 2 时扩充遍历（已经看不懂了） -->
							<template v-for="i in (c.repliesI < 2 ? 7 - c.repliesI : 5)">
								<a
									href="javascript:;"
									:key="i"
									:class="`page${c.repliesI === i + c.repliesI - 3 ? ' active' : ''}`"
									v-text="i + c.repliesI - 2"
									v-if="0 < i + c.repliesI - 2 && i + c.repliesI - 3 < l(comment)"
									@click="changeReplyPage(comment, i + c.repliesI - 3)"
								></a>
							</template>
							<!-- 后补 -->
							<template v-if="5 < l(comment) && c.repliesI < l(comment) - 3">
								<!-- 如果激活页小于总页数 - 3，省略中间页，效果 1 2 3 4 .. 7 -->
								<span
									class="light-gray"
									v-show="c.repliesI < l(comment) - 4"
								>..</span>
								<!-- 最后一页 -->
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
								v-show="c.repliesI < Math.floor(c.repliesLength / 6)"
								@click="changeReplyPage(comment, c.repliesI + 1)"
							>下一页</a>
						</div>
						<!-- 回复表单 -->
						<div class="reply" v-if="activeReply === c.id">
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
								<a class="reply-cancel" href="javascript:;" @click="activeReply = -1">取消</a>
								<div class="captcha-box">
									<text-field
										v-model:value="captchaCR"
										placeholder="验证码"
										:isEnableTips="false"
									></text-field>
									<div>
										<captcha ref="captchaCR" :width="74" :height="24" from="COMMENT_REPLY" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<loading :isFinished="isLoadFinished" :finishText="'已加载所有评论 (◡ ᴗ ◡ ✿)'" :refreshEvent="getComments" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { toDateTime } from '@/helpers/UnixTime';
import { resURL } from '@/helpers/Toolkit';
import CommentAPI from '@/api/CommentAPI';
import { Comment, CommentReply } from '@/type/Comment';
import TextField from '@/components/TextInput/TextField.vue';
import TextRegion from '@/components/TextInput/TextRegion.vue';
import Loading from '@/components/Loading.vue';
import Captcha from '@/components/Captcha.vue';

export default defineComponent({
	components: {
		Loading,
		Captcha,
		TextField,
		TextRegion
	},
	props: {
		aid: {
			type: Number,
			requied: true
		}
	},
	data(): {
		activeReply: number; // 激活的回复，-1 为不显示在任何位置

		comment: Comment;
		comments: Comment[];
		captchaC: string;
		captchaCR: string;
		commentReply: CommentReply;
		isLoadFinished: boolean;
		} {
		return {
			activeReply: -1,

			// 评论
			comment: {
				articleId: this.aid,
				nick: '',
				data: ''
			},
			comments: [],
			captchaC: '',
			// 回复
			captchaCR: '',
			commentReply: {
				commentId: -1,
				senderId: undefined,
				receiverId: undefined,
				senderNick: '',
				receiverNick: '',
				data: ''
			},

			isLoadFinished: false
		};
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
		resURL(url: string): string {
			return resURL(url);
		},
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
			const result = await CommentAPI.createComment(this.comment, this.captchaC);
			this.captchaC = '';
			(this.$refs.captchaC as any).update();
			if (result) {
				this.comments.unshift(result);
			}
		},
		// 触发回复表单
		replyTo(cid: number, receiverNick = '') {
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
			const result = await CommentAPI.createCommentReply(this.commentReply, this.captchaCR);
			this.captchaCR = '';
			(this.$refs.captchaCR as any).update();
			if (result) {
				const comment = this.comments.find(comment => {
					return comment.id === result.commentId;
				});
				if (comment) {
					if (comment.repliesLength !== undefined) {
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
	},
	beforeUnmount() {
		this.$store.state.scroller.remove('Comment');
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
		border: 1px solid #FAC7D4;
		padding: 1px 22px 2px 22px;
		font-size: 15px;
		margin-right: 6px;
	}

	.comment-commit:hover {
		background: #EED7D7;
	}

	.comment-commit:active {
		background: #FFE0DF;
	}

	.captcha-box {
		width: 80px;
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
		padding: 6px 0 6px 12px;
	}

	.comment-sub:nth-child(n + 2) {
		border-top: 1px #d7d7d7 dotted;
	}

	.comment-sub:first-child {
		border-top: 2px solid #E4EFFA;
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
		border: 1px solid #FAC7D4;
		background: transparent;
		margin-bottom: 4px;
	}

	.reply-ctrl {
		width: 90%;
		display: flex;
    	align-items: center;
		margin-left: -8px;
	}

	.reply-commit {
		border: 1px solid #FAC7D4;
		padding: 4px 16px;
		background: #EFEFEF;
		border-radius: 2px;
	}

	.reply-commit:hover {
		background: #EED7D7;
	}

	.reply-commit:active {
		background: #FFE0DF;
	}

	.reply-cancel {
		padding: 2px 4px;
		margin: 0 6px;
	}

	@media screen and (max-width: 900px) {
		.write-container {
			width: 90%;
		}
	}
</style>