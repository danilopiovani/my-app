import React from 'react'


const Header = () => {
    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm">
                    <img class="rounded mx-auto d-block" width="200" src={require("./images/PODlogo.png")} />
                </div>
            </div>
        </div>
    )
}

export default Header;