import React from 'react'
import {
	Card, Button,
} from 'react-bootstrap'
import './styles.scss'

export default function BookmarkItem({aggregatorBookmark, deleteItem}) {
	const defaultImage = 'https://images.unsplash.com/photo-1602444307048-952df9146135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80'

	const onAction = (e) => {
		e.preventDefault()

		deleteItem(aggregatorBookmark.id)
	}

	return (
		<Card
			className="mb-3"
		>
			<div
				className="img-wrapper"
				onClick={() => window.open(aggregatorBookmark.link)}
			>
				<img
					src={aggregatorBookmark.image || defaultImage}
					alt="img"
				/>
			</div>
			<Card.Body>
				<Card.Title onClick={() => window.open(aggregatorBookmark.link)}>{aggregatorBookmark.title}</Card.Title>
				<Card.Text>
					{aggregatorBookmark.description}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Button
					variant="dark"
					type="button"
					onClick={(e) => onAction(e)}
				>
					Delete
				</Button>
			</Card.Footer>
		</Card>
	)
}
