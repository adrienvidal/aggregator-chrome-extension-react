import {getMetaDataLink} from 'Utils'

class BrowserStore {
	get() {
		return new Promise((resolve) => {
			chrome.storage.local.get('aggregatorBookmarks', (result) => {
				const {aggregatorBookmarks} = result

				console.log('aggregatorBookmarks', aggregatorBookmarks)
				resolve(aggregatorBookmarks)
			})
		})
	}

	post(link) {
		return new Promise((resolve) => {
			chrome.storage.local.get('aggregatorBookmarks', (result) => {
				// step 1: must be link
				const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
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

						getMetaDataLink(link).then((res) => {
							aggregatorBookmarks.push({
								id: aggregatorBookmarks.length + 1,
								link,
								title: res.title,
								description: res.description,
								image: res.image,
							})

							// step 3: push chrome storage
							chrome.storage.local.set({aggregatorBookmarks}, () => {
								resolve(true)
							})
						})
					} else {
						console.log('Already in bookmarks')
					}
				} else {
					// create 'aggregatorBookmarks'
					getMetaDataLink(link).then((res) => {
						aggregatorBookmarks = [
							{
								id: 1,
								link,
								title: res.title,
								description: res.description,
								image: res.image,
							},
						]

						// step 3: push chrome storage
						chrome.storage.local.set({aggregatorBookmarks}, () => {
							resolve(true)
						})
					})
				}
			})
		})
	}

	clearAll() {
		chrome.storage.local.remove('aggregatorBookmarks')
	}
}

export const BrowserStoreApi = new BrowserStore()