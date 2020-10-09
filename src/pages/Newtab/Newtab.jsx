import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import Card from './Card'

const Newtab = () => {
	const getBookmarks = () => {}

	useEffect(() => {
		console.log('componentDidMount')
		return () => {
			console.log('componentWillUnmount')
		}
	}, [])

	return (
		<div className="App">
			<div className="container">
				<h1>Aggregator!!!</h1>

				<Card />
			</div>
		</div>
	)
}

export default Newtab
