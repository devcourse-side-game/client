export function getTimeAgo(dateString: string): string {
	if (!dateString) return 'NoDate';
	const date = new Date(dateString);
	const now = new Date();
	const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
	if (diff < 60) return `${diff}초 전`;
	if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
	if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
	return date.toLocaleDateString();
}
