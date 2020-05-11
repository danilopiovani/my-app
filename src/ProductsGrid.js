import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';

const ProductCardImage = props => {
    const { productImage } = props;
    return (
        <img class="card-img-top rounded mx-auto d-block" src={require("./images/" + productImage)} />
    )
}

const ProductCardBody = props => {
    const { productTitle } = props;
    const { productDesc } = props;
    const { productPrice } = props;
    return (
        <div class="card-body">
            <h5 class="card-title">{productTitle}</h5>
            <p class="card-text">{productDesc}</p>
            <h6 class="card-title">
                Price: {<CurrencyFormat value={productPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</h6>
        </div>
    )
}

const ProductCardFooter = props => {
    const { productIndex, addProdCart } = props;
    return (
        <div class="card-footer">
            <button class="btn btn-primary">
                <span class="align-middle" onClick={() => props.addProdCart(productIndex)}>Add to Cart</span>
            </button>
        </div>
    )
}



const CardDetail = props => {
    const { addProdCart } = props;
    const rows = props.productsData.map((row, index) => {
        return (
            <div class="col mb-4">
                <div class="card h-100">
                    <ProductCardImage productImage={row.prodPhoto}/>
                    <ProductCardBody productTitle={row.prodName} productDesc={row.prodDesc} productPrice={row.prodPrice} />
                    <ProductCardFooter productIndex={row.prodID} addProdCart={addProdCart}/>
                </div>
            </div>
        )
    })

    return <div class="row row-cols-1 row-cols-md-3">{rows}</div>
}

class ProductsGrid extends Component {
    render() {
        const { productsData, addProdCart } = this.props;
        console.log('GRID: ' + productsData);
        return (
            <div>
               <div class="alert alert-secondary"><h1>Products</h1></div>
               <CardDetail productsData={productsData} addProdCart={addProdCart} />
            </div>
        )
    }
}
//const ProductsGrid = props => {
//    const { productsData, addProdCart} = props;
//    return (
//        <div>
//            <div class="alert alert-secondary"><h1>Products</h1></div>
//            <CardDetail productsData={productsData} addProdCart={addProdCart} />
//        </div>
//    )
//}

export default ProductsGrid