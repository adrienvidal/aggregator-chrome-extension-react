import React from 'react'
import {
	Card, Button,
} from 'react-bootstrap'

export default function BookmarkItem({aggregatorBookmark}) {
	return (
		<Card>
			<Card.Body>
				<Card.Img
					variant="top"
					src={aggregatorBookmark.image}
				/>
				<Card.Title>{aggregatorBookmark.title}</Card.Title>
				<Card.Text>
					{aggregatorBookmark.description}
				</Card.Text>
				<Button
					variant="primary"
					onClick={() => window.open(aggregatorBookmark.link)}
				>
					Go somewhere
				</Button>
			</Card.Body>
		</Card>
	)
}
