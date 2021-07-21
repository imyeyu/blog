import axios from 'axios';
import { Comment, CommentReply } from '@/type/Comment';

async function getComments(articleId: number, offset: number): Promise<Comment[]> {
	return axios.get(`/comment?articleId=${articleId}&offset=${offset}`);
}

async function createComment(comment: Comment, captcha: string): Promise<Comment> {
	return axios.post('/comment', { data: comment, captcha });
}

async function getCommentReplies(commentId: number, offset: number): Promise<CommentReply[]> {
	return axios.get(`/comment/reply?commentId=${commentId}&offset=${offset}`);
}

async function createCommentReply(commentReply: CommentReply, captcha: string): Promise<CommentReply> {
	return axios.post('/comment/reply', { data: commentReply, captcha });
}

export default {
	getComments,
	getCommentReplies,
	createComment,
	createCommentReply
};