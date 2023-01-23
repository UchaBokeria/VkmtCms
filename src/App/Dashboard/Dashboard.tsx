import './Dashboard.scss';
import Tabs from "@comp/Tabs/Tabs";
import { Component, lazy } from "react";

export default class Dashboard extends Component <{}, any> {
  
  constructor(props) {
    super(props);
    
    this.state = {
      tabs: [
        {
          path: "slidersTypes",
          icon: "calendar_view_week", 
          name: "Slider Types",
          element: lazy(()=> import('./SlidersTypes/SlidersTypes'))
        },
        {
          path: "translate", 
          icon: "translate", 
          name: "Translate",
          element: lazy(()=> import('./Translate/Translate'))
        },
        {
          path: "company_info", 
          icon: "info", 
          name: "Company Info",
          element: lazy(()=> import('./CompanyInfo/CompanyInfo'))
        },
      ]
    }
  }

  render() {
    return (
        <div className='Dashboard'>
          <Tabs config={{
            title: "dashboard", 
            tabs: this.state.tabs, 
            default: 'slidersTypes' }}>
          </Tabs>
        </div>
    )
  }
}