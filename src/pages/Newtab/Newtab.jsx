import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import {
	Container, Row, Form, Button,
} from 'react-bootstrap'
// import Card from './Card'

const Newtab = () => {
	const urlRef = useRef(null)
	const onSubmit = (e) => {
		e.preventDefault()
		const url = urlRef.current.value

		// must be url
		const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
		const regex = new RegExp(expression)

		if (url.match(regex)) {
			alert(urlRef.current.value)
		} else {
			alert('Must be url')
		}

		/* onSubmitAction({
			civility: civilityData,
			lastname: lastNameRef.current.value,
			firstname: firstNameRef.current.value,
			email: emailRef.current.value,
			country: 'undefined',
			magazine: 'undefined',
			position: 'undefined',
		}) */
	}

	return (
		<div className="App">
			<Container>
				<Row>
					<h1>Aggregator!!</h1>
				</Row>
				<Row>
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Add Bookmarks</Form.Label>
							<Form.Control
								ref={urlRef}
								type="text"
								placeholder="url"
							/>
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							onClick={(e) => onSubmit(e)}
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
