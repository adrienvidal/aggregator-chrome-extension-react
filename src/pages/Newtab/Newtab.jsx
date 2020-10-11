import React from 'react'
import './Newtab.scss'
import {
	Container, Row,
} from 'react-bootstrap'

import Home from './Views/Home'

const Newtab = () => (
	<div className="App">
		<Container>
			<h1>Aggregator</h1>
			<Home />

		</Container>
	</div>
)

export default Newtab
