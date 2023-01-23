import { Component } from 'react';
import { CompanyInfoSource } from './CompanyInfoSource';

import Table from "@comp/Table/Table";

export default class CompanyInfo extends Component <any, any>{

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="CompanyInfo">
      <h1 className='title'>Company Info</h1>
      <div>
        { 
        <Table config = {
          {
            search: false,
            buttons: false,
            request: CompanyInfoSource,
            identifer: 'email',
            columns: [
              { name: "email", title: "Email" },
              { name: "phone", title: "Phone" },
              { name: "facebook", title: "Facebook" },
              { name: "instagram", title: "Instagram" },
              { name: "whatsapp", title: "Whatsapp" },
            ],
            modal: {
              editable: true,
              sections: [
                { name: "Email", key: "email", type: "text" },
                { name: "Phone", key: "phone", type: "text" },
                { name: "Facebook", key: "facebook", type: "text" },
                { name: "Instagram", key: "instagram", type: "text" },
                { name: "Whatsapp", key: "whatsapp", type: "text" },
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