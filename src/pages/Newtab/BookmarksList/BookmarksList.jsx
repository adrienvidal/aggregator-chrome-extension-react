import React, { useEffect, useRef, useState } from 'react'
import { getBookmarksApi } from '../../../api/bookmarks'
import List from '../../../commons/List'
// import Card from './Card'

const BookmarksList = () => {
	const [bookmarks, setBookmarks] = useState(null)

	async function getBookmarks() {
		setBookmarks(await getBookmarksApi())
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
