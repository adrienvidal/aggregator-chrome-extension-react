import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import Card from './Card'

const Newtab = () => {
	const [bookmarks, setBookmarks] = useState(null)

	const getBookmarks = () => {
		chrome.bookmarks.getTree(
			(bookmarkTreeNodes) => {
				setBookmarks(bookmarkTreeNodes[0].children[0].children.map((folder) => folder))
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

	const uiBookmarks = (list) => list.map((item) => {
		if (item.children) {
			return (
				<li className="folder list-group-item">
					<span>{item.title}</span>
					<ul className="list-group">
						{uiBookmarks(item.children)}
					</ul>
				</li>
			)
		}
		return (
			<li className="bookmark list-group-item">{item.title}</li>
		)
	})

	// console.log('bookmarks', bookmarks)

	return (
		<div className="App">
			<div className="container">
				<h1>Aggregator!!</h1>

				{bookmarks && (
					<ul className="list-group">
						{uiBookmarks(bookmarks)}
					</ul>
				)}

			</div>
		</div>
	)
}

export default Newtab
