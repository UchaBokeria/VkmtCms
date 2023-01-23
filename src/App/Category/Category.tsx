import { Component } from 'react';
import { CategorySource } from './CategorySource';
import FileUpload from '@comp/FileUpload/FileUpload';
import Filters from './Filters/Filters';
import Table from "@comp/Table/Table";

export default class Category extends Component <any, any>{

  constructor(props) {
    super(props);
  }

  icons = (modalItem:any) => {
    return(
      <>
      <input type="file" onChange={async (e) => modalItem.icon = await CategorySource.iconUpload(e.target.files[0])}/>

      {modalItem?.icon && <div className="Preview" key={modalItem?.id+modalItem?.icon}>
        <p>Preview</p>
        <img src={modalItem.icon} alt="Cat" />
      </div>}
      </>
    )
  }

  render() {
    return (
      <div className="Categories">
          <h1 className='title'>Categories</h1>
          <div>
            { 
              <Table config = {
                {
                  request: new CategorySource(),
                  columns: [
                    { name: "id", title: "id", hidden: true },
                    { name: "name", title: "Category" },
                    { name: "icon", title: "Icon" },
                  ],
                  modal: {
                    perm: "admin",
                    editable: true,
                    header: { identifier: 'name' },
                    sections: [
                      { name: "Category", key: "name", type: "text" },
                      { name: "Icon", key: "icon", content: this.icons }
                    ],
                    postContent: e => <Filters config = { e?.id } />
                  }
                }
              }/>
            }
          </div>
      </div>
    );
  }
}