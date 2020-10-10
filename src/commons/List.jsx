import React from 'react'

// list with bootstrap
export default function List(data) {
	return (
		<ul className="list-group">
			{data.map((item) => {
				if (item.children) {
					return (
						<li className="folder list-group-item">
							<span>{item.title}</span>
							<ul className="list-group">
								{List(item.children)}
							</ul>
						</li>
					)
				}
				return (
					<li className="bookmark list-group-item">{item.title}</li>
				)
			})}
		</ul>
	)
}
