import { Component } from 'react';
import { SlidersTypesSource } from './SlidersTypesSource';

import Slider from './Slider/Slider';
import Table from "@comp/Table/Table";

export default class SlidersTypes extends Component <any, any>{

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <div className="SliderTypes">
            <h1 className='title'>Slider Types</h1>
            <div>
              { 
                <Table config = {
                  {
                    buttons: false,
                    search: false,
                    request: SlidersTypesSource,
                    columns: [
                      { name: "id", title: "id", hidden: true },
                      { name: "name", title: "Slider" },
                    ],
                    modal: {
                      perm: "admin",
                      editable: true,
                      // header: { identifier: 'id' },
                      // preContent: (e) => <h1>{e?.id}</h1>,
                      sections: [
                        { name: "Name", key: "name", type: "text", editable: true },
                      ],
                      postContent: (e) => <Slider config = { e?.id } />,
                    }
                  }
                }/>
              }
            </div>
        </div>
    );
  }
};