import React from 'react'
import {
	Card, Button,
} from 'react-bootstrap'
import './styles.scss'

export default function BookmarkItem({aggregatorBookmark}) {
	const defaultImage = 'https://images.unsplash.com/photo-1602444307048-952df9146135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80'

	return (
		<Card
			className="mb-3"
			onClick={() => window.open(aggregatorBookmark.link)}
		>
			<div className="img-wrapper">
				<img
					src={aggregatorBookmark.image || defaultImage}
					alt="img"
				/>
			</div>
			<Card.Body>
				<Card.Title>{aggregatorBookmark.title}</Card.Title>
				<Card.Text>
					{aggregatorBookmark.description}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}
