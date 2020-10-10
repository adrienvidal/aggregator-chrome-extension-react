import React, { useEffect, useRef, useState } from 'react'
import './Newtab.scss'
import {Container, Row} from 'react-bootstrap'
import { getBookmarksApi } from '../../api/bookmarks'
import List from '../../commons/List'
import BookmarksList from './BookmarksList/BookmarksList'
// import Card from './Card'

const Newtab = () => (
	<div className="App">
		<Container>
			<Row>
				<h1>Aggregator!!!</h1>
				<BookmarksList />
			</Row>

		</Container>
	</div>
)

export default Newtab
