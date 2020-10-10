import React from 'react'
import {ListGroup} from 'react-bootstrap'

// list with bootstrap
export default function List(data) {
	return (
		<ListGroup>
			{data.map((item) => {
				if (item.children) {
					return (
						<ListGroup.Item
							key={item.id}
							data-id={item.id}
						>
							<span>{item.title}</span>
							{List(item.children)}
						</ListGroup.Item>
					)
				}
				return (
					<li className="bookmark list-group-item">{item.title}</li>
				)
			})}
		</ListGroup>
	)
}
