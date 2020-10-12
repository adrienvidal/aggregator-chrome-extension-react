import React, { useEffect, useRef, useState } from 'react'
import {
	Container, Row, Col,
} from 'react-bootstrap'
import BookmarkItem from './BookmarkItem'

export default function BookmarksList({aggregatorBookmarks}) {
	// const [aggregatorBookmarks, setAggregatorBookmarks] = useState(null)

	return (
		<div className="bookmarks-list">
			<div className="bookmarks-list-content">

				{aggregatorBookmarks ? (
					<Row>
						{aggregatorBookmarks.slice(0).reverse().map((aggregatorBookmark) => (
							<Col
								sm={3}
								key={aggregatorBookmark.id}
							>
								<BookmarkItem
									aggregatorBookmark={aggregatorBookmark}
								/>
							</Col>
						)) }
					</Row>
				)
					: <p>No bookmarks yet...</p>}

			</div>
		</div>
	)
}
