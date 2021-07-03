// Github 提交更新对象
export type GithubCommit = {
	msg: number;
    url: number;

	committer: GithubCommitter;
};
// Github 提交更新者
export type GithubCommitter = {
	name: string;
	commitedAt: number;
}