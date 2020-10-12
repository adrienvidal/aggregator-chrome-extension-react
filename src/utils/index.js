export async function getMetaDataLink(link) {
	const response = await fetch(`https://cors-anywhere-145236.herokuapp.com/${link}`, {
		method: 'GET',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
		},
	})
	const resData = await response.text()

	// create htmlElem to get meta infos
	const myDiv = document.createElement('div')
	myDiv.innerHTML = resData
	const metaTitle = myDiv.querySelector('title')
	const metaDescription = myDiv.querySelector('meta[property="og:description"]')
	const metaImage = myDiv.querySelector('meta[property="og:image"]')

	const metaData = {
		title: metaTitle ? metaTitle.innerText : null,
		description: metaDescription ? metaDescription.content : null,
		image: metaImage ? metaImage.content : null,
	}

	return metaData
}
