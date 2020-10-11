import React, { useEffect, useRef, useState } from 'react'
import {getInBrowserStore} from '../../../api/bookmarks'
import Card from './Card'

export default function BookmarksList() {
	const [aggregatorBookmarks, setAggregatorBookmarks] = useState(null)

	async function getAggregatorBookmarks() {
		setAggregatorBookmarks(await getInBrowserStore())
	}

	useEffect(() => {
		getAggregatorBookmarks()
	})

	return (
		<div className="bookmarks-list">
			<h2>
				BookmarksList
			</h2>

			<div className="bookmarks-list-content">
				{aggregatorBookmarks ? aggregatorBookmarks.map((Bookmark) => <Card bookmark={Bookmark} />) : <p>No bookmarks yet...</p> }
			</div>
		</div>
	)
}
