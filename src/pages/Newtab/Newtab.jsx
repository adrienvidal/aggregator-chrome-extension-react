import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import {
	Container, Row, Form, Button,
} from 'react-bootstrap'
import {postInBrowserStore, clearBrowserStore} from '../../api/bookmarks'

const Newtab = () => {
	const linkRef = useRef(null)

	const onClick = (e) => {
		e.preventDefault()
		postInBrowserStore(linkRef.current.value)

		// reset form
		linkRef.current.value = null
	}

	const clear = (e) => {
		e.preventDefault()
		clearBrowserStore()
	}

	return (
		<div className="App">
			<Container>
				<Row>
					<h1>Aggregator!</h1>
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

			</Container>
		</div>
	)
}

export default Newtab
