import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format';

const TableHeader = () => {
    return (
        <thead class='table-dark'>
            <tr>
                <th>Qtd</th>
                <th>Name</th>
                <th>Price</th>
                <th colSpan="3">Actions</th>
            </tr>
        </thead>
    )
}

const TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        if (row.itemQtd > 0) {
            return (
                <tr key={index}>
                    <td>{row.itemQtd}</td>
                    <td>{row.itemName}</td>
                    <td><CurrencyFormat value={row.itemPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                    <td>
                        <button class="btn btn-secondary" onClick={() => props.incrementQtdCart(index)}>
                            <svg class="bi bi-plus-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-info" onClick={() => props.decrementQtdCart(index)}>
                            <svg class="bi bi-dash-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger " onClick={() => props.removeCharacter(index)}>
                            <svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </td>
                </tr>
            )
        }
    })

    return <tbody>{rows}</tbody>
}


const TableFooterCart = props => {
    const { totalCartData } = props;
    return (
        <tr class="table-warning">
            <td colSpan="5">TOTAL:</td>
            <td><CurrencyFormat value={totalCartData} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
        </tr >
    )
}


const Table = props => {
    const { characterData, totalCartData, removeCharacter, incrementQtdCart, decrementQtdCart } = props;
    const tableEmpty = props.characterData;
    if (tableEmpty == "") {
        return (
            <div>
                <div class="alert alert-secondary"><h1>CART</h1></div>
                <table class='table table-hover'>
                    <TableHeader />
                    <tr class='table-info'>
                        <td colSpan="6" align="center">
                            No Data
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
    else {
        return (
            <div>
                
                <div class="alert alert-secondary"><h1>CART</h1></div>
                <table class='table table-hover'>
                    <TableHeader />
                    <TableBody characterData={characterData} removeCharacter={removeCharacter} incrementQtdCart={incrementQtdCart} decrementQtdCart={decrementQtdCart} />
                    <TableFooterCart totalCartData={totalCartData} />
                </table>
            </div>
        )
    }
}

export default Table