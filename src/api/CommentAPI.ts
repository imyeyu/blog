import axios from 'axios';
import { CreateResult } from '@/type/Request';
import { Comment, CommentReply } from '@/type/Comment';

async function getComments(articleId: number, offset: number): Promise<Comment[]> {
    return axios.get(`/comment?articleId=${articleId}&offset=${offset}`);
}

async function createComment(comment: Comment, captcha: string): Promise<CreateResult> {
    return axios.post(`/comment`, { t: comment, captcha });
}

async function getCommentReplies(commentId: number, offset: number): Promise<CommentReply[]> {
    return axios.get(`/comment/reply?commentId=${commentId}&offset=${offset}`);
}

async function createCommentReply(commentReply: CommentReply): Promise<CommentReply> {
    return axios.post(`/comment/reply`, commentReply);
}

export default {
	getComments,
	getCommentReplies,
	createComment,
	createCommentReply
};