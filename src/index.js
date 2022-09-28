const URL = 'http://localhost:3000/ramens'

const fetchRamen = () => {
    fetch(URL)
    .then(resp=>resp.json())
    .then(data=>renderMenu(data))
}

const renderMenu = ramens => {
    const menuDiv = document.getElementById('ramen-menu')
    ramens.forEach(ramen => {
        const img = document.createElement('img')
        img.src = ramen.image
        menuDiv.append(img)
        img.addEventListener('click', e => {
            console.log(ramen.name)
            const container = document.getElementById('ramen-detail')
            const bigImg = document.querySelector('.detail-image')
            const name = document.querySelector('.name')
            const restaurant = document.querySelector('.restaurant')
            const rating = document.querySelector('#rating-display')
            const comment = document.querySelector('#comment-display')

            name.textContent = ramen.name
            restaurant.textContent = ramen.restaurant

            rating.textContent = parseInt(ramen.rating)
            comment.textContent = ramen.comment

            bigImg.src = ramen.image
            container.append(bigImg, name, restaurant)

        })
    })
}

const ramenForm = () => {
    const form = document.querySelector('#new-ramen')
    form.addEventListener('submit', e => {
        e.preventDefault()
        
        const newContainer = document.createElement('div')
        const newName = document.createElement('h2')
        const newRest = document.createElement('h3')
        const newImage = document.createElement('img')
        const newRating = document.createElement('span')
        const newComment = document.createElement('p')

        
        newName.textContent = e.target[0].value
        newRest.textContent = e.target[1].value
        newImage.src = e.target[2].value
        newRating.textContent = e.target[3].value
        newComment.textContent = e.target[4].value
        
        const newRamen = {
            name: newName,
            restaurant: newRest,
            image: newImage,
            rating: newRating,
            comment: newComment
        }
        postRamen(newRamen)

    })

}
const postRamen = newRamen => {
    const config ={
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(newRamen)
    }

    fetch(URL, config)
    .then(resp => resp.json())
    .then(json=>console.log(json))
}



fetchRamen()
ramenForm()