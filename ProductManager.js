const { Console } = require('console')
const fs=require('fs')



class ProductManager{

    constructor(path){
        this.path=path
        this.Product=''
    }

    getProducts(){
        let listaProducto=[]
        try{
            listaProducto = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch(err){
            console.log("No existe el archivo")
        }
        return listaProducto
        
    }


    addProduct(title, description, price, thumbnail, code, stock){
        //incremento en 1 el valor de ID
        let id=this.getProducts().length+1
        //creo un objeto nuevo con atributos nuevos
        let producto1={id:id, title:title,description:description,price:price,thumbnail:thumbnail,code:code,stock:stock}
        //creo un array con los valores de ese nuevo objeto
        let valores=Object.values(producto1)
        //corroboro que no haya ningun valor vacio dentro de ese array
        let elementoVacio=valores.includes("")
        //corroboro que no haya ningun valor undefined dentro de ese array
        let elementoUnd=valores.includes(undefined)

        //valido si existe el archivo sino indico que sera creado.
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

        // con map genero un array de los code y veo si existe el mismo valor
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

        // llamo la funcion para obtener los productos y buscar por id
        let listaProduct=this.getProducts()

        const productoBuscado=listaProduct.find(element=>element.id==id)
        if(productoBuscado!=undefined){
            return (productoBuscado)
            
        }
        else{
           console.log("Not found")
           return (false)
        }
    }

    updateProduct(id,title, description, price, thumbnail, code, stock){
        //chequeo que exista el archivo y que lo busque por id
        
        let Product=this.getProductById(id)
        
        //valido que exista el id
        if (Product!=false){

            //hago todas las validaciones de que no repita el CODE y que se hayan elegido valores para todos los atributos.
            let producto1={id:id, title:title,description:description,price:price,thumbnail:thumbnail,code:code,stock:stock}
            //creo un array con los valores de ese nuevo objeto
            let valores=Object.values(producto1)
            //corroboro que no haya ningun valor vacio dentro de ese array
            let elementoVacio=valores.includes("")
            //corroboro que no haya ningun valor undefined dentro de ese array
            let elementoUnd=valores.includes(undefined)

            //valido si existe el archivo sino indico que sera creado.
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

            // con map genero un array de los code y veo si existe el mismo valor de code pero descarto el producto que tiene el mismo id
            let ListaCode=listaProduct().map((elemento)=>{
                let lista=''
                if(id!=elemento.id){
                    lista=elemento.code
                }
                return lista
            })
            console.log(ListaCode)
            let mismoCode=ListaCode.includes(producto1.code)

            if (elementoVacio || elementoUnd){
                console.log("existen atributos sin un valor definido")
            }
            else if (mismoCode){
                console.log("El valor elegido para code ya existe, elija otro")
            }
            else{

                //genero la lista modificada y rescribo el archivo.
                let listaModificada=listaProduct().map((elemento)=>{
                    if(id==elemento.id){
                        elemento=producto1
                    }
                    return elemento
                })


                fs.writeFileSync(this.path,JSON.stringify(listaModificada))
            }

        }else{
            console.log("no se encontro el elemento")
        }

    



    }
    deleteProduct(id){
        //chequeo que exista el archivo y que lo busque por id
    
    let Product=this.getProductById(id)
    
    //valido que exista el id
    if (Product!=false){
        let listaProductos=this.getProducts()

        //genero la lista modificada y rescribo el archivo.
            let listaModificada=[]
        for(let i=0;i<listaProductos.length;i++){
            if(id!=listaProductos[i].id){
                listaModificada.push(listaProductos[i])
            }
        }
        fs.writeFileSync(this.path,JSON.stringify(listaModificada))
    }else{
        console.log("no se encontro el elemento")
    }}

}


let producto = new ProductManager("./productos.txt")

producto.deleteProduct(1,'a','b','a','a',3,1)

