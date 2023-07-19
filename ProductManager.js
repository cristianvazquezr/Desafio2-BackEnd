const fs=require('fs')



class ProductManager{

    static id=0

    constructor(path){
        this.path=path
        this.Product=''
    }

    async getProducts(){
        let listaProducto=[]
        try{
           await fs.promises.readFile(this.path, 'utf-8').then((respuesta)=>{console.log(respuesta)
            listaProducto=respuesta}
           )
           
        }
        catch(err){
            console.log("No existe el archivo")
        }
        .then(return listaProducto)
    }



    async addProduct(title, description, price, thumbnail, code, stock){
        //incremento en 1 el valor de ID
        ProductManager.id+=1
        //creo un objeto nuevo con atributos nuevos
        let producto1={id:ProductManager.id, title:title,description:description,price:price,thumbnail:thumbnail,code:code,stock:stock}
        //creo un array con los valores de ese nuevo objeto
        let valores=Object.values(producto1)
        //corroboro que no haya ningun valor vacio dentro de ese array
        let elementoVacio=valores.includes("")
        //corroboro que no haya ningun valor undefined dentro de ese array
        let elementoUnd=valores.includes(undefined)
        // con map genero un array de los code y veo si existe el mismo valor
        let listaProduct = this.getProducts
        console.log(listaProduct)
        let ListaCode=listaProduct.map(elemento=>elemento.code)
        let mismoCode=ListaCode.includes(producto1.code)



        if (elementoVacio || elementoUnd){
            console.log("existen atributos sin un valor definido")
        }
        else if (mismoCode){
            console.log("El valor elegido para code ya existe, elija otro")
        }
        else{
            await fs.promises.writeFile(this.path,[...listaProduct, producto1])
        }

    }


    

    getProductById(id){
        const productoBuscado=productManager.products.find(element=>element.id==id)
        if(productoBuscado!=undefined){
            return (productoBuscado)
        }
        else{
           console.log("Not found")
        }
    }
}


let producto = new ProductManager("./productos.JSON")

console.log(producto.getProducts())
//producto.addProduct('a','a','a','a',1,1)
