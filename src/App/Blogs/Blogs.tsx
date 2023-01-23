import './Blogs.scss'
import { Component } from 'react';


export default class Blogs extends Component <any, any>{

    constructor(props) {
        super(props);
        this.state = {data:null}
    }

    render() {
        return (
            <div className='Blogs'>
                this is Member page
            </div>
        )
  }
}