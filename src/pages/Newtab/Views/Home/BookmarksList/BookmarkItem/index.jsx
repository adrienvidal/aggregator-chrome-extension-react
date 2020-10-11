import React from 'react'
import {
	Card, Button,
} from 'react-bootstrap'
import './styles.scss'

export default function BookmarkItem({aggregatorBookmark}) {
	return (
		<Card className="mb-3">
			<div className="img-wrapper">
				<img src={aggregatorBookmark.image} />
			</div>
			<Card.Body>
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
