

const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
document.addEventListener('DOMContentLoaded',()=>{
    dataFetch()
})

const dataFetch = async () =>{
    try{
        const res = await fetch('http://127.0.0.1:8080/products/all')
        const data = await res.json()
        console.log(data)
        pintarCards(data)
    }
    catch{

    }
}

const pintarCards = data =>{
    data.forEach(producto => {
        console.log(producto.url_img)
        templateCard.querySelector('h5').textContent = producto.name
        templateCard.querySelector('p').textContent = producto.price
        templateCard.querySelector('img').setAttribute('src', producto.url_image? producto.url_image : 'https://ih1.redbubble.net/image.1861329650.2941/fposter,small,wall_texture,product,750x1000.jpg')

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
}
