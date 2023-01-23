import './Filters.scss'
import { Component } from 'react';
import { FiltersSource } from './FiltersSource';

import Table from "@comp/Table/Table";

export default class Filters extends Component <any, any>{

  constructor(Filters) {
    super(Filters);
    this.state = { 
      id: Filters?.config,
      elementTypes: [
        {value: 'input', name: 'Input'},
        {value: 'checkbox', name: 'Checkbox'},
      ]
    }
  }

  subsTable = async (e) => {
    return (
      <>
      
      
      </>
    )
  }

  render() {
    return (
        <div className="Filters">
            <h1 className='title'>Filters</h1>
            <div>
              { 
                <Table config = {
                  { 
                    request: new FiltersSource(this.state.id),
                    columns: [
                      { name: "id",      title: "id", hidden: true },
                      { name: "field",   title: "Field" },
                      { name: "type",    title: "Type" },
                      { name: "default", title: "Default" },
                      { name: "sub",     title: "Sub", hidden: true },
                    ],
                    modal: {
                      perm: "admin",
                      editable: true,
                      header: { identifier: 'field' },
                      sections: [
                        { name: "Field",   key: "field", type: "text" },
                        { name: "Default", key: "default", type: "text" },
                        // { name: "Sub", key: "sub", type: "text" },
                        { name: "Type", key: "type", type: "select", options: this.state.elementTypes },
                      ],
                      // postContent: (e) => this.subsTable(e)
                    }
                  }
                }/>
              }
            </div>
        </div>
    );
  }
};