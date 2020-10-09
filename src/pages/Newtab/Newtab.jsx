import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import Card from './Card'

const Newtab = () => {
	const [bookmarks, setBookmarks] = useState(null)

	const getBookmarks = () => {
		// chrome.bookmarks

		chrome.bookmarks.getTree(
			(bookmarkTreeNodes) => {
				// console.log('bookmarkTreeNodes', bookmarkTreeNodes[0].children[0].children)

				setBookmarks(bookmarkTreeNodes[0].children[0].children.map((folder) => folder))
				// $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query))
			}
		)
	}

	useEffect(() => {
		// console.log('componentDidMount')
		getBookmarks()

		return () => {
			// console.log('componentWillUnmount')
		}
	}, [])

	// console.log('bookmarks', bookmarks)

	return (
		<div className="App">
			<div className="container">
				<h1>Aggregator!!</h1>

				{bookmarks && bookmarks.map((bookmark) => (
					<Card
						bookmark={bookmark}
						key={bookmark.id}
					/>
				))}

			</div>
		</div>
	)
}

export default Newtab
