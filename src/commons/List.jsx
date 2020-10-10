import React from 'react'

// list with bootstrap
export default function List(data) {
	return (
		<ul className="list-group">
			{data.map((item) => {
				if (item.children) {
					return (
						<li
							className="folder list-group-item"
							key={item.id}
							data-id={item.id}
						>
							<span>{item.title}</span>
							{List(item.children)}
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
