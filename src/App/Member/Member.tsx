import './Member.scss'
import { Component } from 'react';
// import { MemberSource } from './MemberSource';

// import Table from "@comp/Table/Table";

export default class Member extends Component <any, any>{

  constructor(props) {
    super(props);
    this.state = {data:null}
  }

  render() {
    return (
        <div className='Member'>
            this is Member page
        </div>
    )
  }
}