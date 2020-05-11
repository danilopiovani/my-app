import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import ProductForm from './ProductForm'


const MyVerticallyCenteredModal = props => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Product
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <ProductForm handleSubmit={props.handleSubmit} productsData={props.productsData} />
                </p>
            </Modal.Body>
        </Modal>
    );
}


class ManageProductsNav extends Component {
    state = {
        showModal:false
    }
    constructor(props) {
        super(props);
    }

    handleModal() {
        this.setState({ showModal: !this.state.showModal })
    }


    render() {    
        //console.log('Product Nav: ' + this.props.productsData )
        return (
            <div class="container-fluid">
                <div class="row justify-content-between">
                    <div class="col-auto mr-auto">
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" onChange={this.props.handleChange} name="searchTerm" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-success my-10 my-sm-10" type="submit" onClick={() => { this.handleModal() }}>Create Product</button>
                    </div>
                </div>
                <MyVerticallyCenteredModal
                    productsData={this.props.productsData}
                    handleSubmit={this.props.handleSubmit}
                    show={this.state.showModal}
                    onHide={() => { this.handleModal() }}                    
                />
            </div>
        )
    }
}

const ManageProductsHeader = () => {
    return (
        <thead class='table-info'>
            <tr>
                <th Style="width:10%">Image</th>
                <th Style="width:20%">Name</th>
                <th Style="width:10%">Price</th>
                <th Style="width:40%">Description</th>                
                <th Style="width:10%" colSpan="2">Actions</th>
            </tr>
        </thead>
    )
}

const ProductCardImage = props => {
    const { productImage } = props;
    return (
        <img class="card-img-top rounded mx-auto d-block" src={require("./images/" + productImage)} />
    )
}

class RowProduct extends Component {
    render() {
        
        const { searchTerm, showHeaderTableDecision, productsData, prodIndex, functiontochangeState, removeProduct } = this.props;
        //console.log('searchTerm RowP: ' + productsData[prodIndex].prodName.toLowerCase().indexOf(searchTerm.toLowerCase()))
            if (searchTerm !== "" && productsData[prodIndex].prodName.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1) {
                return null
            }
            return (
                <table class="table">
                    {showHeaderTableDecision ? <ManageProductsHeader /> : <span></span>}
                    <tr>
                        <td Style="width:10%"><ProductCardImage productImage={productsData[prodIndex].prodPhoto} /></td>
                        <td Style="width:20%">{productsData[prodIndex].prodName}</td>
                        <td Style="width:10%"><CurrencyFormat value={productsData[prodIndex].prodPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                        <td Style="width:40%">{productsData[prodIndex].prodDesc}</td>
                            
                        <td Style="width:10%">
                            <button class="btn btn-info" onClick={() => functiontochangeState(true,  productsData[prodIndex].prodID )}>
                                <svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                        <td Style="width:10%">

                            <button class="btn btn-danger" onClick={() => removeProduct(prodIndex)}>
                                <svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </table>
            )
    }
}


class RowProductEdit extends Component {

    initialState = {
        prodID: this.props.productsData[this.props.prodIndex].prodID,
        prodName: this.props.productsData[this.props.prodIndex].prodName,
        prodPrice: this.props.productsData[this.props.prodIndex].prodPrice,
        prodDesc: this.props.productsData[this.props.prodIndex].prodDesc,
        prodQtd: this.props.productsData[this.props.prodIndex].prodQtd,
        prodPhoto: this.props.productsData[this.props.prodIndex].prodPhoto,
        selectedFile:null,
    }

    state = this.initialState

    fileSelectHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
		})
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post("/images/", fd)
            .then(res => {
                console.log(res);
            });
	}

    handleChange = event => {
        const { name, value } = event.target
        console.log(name)
        console.log(value)
        this.setState({
            [name]: value,
        })
    }

    submitForm = () => {
        this.props.updateProduct(this.state)
        this.props.functiontochangeState(false, this.state.prodID)
    }

    render() {
        const { searchTerm, showHeaderTableDecision, productsData, prodIndex, functiontochangeState } = this.props;
        const { prodID, prodName, prodPrice, prodDesc, prodQtd, prodPhoto } = this.state;
        if (searchTerm !== "" && prodName.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1) {
            return null
        }
        return (
            <form class="form-inline">
                <table class="table">                                   
                    {showHeaderTableDecision ? <ManageProductsHeader /> : <span></span>}
                    <tr class="table-warning">
                        <td Style="width:10%">
                            <input Style="width:100%"
                                class="form-control-file"
                                type="file"
                                name="prodPhoto"
                                id="prodPhoto"
                                onChange={this.fileSelectHandler} />
                            <input
                                type="button"
                                value="Upload"
                                class="btn btn-success"
                                onClick={this.fileUploadHandler} />
                        </td>
                        <td Style="width:20%">
                            <input Style="width:100%"
                                class="form-control"
                                type="text"
                                name="prodName"
                                id="prodName"
                                value={prodName}
                                onChange={this.handleChange}/>
                        </td>
                        <td Style="width:10%">
                            <input Style="width:100%"
                                class="form-control"
                                size="4"
                                type="text"
                                name="prodPrice"
                                id="prodPrice"
                                value={prodPrice}
                                onChange={this.handleChange}/>
                        </td>
                        <td Style="width:40%">
                            <textarea Style="width:100%"
                                rows="4"
                                class="form-control"
                                name="prodDesc"
                                id="prodDesc"
                                value={prodDesc}
                                onChange={this.handleChange}>                                
                            </textarea>
                        </td>
                        <td Style="width:20%;">
                            <input
                                type="button"
                                value="Save"
                                class="btn btn-success"
                                onClick={this.submitForm} />
                        </td>
                    </tr>
                </table>
            </form>
        )
    }
}


class ManageProductsBody extends Component {

    render() {
        
        const { searchTerm, removeProduct, productsData, functiontochangeState, editRow, itemEdit, updateProduct } = this.props;
        console.log('searchTerm: ' + this.props.searchTerm);
        var showHeaderTableDecision = true
        const rows = this.props.productsData.map((row, index) => {
            if (index > 0 ) {
                showHeaderTableDecision = false 
            }
            
            //console.log("editRow: " + itemEdit + " | " + editRow + ' showHeaderTableDecision: ' + showHeaderTableDecision)
            return (
                <div>{(editRow && itemEdit === productsData[index].prodID) ?
                    <RowProductEdit
                        updateProduct={updateProduct}
                        editRow={editRow}
                        itemEdit={itemEdit}
                        showHeaderTableDecision={showHeaderTableDecision}
                        prodIndex={index}
                        productsData={productsData}
                        functiontochangeState={functiontochangeState}
                        searchTerm={searchTerm}/> :
                    <RowProduct
                        removeProduct={removeProduct}
                        showHeaderTableDecision={showHeaderTableDecision}
                        prodIndex={index} productsData={productsData}
                        functiontochangeState={functiontochangeState}
                        searchTerm={searchTerm}/>}
                </div>

            )
        })
    return <div>{rows}</div>
    }
}





class ManageProducts extends Component {
    state = {
        editRow: false,
        itemEdit: "0",
        searchTerm: "",
    }

    functiontochangeState = (someArg,indexXXX) => {
        this.setState({ editRow: someArg });
        this.setState({ itemEdit: indexXXX });
    }


    removeProduct = index => {
        const resultIndex = this.props.productsData.findIndex(result => result.prodID === this.props.productsData[index].prodID);
        this.props.removeProduct(resultIndex)
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    componentDidMount() {
        console.log('Cheguei aqui')
    }

    componentDidUpdate() {
        console.log('Update Manager');
    }

    render() {        
        const { newRegister, handleSubmit, productsData, updateProduct, removeProduct } = this.props;
        console.log('newRegister: ' + newRegister);


        console.log('Product State: ' + productsData)
        const tableEmpty = this.props.productsData;
        if (tableEmpty == "") {
            return (
                <div>
                    <div class="alert alert-secondary"><h1>Products</h1></div>
                    <ManageProductsNav
                    handleChange={this.handleChange}/>
                    <p></p>
                    <table class='table table-hover'>
                        <ManageProductsHeader />
                        <tr class='table-secundary'>
                            <td colSpan="6" align="center">
                                No Products
                            </td>
                        </tr>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div class="alert alert-secondary"><h1>Products</h1></div>
                    <ManageProductsNav
                        handleChange={this.handleChange}
                        productsData={productsData}
                        handleSubmit={handleSubmit}/>
                    <p></p>

                    <ManageProductsBody
                        removeProduct={this.removeProduct}
                        updateProduct={updateProduct}
                        editRow={this.state.editRow}
                        itemEdit={this.state.itemEdit}
                        productsData={productsData}
                        functiontochangeState={this.functiontochangeState}
                        searchTerm={this.state.searchTerm}/>
                </div>
            )
        }
    }    
}


export default ManageProducts;