import './Blogs.scss';
import { Component } from 'react';
import { BlogsSource } from './BlogsSource';
import Table from '@comp/Table/Table';

export default class Blogs extends Component <any, any>{

    constructor(props) {
        super(props);
        this.state = {data:null}
    }

    statuesOptions = () => {
        return [
            {value: 1, name: 'Draft'},
            {value: 2, name: 'Published'}
        ]
    }
    
    Ckeditor = (e) => {
        return(
            <>
            'Ckeditor'
            </>
        )
    }

    ImgUpload = (e) => {
        return(
            <>
            'img'
            </>
        )
    }

    render() {
        return (
            <div className='Blogs'>
            <h1 className='title'>Blogs</h1>
            <div>
              { 
                <Table config = {
                  { 
                    request: BlogsSource,
                    columns: [
                      { name: "id", title: "id", hidden: true },
                      { name: 'img', title:"Thumbnail", template: e => <img src={e.img} className='blog-img' /> },
                      { name: "datetime", title: "Date" },
                      { name: "title", title: "Title" },
                      { name: "author", title: "Author" },
                      { name: "status", title: "Status" },
                    ],
                    modal: {
                      editable: true,
                      sections: [
                        { name: "Title", key: "title", type: "text" },
                        { name: "Status", key: "status_id", type: "select", options: this.statuesOptions()},
                        { name: "Thumbnail", key: "img", content: this.ImgUpload },
                      ],
                      postContent: this.Ckeditor
                    }
                  }
                }/>
              }
            </div>
            </div>
        )
  }
}