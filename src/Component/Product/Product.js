import React from 'react'
import "./Product.css"
import { Card } from 'antd';

export default class Product extends React.Component{

constructor(props){
super(props) ;// appel du constructeur de react component
}

render(){

//  Ici on peut mettre du javascript

    return(
            <>
                <h1> Liste des produits:</h1>

                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                    <p></p>
                    <p></p>
                    <p></p>
                </Card>
            </>
            )
        }

}