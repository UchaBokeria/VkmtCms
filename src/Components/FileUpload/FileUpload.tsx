import { Http } from '@serv/Http';
import React from 'react';

export default class FileUpload extends React.Component <any, any> {

    constructor(props:any) {
      super(props);
      this.state = {file:null, route: props.config?.route}
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
    }
  
    onFormSubmit(e){
      e.preventDefault() // Stop form submit
      Http.fileUpload(this.state.file, this.state.config?.route);
    }
  
    onChange(e) {
      this.setState({file:e.target.files[0]})
    }
  
    render() {
      return (
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
     )
    }
  }