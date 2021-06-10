import React from 'react'
import "./Product.css"
import { Card, Button } from 'antd';
import Axios from 'axios'; 

export default class Product extends React.Component{

constructor(props){
super(props) ;// appel du constructeur de react component
this.state = {
    products : []

}
}

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

render(){

//  Ici on peut mettre du javascript

    return(
            <>
                <h1> Liste des produits:</h1>

                {this.state.products.map((product, i) => {
                    return (
                        <Card title={product.nameproduct} style={{ width: 300 }}>
                            <p>price : {product.priceProduct}</p>
                            <p>id : {product.id}</p>
    
                        </Card>)
                })}

            </>
            )
        }

}