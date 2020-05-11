import React, { Component } from 'react'
import { Form, Image } from 'react-bootstrap'

class ProductForm extends Component {
    initialState = {
        prodID: '',
        prodName: '',
        prodPrice: '',
        prodDesc: '',
        prodQtd: '0',
        prodPhoto: 'ProdA.jpg',
    }

    state = this.initialState

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    upload(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    submitForm = () => {
        const { productsData } = this.props;
        this.state.prodID = productsData.length
        console.log(productsData.length);
        console.log(this.state);
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }     

    render() {
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img width="300"  src={this.state.file} alt='' />;
        }
        else {
            imgPreview = <img width="200" Style="opacity: 0.5;" src={require("./images/uploadImage.png")} class="rounded mx-auto d-block" alt="..."></img>
        }
        //console.log('no Form: ' + this.props.productsData);
        const { prodName, prodPrice, prodDesc } = this.state;
        const { characterData, productsData } = this.props;
        return (
            <form class="form">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-group">
                                <div class="col-sm">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        name="prodName"
                                        id="prodName"
                                        value={prodName}
                                        onChange={this.handleChange}
                                        placeholder="Product Name"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm">
                                    <textarea Style="width:100%"
                                        rows="5"
                                        class="form-control"
                                        name="prodDesc"
                                        id="prodDesc"
                                        value={prodDesc}
                                        onChange={this.handleChange}
                                        placeholder="Product Description"
                                        class="form-control form-control-lg">
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="prodPrice"
                                            id="prodPrice"
                                            value={prodPrice}
                                            onChange={this.handleChange}
                                            placeholder="Product Price"
                                            class="form-control form-control-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col justify-content-center">
                            <div class="text-center">
                                <div Style="border: 1px dotted  #AAA;  border-radius: 5px; padding: 15px;" onclick="$('#prodPhoto').click();" className="form-group preview">
                                    {imgPreview}
                                </div>
                                <div className="form-group">
                                    <input Style="border: 1px solid #ccc; display: inline-block; padding: 6px 12px; cursor: pointer;"
                                    class="form-control-file"
                                    type="file"
                                    name="prodPhoto"
                                    id="prodPhoto"
                                        onChange={this.uploadSingleFile} />
                                </div>
                                {/*
                                <div className="form-group">
                                    <input
                                    type="button"
                                    value="Upload"
                                    class="btn btn-success"
                                        onClick={this.upload} />
                                </div>
                                */}
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-end">
                        <div class="form-group">
                            <input
                                type="button"
                                value="Submit"
                                class="btn btn-primary mb-2"
                                onClick={this.submitForm} />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default ProductForm;