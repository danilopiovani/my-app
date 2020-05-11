import React, { Component } from 'react'
import Table from './Table'
import ProductForm from './ProductForm'
import Header from './Header'
import Navbar from './Navbar'
import ManageProducts from './ManageProducts'
import ProductsGrid from './ProductsGrid';
import UploadFile from './uploadFile';

//import Modal from 'react-bootstrap/Modal';



class App extends Component {
    state = {
        products: [
            { prodID: "0", prodName: "Prod A", prodPrice: "100", prodDesc: "My distinctive design with angled white legs gives you a neat look by covering cables effectively." , prodPhoto: "ProdA.jpg"},
            { prodID: "1", prodName: "Prod B", prodPrice: "100", prodDesc: "My distinctive design with angled white legs gives you a neat look by covering cables effectively." , prodPhoto: "ProdB.jpg"},
            { prodID: "2", prodName: "Prod C", prodPrice: "150", prodDesc: "My distinctive design with angled white legs gives you a neat look by covering cables effectively." , prodPhoto: "ProdC.jpg"},
            { prodID: "3", prodName: "Prod D", prodPrice: "150", prodDesc: "My distinctive design with angled white legs gives you a neat look by covering cables effectively." , prodPhoto: "ProdD.jpg"},
            { prodID: "4", prodName: "Prod E", prodPrice: "200", prodDesc: "My distinctive design with angled white legs gives you a neat look by covering cables effectively." , prodPhoto: "ProdE.jpg"},
            { prodID: "5", prodName: "Prod F", prodPrice: "200", prodDesc: "My distinctive design with angled white legs gives you a neat look by covering cables effectively.", prodPhoto: "ProdF.jpg" }
        ],
        characters: [
            { itemID: "0", itemName: "Prod A", itemPrice: "100", itemQtd: "0" },
            { itemID: "1", itemName: "Prod B", itemPrice: "100", itemQtd: "0" },
            { itemID: "2", itemName: "Prod C", itemPrice: "150", itemQtd: "0" },
            { itemID: "3", itemName: "Prod D", itemPrice: "150", itemQtd: "0" },
            { itemID: "4", itemName: "Prod E", itemPrice: "200", itemQtd: "0" },
            { itemID: "5", itemName: "Prod F", itemPrice: "200", itemQtd: "0" }
        ],
        totalCart: 0,
        newRegister: false
    }

    constructor(props) {
        super(props);
    }
    // ======================================================================================================================


    // ======================================================================================================================
    // Used at ProductGrid/Cart
    // ======================================================================================================================
        removeCharacter = index => {
            const { characters } = this.state
            console.log(index)
            this.setState({
                characters: characters.filter((character, i) => {
                    return i !== index
                }),
            })
            console.log(this.state)

            let totalCart = this.state.totalCart
            totalCart = totalCart - parseFloat(parseFloat(characters[index].itemPrice) * parseInt(characters[index].itemQtd)) 
            this.setState({ totalCart: totalCart })
        }

        addProdCart = productIndex => {
            const { products, characters } = this.state
            const result = characters.find(cartProduct => cartProduct.itemID === productIndex);
            if (typeof result === 'undefined') {
                const result2 = products.find(cartProduct2 => cartProduct2.prodID === productIndex);
                const prodToCart = { itemID: result2.prodID, itemName: result2.prodName, itemPrice: result2.prodPrice, itemQtd: "1" }
                this.setState({ characters: [...this.state.characters, prodToCart] })

                //update total
                let totalCart = this.state.totalCart
                totalCart = totalCart + parseFloat(parseFloat(result2.prodPrice))
                this.setState({ totalCart: totalCart })
            }
            else {
                const result3 = characters.findIndex(cartProduct => cartProduct.itemID === productIndex);
                this.incrementQtdCart(result3)
            }
        }

        incrementQtdCart = index => {
            //update qtd
            let characters = [...this.state.characters]
            characters[index].itemQtd = parseInt(characters[index].itemQtd) + 1
            this.setState({ characters })                                               

            //update total
            let totalCart = this.state.totalCart
            totalCart = totalCart + parseFloat(parseFloat(characters[index].itemPrice))
            this.setState({ totalCart: totalCart })
        }

        decrementQtdCart = index => {
            let characters = [...this.state.characters]
            let totalCart = this.state.totalCart
            if (parseInt(characters[index].itemQtd) > 0) {
                characters[index].itemQtd = parseInt(characters[index].itemQtd) - 1
                totalCart = totalCart - parseFloat(parseFloat(characters[index].itemPrice))
            }
            this.setState({ characters })
            this.setState({ totalCart })
        
        }
    // ======================================================================================================================


    // ======================================================================================================================
    //Used at Form
    // ======================================================================================================================
    handleSubmit = character => {
        console.log('products Before:' + this.state.products)
        this.setState({ products: [...this.state.products, character] })  
        this.setState({ newRegister: true }) 
        
        console.log('products After:' + this.state.products)
    }
    // ======================================================================================================================


    // ======================================================================================================================
    //Used at ManageProducts
    // ======================================================================================================================
        updateProduct = product => {       
            

            //update qtd
            let products = [...this.state.products] 

            const tempUpdate = products.findIndex(tempUpdateValue => tempUpdateValue.prodID === product.prodID);

            products[tempUpdate].prodID = product.prodID
            products[tempUpdate].prodName = product.prodName
            products[tempUpdate].prodPrice = product.prodPrice
            products[tempUpdate].prodDesc = product.prodDesc
            products[tempUpdate].prodPhoto = product.prodPhoto

            this.setState({
                products: products
            }) 
            
         }



        removeProduct = index => {
            const { products } = this.state
            console.log(index)
            this.setState({
                products: products.filter((character, i) => {
                    return i !== index
                }),
            })
            this.removeCharacter(index)
        }
    // ======================================================================================================================

    componentDidMount() {
        console.log('Cheguei aqui aqui')
        
    }

    componentDidUpdate() {
        console.log('Update APP');
        //this.setState({ newRegister: false }) 
    }

    render() {
        const { newRegister, products, characters, totalCart } = this.state
        //console.log('primeira passada: ' + products);
        return (
            <div className="container-fluid">
                {
                // Page Manage Product
                //In this page we will list the products and let the user update/add/delete a produt
                }
                {/* Header Block */}
                <Header />
                {/* NavBar Block */}
                <Navbar addProdCart={this.addProdCart} productsData={products} />
                
                {/* Container Form 
                <UploadFile />
                <Form handleSubmit={this.handleSubmit} characterData={characters} productsData={products} />
                */}
                <p></p>
                <div class="container-fluid">
                    <ManageProducts newRegister={newRegister} handleSubmit={this.handleSubmit} removeProduct={this.removeProduct} updateProduct={this.updateProduct} productsData={products} />
                </div>



                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <hr />




                {/* Header Block */}
                <Header />
                {/* NavBar Block */}
                <Navbar addProdCart={this.addProdCart} productsData={products} />
                {/* Container Form 
                <Form handleSubmit={this.handleSubmit} characterData={characters} productsData={products} />
                */}
                <p></p>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col col-sm-8">
                            {/* Container Products */}
                            <ProductsGrid addProdCart={this.addProdCart} productsData={products} />
                        </div>
                        <div class="col col-sm-4">
                            <Table characterData={characters} totalCartData={totalCart} removeCharacter={this.removeCharacter} incrementQtdCart={this.incrementQtdCart} decrementQtdCart={this.decrementQtdCart} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App
