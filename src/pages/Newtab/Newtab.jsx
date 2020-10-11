import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import {
	Container, Row, Form, Button,
} from 'react-bootstrap'
import {postInBrowserStore, clearBrowserStore, getInBrowserStore} from 'Api/bookmarks'
import BookmarksList from './BookmarksList'

const Newtab = () => {
	const [aggregatorBookmarks, setAggregatorBookmarks] = useState(undefined)
	const linkRef = useRef(null)

	// get boorkmarks
	async function getAggregatorBookmarks() {
		const remoteAggregatorBookmarks = await getInBrowserStore()
		if (JSON.stringify(remoteAggregatorBookmarks) !== JSON.stringify(aggregatorBookmarks)) {
			setAggregatorBookmarks(remoteAggregatorBookmarks)
		}
	}

	// post bookmarks
	async function onClick(e) {
		e.preventDefault()
		await postInBrowserStore(linkRef.current.value)
		getAggregatorBookmarks()

		// reset form
		linkRef.current.value = null
	}

	// clear bookmarks
	const clear = (e) => {
		e.preventDefault()
		clearBrowserStore()
		getAggregatorBookmarks()
	}

	useEffect(() => {
		getAggregatorBookmarks()
	})

	return (
		<div className="App">
			<Container>
				<Row>
					<h1>Aggregator</h1>
				</Row>
				<Row>
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Add Bookmarks</Form.Label>
							<Form.Control
								ref={linkRef}
								type="text"
								placeholder="url"
							/>
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							onClick={(e) => onClick(e)}
						>
							Submit
						</Button>
						<Button
							variant="secondary"
							type="submit"
							onClick={(e) => clear(e)}
						>
							Clear Browser Store
						</Button>
					</Form>
				</Row>
				<Row>
					<BookmarksList aggregatorBookmarks={aggregatorBookmarks} />
				</Row>

			</Container>
		</div>
	)
}

export default Newtab
