import React from 'react'
import "./Product.css"
import { Card, Button, Input, Form } from 'antd';
import Axios from 'axios'; 

export default class Product extends React.Component{

constructor(props){
super(props) ;// appel du constructeur de react component
this.state = {
    products : [],
    product :{}

}
//  donne la porté necessaire au return sur onfinish
this.onFinish = this.onFinish.bind(this);
this.Form = React.createRef()
this.select = this.select.bind(this);

}
// ------------------------ Methodes ----------------------------------------

//  des que le composant se charge tu fais ça: 
componentDidMount(){
    this.getProduct()

}

//  Affiher la liste des produits Get

getProduct(){
    const axios = require('axios');

// Make a request for a user with a given ID
Axios.get('http://localhost:49964/api/Apiproduits')
  .then( (response)=> {
this.setState({
    products: response.data
})
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

//  supprimer un produits

deleteProduct(id){
Axios.delete(`http://localhost:49964/api/Apiproduits/${id}`)

}


//  Afficher dans la formulaire

select(contenuproduit){
const newProduct={
    id: contenuproduit.id,
    nameProduct: contenuproduit.nameProduct,
    priceProduct: contenuproduit.priceProduct,
}

this.Form.current.setFieldsValue(newProduct);
}

onFinish(values){
    console.log(values)
    this.setState({
        product : values
    })
    const newProduct = {
        nameProduct : this.state.product.nameProduct,
        priceProduct : this.state.product.priceProduct
    }
Axios.post('http://localhost:49964/api/Apiproduits', newProduct)
.then(()=>{
    console.log('post ok', newProduct)

})
.catch(function (error) {
    console.log(error);
  })

}

//  mise a jour des données
update(produit){
    const updateProduct={
        id: this.state.product.id,
        nameProduct: this.state.product.nameProduct,
        priceProduct: this.state.product.priceProduct,
    }
Axios.put(`http://localhost:49964/api/Apiproduits/${updateProduct.id}`,updateProduct )
.then((res)=>{

})
}


onFinishFailed(){}

render(){

//  Ici on peut mettre du javascript

    return(
            <>
                <h1> Liste des produits:</h1>

{/* formulaire */}

                <Form
                ref ={this.Form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
    >
              <Form.Item
            value={this.state.product.id}
        name="id"
        >

        <Input />
      </Form.Item>

      <Form.Item
            value={this.state.product.nameProduct}
        label="Nom du produit"
        name="nameProduct"
        rules={[{ required: true, message: 'Entre un nom de jeu!' }]}>

        <Input />
      </Form.Item>

      <Form.Item
      value={this.state.product.priceProduct}
        label="Prix du produit"
        name="priceProduct"
        rules={[{ required: true, message: 'Entrez un prix!!' }]}
      >
        <Input />
      </Form.Item>



      <Form.Item >
        <Button type="primary" htmlType="submit">
          Envoyé
        </Button>
        <Button type="primary" onClick={this.updateProduct(this.product)}>
          mettre à jour
        </Button>
      </Form.Item>
    </Form>

                {this.state.products.map((product, i) => {
                    return (
                        <Card key={i} title={product.nameProduct} style={{ width: 300 }}>
                            <p>price : {product.priceProduct}</p>
                            <p>id : {product.id}</p>
                            <button type="primary" onClick={this.deleteProduct.bind(this, product.id)}> supprimer</button>
                            <button type="primary" onClick={this.select.bind(this, product)}> sellectionner</button>
                        </Card>)
                })}

            </>
            )
        }

}