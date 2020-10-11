import {getMetaDataLink} from 'Utils'

export function getBookmarksFromFavoritesManager() {
	return new Promise((resolve) => {
		chrome.bookmarks.getTree(
			(bookmarkTreeNodes) => {
				resolve(bookmarkTreeNodes[0].children[0].children)
			}
		)
	})
}

export function getInBrowserStore() {
	return new Promise((resolve) => {
		chrome.storage.local.get('aggregatorBookmarks', (result) => {
			const {aggregatorBookmarks} = result
			resolve(aggregatorBookmarks)
		})
	})
}

export function postInBrowserStore(link) {
	return new Promise((resolve) => {
		chrome.storage.local.get('aggregatorBookmarks', (result) => {
			// step 1: must be link
			const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
			const regex = new RegExp(expression)
			if (!link.match(regex)) {
				alert('Not an url')
				return null
			}

			// step 2: push local
			let {aggregatorBookmarks} = result
			if (aggregatorBookmarks) {
				const isLinkExist = aggregatorBookmarks.some((el) => el.link === link)
				if (!isLinkExist) {
					// push entry

					getMetaDataLink()

					aggregatorBookmarks.push({
						id: aggregatorBookmarks.length + 1,
						link,
					})
				} else {
					alert('Already in bookmarks')
				}
			} else {
				// create 'aggregatorBookmarks'
				aggregatorBookmarks = [
					{
						id: 1,
						link,
					},
				]
			}

			// step 3: push chrome storage
			chrome.storage.local.set({aggregatorBookmarks}, () => {
				resolve(true)
			})
		})
	})
}

export function clearBrowserStore() {
	chrome.storage.local.remove('aggregatorBookmarks')
}
