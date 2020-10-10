export function getBookmarksFromFavoritesManager() {
	return new Promise((resolve) => {
		chrome.bookmarks.getTree(
			(bookmarkTreeNodes) => {
				resolve(bookmarkTreeNodes[0].children[0].children)
			}
		)
	})
}

export function saveInBrowserStore(link) {
	console.log(link)

	chrome.storage.local.set({key: link}, () => {
		console.log(`Value is set to ${link}`)
	})

	chrome.storage.local.get(null, (items) => {
		const allKeys = Object.keys(items)
		console.log(items)
	})
}

/* chrome.storage.local.set({key: value}, () => {
	console.log(`Value is set to ${value}`)
})

chrome.storage.local.get(['key'], (result) => {
	console.log(`Value currently is ${result.key}`)
}) */

/* chrome.storage.local.get({userKeyIds: []}, function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    var userKeyIds = result.userKeyIds;
    userKeyIds.push({keyPairId: keyPairId, HasBeenUploadedYet: false});
    // set the new array value to the same key
    chrome.storage.local.set({userKeyIds: userKeyIds}, function () {
        // you can use strings instead of objects
        // if you don't  want to define default values
        chrome.storage.local.get('userKeyIds', function (result) {
            console.log(result.userKeyIds)
        });
    });
}); */
