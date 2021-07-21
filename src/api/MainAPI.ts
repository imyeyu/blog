import axios from 'axios';
import { FriendChain } from '@/type/FriendChain';
import { GithubCommit } from '@/type/GithubCommit';

/**
 * GitHub 仓库提交记录
 *
 * @param user  用户
 * @param repos 仓库
 * @returns 提交记录
 */
async function getGithubCommits(user: string, repos: string): Promise<GithubCommit[]> {
	return axios.get(`/github/${user}/${repos}`);
}

/** @returns 友链 */
async function getFriendChains(): Promise<FriendChain[]> {
	return axios.get('/friend-chain');
}

export default {
	getFriendChains,
	getGithubCommits
};