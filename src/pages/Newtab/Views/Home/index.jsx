import React, { useEffect, useRef, useState } from 'react'
import {
	Container, Row, Form, Button, Modal,
} from 'react-bootstrap'
import {BrowserStoreApi} from 'Api/browserStore'
import BookmarksList from './BookmarksList'

export default function Newtab() {
	const [aggregatorBookmarks, setAggregatorBookmarks] = useState(undefined)
	const [showModal, setShowModal] = useState(false)

	const linkRef = useRef(null)

	// modal
	const toggleModal = () => setShowModal(!showModal)

	// get boorkmarks
	function getAggregatorBookmarks() {
		BrowserStoreApi.get().then((data) => {
			if (JSON.stringify(data) !== JSON.stringify(aggregatorBookmarks)) {
				setAggregatorBookmarks(data)
			}
		})
	}

	// post bookmarks
	function onSubmit(e) {
		e.preventDefault()
		BrowserStoreApi.post(linkRef.current.value).then(() => {
			getAggregatorBookmarks()

			// reset form
			linkRef.current.value = null
		})
	}

	const deleteItem = (id) => {
		BrowserStoreApi.delete(id).then(() => {
			getAggregatorBookmarks()
		})
	}

	// clear bookmarks
	const clear = (e) => {
		e.preventDefault()
		BrowserStoreApi.clearAll()
		getAggregatorBookmarks()
	}

	const exportJson = async (e) => {
		e.preventDefault()

		toggleModal()
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
					onClick={(e) => onSubmit(e)}
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
				<Button
					variant="success"
					type="submit"
					onClick={(e) => exportJson(e)}
				>
					Export Json
				</Button>
			</Form>

			<BookmarksList
				aggregatorBookmarks={aggregatorBookmarks}
				deleteItem={deleteItem}
			/>

			<Modal
				show={showModal}
				onHide={toggleModal}
			>
				<Modal.Header closeButton>
					<Modal.Title>Export Your Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						as="textarea"
						rows={3}
						style={{height: '80vh'}}
						defaultValue={JSON.stringify(aggregatorBookmarks, null, 2)}
					/>
				</Modal.Body>
			</Modal>

		</div>
	)
}
