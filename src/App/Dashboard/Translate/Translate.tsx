import { Component } from 'react';
import { TranslateSource } from './TranslateSource';

import Table from "@comp/Table/Table";

export default class Translate extends Component <any, any>{

  constructor(props) {
    super(props);
  }

  childTableConfig = (e) => {
    return <Table config={{
        request: new TranslateSource(e),
        columns: [ 
          { name: "key", title: "key" }, 
          { name: "value", title: "Value" } 
        ],
        modal: {
          editable: true,
          sections: [
          { name: "Key", key: "key", type: "text" },
          { name: "Value", key: "value", type: "text" }
        ]}
    }}/>
  };

  render() {
    return (
        <div className="Translate">
            <h1 className='title'>Translate</h1>
            <div>
              { 
                <Table config = {
                  { 
                    request: {Read: TranslateSource.LangList},
                    buttons: false,
                    columns: [
                      { name: "id", title: "id", hidden: true },
                      { name: "name", title: "Language" }
                    ],
                    modal: {
                      perm: "admin",
                      editable: true,
                      header: { identifier: 'id' },
                      sections: [
                        { name: "Language", key: "name", type: "text", editable: false }
                      ],
                      postContent: (e) => {return this.childTableConfig(e)}
                    }
                  }
                }/>
              }
            </div>
        </div>
    );
  }
};