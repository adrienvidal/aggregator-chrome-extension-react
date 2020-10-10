export function getBookmarksApi() {
	return new Promise((resolve) => {
		chrome.bookmarks.getTree(
			(bookmarkTreeNodes) => {
				resolve(bookmarkTreeNodes[0].children[0].children)
			}
		)
	})
}
