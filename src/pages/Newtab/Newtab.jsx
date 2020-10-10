import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import {
	Container, Row, Form, Button,
} from 'react-bootstrap'
import {saveInBrowserStore} from '../../api/bookmarks'

const Newtab = () => {
	const linkRef = useRef(null)

	const onClick = (e) => {
		e.preventDefault()
		const url = linkRef.current.value

		// must be url
		const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
		const regex = new RegExp(expression)

		if (url.match(regex)) {
			saveInBrowserStore(linkRef.current.value)
		}
	}

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
					</Form>
				</Row>

			</Container>
		</div>
	)
}

export default Newtab
