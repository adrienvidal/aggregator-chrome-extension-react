import React, { useEffect, useRef, useState } from 'react'
import { getBookmarksFromFavoritesManager } from '../../../api/bookmarks'
import List from './List'
// import Card from './Card'

const BookmarksList = () => {
	const [bookmarks, setBookmarks] = useState(null)

	async function getBookmarks() {
		setBookmarks(await getBookmarksFromFavoritesManager())
	}

	useEffect(() => {
		console.log('componentDidMount')
		getBookmarks()

		return () => {
			console.log('componentWillUnmount')
		}
	}, [])

	// console.log('bookmarks', bookmarks)

	if (bookmarks) {
		return List(bookmarks)
	}
	return null
}

export default BookmarksList
