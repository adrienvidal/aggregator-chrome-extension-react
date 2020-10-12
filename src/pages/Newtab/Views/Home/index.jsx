import React, { useEffect, useRef, useState } from 'react'
import {
	Container, Row, Form, Button,
} from 'react-bootstrap'
import {BrowserStoreApi} from 'Api/browserStore'
import BookmarksList from './BookmarksList'

export default function Newtab() {
	const [aggregatorBookmarks, setAggregatorBookmarks] = useState(undefined)
	const linkRef = useRef(null)

	// get boorkmarks
	async function getAggregatorBookmarks() {
		const remoteAggregatorBookmarks = await BrowserStoreApi.get()
		if (JSON.stringify(remoteAggregatorBookmarks) !== JSON.stringify(aggregatorBookmarks)) {
			setAggregatorBookmarks(remoteAggregatorBookmarks)
		}
	}

	// post bookmarks
	async function onClick(e) {
		e.preventDefault()
		await BrowserStoreApi.post(linkRef.current.value)
		getAggregatorBookmarks()

		// reset form
		linkRef.current.value = null
	}

	// clear bookmarks
	const clear = (e) => {
		e.preventDefault()
		BrowserStoreApi.clearAll()
		getAggregatorBookmarks()
	}

	useEffect(() => {
		getAggregatorBookmarks()
	})

	return (
		<div className="home">

			<Form className="mb-3">
				<Form.Group controlId="formBasicEmail">
					<Form.Control
						ref={linkRef}
						type="text"
						placeholder="Add Bookmarks"
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

			<BookmarksList aggregatorBookmarks={aggregatorBookmarks} />

		</div>
	)
}
