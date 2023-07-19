const fs=require('fs')



class ProductManager{

    static id=0

    constructor(path){
        this.path=path
        this.Product=''
    }

    getProducts(){
        let listaProducto=[]
        try{
            listaProducto = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            console.log(listaProducto)
        }
        catch(err){
            console.log("No existe el archivo")
        }
        return listaProducto
        
    }


    addProduct(title, description, price, thumbnail, code, stock){
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
        const listaProduct = ()=>{
            let listaProducto=[]
            try{
                listaProducto = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            }
            catch(err){
                console.log("No existe el archivo, sera creado")
            }
            return listaProducto
        }

        let ListaCode=listaProduct().map(elemento=>elemento.code)
        let mismoCode=ListaCode.includes(producto1.code)

        if (elementoVacio || elementoUnd){
            console.log("existen atributos sin un valor definido")
        }
        else if (mismoCode){
            console.log("El valor elegido para code ya existe, elija otro")
        }
        else{
            fs.writeFileSync(this.path,JSON.stringify([...listaProduct(), producto1]))
        }

    }

    
    getProductById(id){

        const listaProduct = ()=>{
            let listaProducto=[]
            try{
                listaProducto = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            }
            catch(err){
                console.log("No existe el archivo, sera creado")
            }
            return listaProducto
        }

        const productoBuscado=listaProduct().find(element=>element.id==id)
        if(productoBuscado!=undefined){
            return (productoBuscado)
        }
        else{
           console.log("Not found")
        }
    }
}


let producto = new ProductManager("./productos.txt")

producto.getProducts()
//producto.addProduct('a','a','a','a',2,1)
