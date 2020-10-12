class FavoritesManager {
	get() {
		return new Promise((resolve) => {
			chrome.bookmarks.getTree(
				(bookmarkTreeNodes) => {
					resolve(bookmarkTreeNodes[0].children[0].children)
				}
			)
		})
	}
}

export const FavoritesManagerApi = new FavoritesManager()
