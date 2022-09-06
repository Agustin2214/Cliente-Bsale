const modo = 'produccion'


const urlimgnotfound = 'https://ih1.redbubble.net/image.1861339560.3228/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg'
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const templateNotfound = document.getElementById('template-notfound').content

const category = document.getElementById('category')
const templateCategory= document.getElementById('template-category').content
const inputBuscar = document.getElementById('buscar')
const selectores = document.getElementById('selectores')
let carrito = {}

category.addEventListener('click', e =>{
    if(e.target.classList.contains('licategory')){
        dataCategoryFetch(e.target.id)
    }
    
})

const fragment = document.createDocumentFragment()
document.addEventListener('DOMContentLoaded',()=>{
    dataFetch()
    categoryFetch()
})

inputBuscar.addEventListener('keyup', (e)=>{

    let texto = e.target.value
    console.log(texto)
    dataNameFetch(texto)
})

const selectElement = selectores.querySelector('select')

selectElement.addEventListener('change', (event) => {
    let orden = event.target.value
    dataSelectorFetch(orden,'','')
});

const formElement = selectores.querySelector('form')

let pmax = document.getElementById('pmax')
let pmin = document.getElementById('pmin')


formElement.addEventListener('submit',(event)=>{
    event.preventDefault()
   
    dataSelectorFetch(selectElement.value,pmax.value,pmin.value)
    pmax.value=''
    pmin.value=''
})

const url = modo=='desarrollo'? 'http://127.0.0.1:8080' : 'https://bsale-app-tienda.herokuapp.com'
let urlactual = `${url}/products/all`
////////////////////////////////////////////
const dataFetch = async () =>{
    try{
        const res = await fetch(`${url}/products/all`)
        const data = await res.json()
        urlactual=`${url}/products/all`
       
        
        dataSelectorFetch(selectElement.value,'','')
    }
    catch(err){
        console.log(err)
    }
}

const dataNameFetch = async (name)=> {
    
    try {

        const res = await fetch(`${url}/products/name?name=${name}`)
        const data = await res.json()
        
        urlactual=`${url}/products/name?name=${name}`
        
        dataSelectorFetch(selectElement.value,'','')
    }
    catch(err){
        console.log(err)
    }
}

const dataCategoryFetch = async (id)=> {
    
    try {

        const res = await fetch(`${url}/products/category?category=${id}`)
        const data = await res.json()
        if(id == 0){
            urlactual=`${url}/products/all`
        }else{
            urlactual=`${url}/products/category?category=${id}`
        }
        
        
        
        dataSelectorFetch(selectElement.value,'','')
    }
    catch(err){
        
    }
}

const dataSelectorFetch = async (orden,pmax,pmin)=> {


orden?orden:'abc'
pmax?pmax:"500000"
pmin?pmin:"0"

if(urlactual == `${url}/products/all`){
    try {

        const res = await fetch(`${urlactual}?orden=${orden}&pmax=${pmax}&pmin=${pmin}`)
        const data = await res.json()
        
        pintarCards(data)
    }
    catch(err){
        pintarNotfound()
    }
}else{
    try {

    const res = await fetch(`${urlactual}&orden=${orden}&pmax=${pmax}&pmin=${pmin}`)
    const data = await res.json()
  
    pintarCards(data)
}
    catch(err){
        
        pintarNotfound()
}
}
}

const pintarCards = data =>{
     
items.innerHTML=''

if(data[0].id>0){
    data.forEach(producto => {
           
   
        
        templateCard.querySelector('h5').textContent = producto.name
        templateCard.querySelector('a').textContent = ` $ ${producto.price}`
        templateCard.querySelector('img').setAttribute('src', producto.url_image? producto.url_image : urlimgnotfound)
        templateCard.querySelector('p').textContent = `%${producto.discount}`
        templateCard.querySelector('p').setAttribute('id',`discount${producto.discount}` )

        templateCard.querySelector('button').setAttribute('id',producto.id)

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
}
    items.appendChild(fragment)
}


const pintarNotfound = () => {
    templateCard.querySelector('h5').textContent = "Not found 404"
        
        templateCard.querySelector('img').setAttribute('src',urlimgnotfound)
        templateCard.querySelector('a').textContent = `Not Found Element`

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

        items.appendChild(fragment)
}
//////////////////////////////////////////////








const categoryFetch = async () =>{
    try{
        const res = await fetch(`${url}/category`)
        const data = await res.json()
       
        

        pintarCategory(data)
    }
    catch(err){
       
    }
}

const pintarCategory = data =>{

    data.forEach(category => {
        
      
        templateCategory.querySelector('li').textContent = category.name.toUpperCase()
        templateCategory.querySelector('li').setAttribute('id', category.id)
       

        const clone = templateCategory.cloneNode(true)
        fragment.appendChild(clone)
    });
    category.appendChild(fragment)
}








