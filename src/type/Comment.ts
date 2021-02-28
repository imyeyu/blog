import { Model } from './Model';

// 评论
export type Comment = {
	articleId?: number;
	userId?: number;
	nick?: string;
	data?: string;

	repliesI?: number;
	repliesLength?: number;   // 回复总数
	replies?: CommentReply[]; // 前 6 条回复
} & Model

// 回复
export type CommentReply = {
	commentId: number;
	senderId?: number;
	receiverId?: number;
	senderNick?: string;
	receiverNick?: string;
	data?: string;
} & Model