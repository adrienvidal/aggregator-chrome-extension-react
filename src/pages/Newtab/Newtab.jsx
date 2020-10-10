import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import {Container, Row} from 'react-bootstrap'
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
			<Container>
				<Row>
					<h1>Aggregator!!</h1>

					{bookmarks && List(bookmarks)}
				</Row>

			</Container>
		</div>
	)
}

export default Newtab
