import axios from 'axios';
import { GithubCommit } from '@/type/GithubCommit';

async function getGithubCommits(user: string, repos: string): Promise<GithubCommit[]> {
	return axios.get(`/github/${user}/${repos}`);
}

export default {
	getGithubCommits
};