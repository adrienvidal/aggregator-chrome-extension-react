export async function getMetaDataLink(link) {
	const response = await fetch(`https://cors-anywhere.herokuapp.com/${link}`, {
		method: 'GET',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
		},
	})

	const resData = await response.text()

	const myDiv = document.createElement('div')
	myDiv.innerHTML = resData

	const metaTitle = myDiv.querySelector('title')
	const metaImage = myDiv.querySelector('meta[property="og:image"]')

	const metaData = {
		title: metaTitle ? metaTitle.innerText : null,
		image: metaImage ? metaImage.content : null,
	}

	return metaData
}
