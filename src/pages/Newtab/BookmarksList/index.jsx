import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'

export default function BookmarksList({aggregatorBookmarks}) {
	// const [aggregatorBookmarks, setAggregatorBookmarks] = useState(null)

	console.log('BookmarksList', aggregatorBookmarks)

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
