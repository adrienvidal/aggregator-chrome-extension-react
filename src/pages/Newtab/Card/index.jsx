import React from 'react'

export default function index(bookmark) {
	console.log('bookmark', bookmark)

	return <div>{bookmark.bookmark.title}</div>
}
