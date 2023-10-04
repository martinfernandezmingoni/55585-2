const fs = require('fs')

class ProductManager {
  
  constructor(path){
    this.products =[],
    this.id = 1
    this.path = path
    this.format = 'utf-8'
  }
  
  getProducts(){
    const data = fs.readFileSync(this.path, this.format)
    return JSON.parse
  }
  

  addProduct (product){
    const {title, description, price, thumbnail, code, stock} = product
    
    const newProduct = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }
    
    if(
      !title || 
      !description || 
      !price ||
      !thumbnail ||
      !code || 
      !stock
    ){
      console.log('Error: faltan datos')
      return
    }      
    if ( this.products.some(p => p.code === code) ){
      console.log('Error: El código del producto ya existe')
      return
    }
        
    this.products.push(newProduct)
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "/t"))
    
  }
  

  getProductByID = (id) => {
    const product = this.products.find(p => p.id === id)
    return product ? product : 'ID Not Found'
  }

  updateProduct(id, updates) {
    try{
      const data = fs.readFileSync(this.path, this.format)
      this.products = JSON.parse(data)
      const productIndex = this.products.findIndex((x) => x.id === id)
      if (productIndex === -1) {
        console.log("El producto no existe")
        return
      }
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updates,
        id: this.products[productIndex].id
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "/t"))
      return this.product[productIndex]
    } catch (error){
      console.log('Error', error.message)
      return
    }
  }

  deleteProduct(id) {
    const products = this.getProducts()
    const index = products.findIndex(product => product.id === id)
    if(index === -1){
      return null
    }
    const deletedProduct = products.splice(index, 1)[0]
    fs.writeFileSync(this.path, JSON.stringify(products))
    return deletedProduct
  }

}

const productManager = new ProductManager('./products.json')