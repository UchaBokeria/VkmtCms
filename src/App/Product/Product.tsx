import './Product.scss'
import { Component } from 'react';
import { ProductSource } from './ProductSource';

import Table from "@comp/Table/Table";

export default class Product extends Component <any, any>{

  constructor(props) {
    super(props);
    this.state = {data:null}
  }

  render() {
    return (
        <div className='Product'>
            this is Product page
        </div>
    )
  }
}