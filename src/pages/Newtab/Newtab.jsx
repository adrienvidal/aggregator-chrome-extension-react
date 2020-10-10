import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import { getBookmarksApi } from '../../api/bookmarks'
import List from '../../commons/List'
// import Card from './Card'

const Newtab = () => {
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

	return (
		<div className="App">
			<div className="container">
				<h1>Aggregator!!</h1>

				{bookmarks && List(bookmarks)}

			</div>
		</div>
	)
}

export default Newtab
