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
						{aggregatorBookmarks.map((aggregatorBookmark) => (
							<Col sm={3}>
								<BookmarkItem
									aggregatorBookmark={aggregatorBookmark}
									key={aggregatorBookmark.id}
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
