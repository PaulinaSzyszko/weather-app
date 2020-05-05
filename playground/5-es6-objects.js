const name = 'Paulina'
const userAge = 27

const user = {
    name:name ,
    age: userAge,
    location: 'Gdansk'
}
console.log(user)

//object destucturing

const product = {
    label:'Red notebook',
    price:3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

// const label = product.label
// const stock = product.stock

// const {label: productLabel, stock, rating = 5} = product
// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction= (type, {label,stock = 0} = {}) =>{
    console.log(type,label,stock)
}
transaction('order',product)