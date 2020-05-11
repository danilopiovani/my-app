import React, { Component } from 'react'
import axios, { post } from 'axios'

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image:''
        }
    }
    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            const url = "http://localhost:3000/"
            const formData = { file: e.target.result }
            return post(url, formData)
                .then(response => console.warm("result ", response))
        }
    }

    render() {
        return (
            <div onSubmit={this.onFormSubmit}>
                <h1>React js File Upload Tutorial</h1>
                <input type="file" name="file" onChange={(e) => this.onChange(e)} />
            </div>
            )
    }

}

export default UploadFile;