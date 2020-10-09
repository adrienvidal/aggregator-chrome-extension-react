import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import Card from './Card'

const Newtab = () => {
	const [bookmarks, setBookmarks] = useState(null)

	const getBookmarks = () => {
		// chrome.bookmarks

		chrome.bookmarks.getTree(
			(bookmarkTreeNodes) => {
				// console.log('bookmarkTreeNodes', bookmarkTreeNodes[0].children[0].children)

				setBookmarks(bookmarkTreeNodes[0].children[0].children.map((folder) => folder))
				// $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query))
			}
		)
	}

	useEffect(() => {
		// console.log('componentDidMount')
		getBookmarks()

		return () => {
			// console.log('componentWillUnmount')
		}
	}, [])

	// console.log('bookmarks', bookmarks)

	return (
		<div className="App">
			<div className="container">
				<h1>Aggregator</h1>

				{bookmarks && (
					<ul>
						{bookmarks.map((parent) => {
							console.log('bookmark', parent)

							if (parent.children) {
								return (
									<li className="folder">
										<span>{parent.title}</span>
										<ul>
											{parent.children.map((child) => {
												if (child.children) {
													return (
														<li className="folder">
															<span>{child.title}</span>
															<ul>
																{child.children.map((grandChild) => {
																	if (grandChild.children) {
																		return (
																			<li className="folder">
																				<span>{grandChild.title}</span>
																				{/* <ul>
																					{grandChild.children.map((grandGrandChild) => {

																					})}
																				</ul> */}
																			</li>
																		)
																	}
																	return (
																		<li className="bookmark">{grandChild.title}</li>
																	)
																})}
															</ul>
														</li>
													)
												}
												return (
													<li className="bookmark">{child.title}</li>
												)
											})}
										</ul>
									</li>
								)
							}
							return (
								<li className="bookmark">{parent.title}</li>
							)
						})}
					</ul>
				)}

			</div>
		</div>
	)
}

export default Newtab
