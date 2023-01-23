import { Component } from 'react';
import Table from "@comp/Table/Table";
import { SliderSource } from './SliderSource';

export default class Slider extends Component <any, any>{

  constructor(slider) {
    super(slider);
    this.state = { id: slider?.config }
  }

  render() {
    return (
        <div className="Slider">
            <h1 className='title'>Slider</h1>
            <div>
              { 
                <Table config = {
                  { 
                    request: new SliderSource(this.state.id),
                    columns: [
                      { name: "id", title: "id", hidden: true },
                      { name: "title", title: "title" },
                    ],
                    modal: {
                      perm: "admin",
                      editable: true,
                      header: { identifier: 'id' },
                      sections: [
                        { name: "Product Number", key: "product_id", type: "text", editable: true },
                        { name: "title", key: "title", type: "text", editable: false },
                      ]
                    }
                  }
                }/>
              }
            </div>
        </div>
    );
  }
};