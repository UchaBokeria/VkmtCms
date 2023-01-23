import './Wildcard.scss'
import { Component } from 'react';
// import { WildcardSource } from './WildcardrSource';

// import Table from "@comp/Table/Table";

export default class Wildcard extends Component <any, any>{

  constructor(props) {
    super(props);
    this.state = {data:null}
  }

  render() {
    return (
        <div className='Wildcard'>
            this is Wildcard page
        </div>
    )
  }
}