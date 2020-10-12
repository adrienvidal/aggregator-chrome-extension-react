import React, { useEffect, useRef, useState } from 'react'
import { FavoritesManagerApi } from 'Api/favoritesManager'
import List from './List'
// import Card from './Card'

export default function BookmarksManagerList() {
	const [bookmarks, setBookmarks] = useState(null)

	async function getBookmarks() {
		setBookmarks(await FavoritesManagerApi.get())
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
