
import Tabs from "@comp/Tabs/Tabs";
import { Component, lazy } from "react";

export default class Communication extends Component <{}, any> {
  
  constructor(props) {
    super(props);
    
    this.state = {
      tabs: [
        {
          path: "chat",
          icon: "chat", 
          name: "Chat",
          element: lazy(()=> import('./Chat/Chat'))
        },
        {
          path: "video", 
          icon: "videocam", 
          name: "Video",
          element: lazy(()=> import('./Video/Video'))
        },
        {
          path: "mail", 
          icon: "mail", 
          name: "Mail",
          element: lazy(()=> import('./Mail/Mail'))
        },
      ]
    }
  }

  render() {
    return (
        <div className='Communication'>
          <Tabs config={{
            title: "communication", 
            tabs: this.state.tabs, 
            default: 'chat' }}>
          </Tabs>
        </div>
    )
  }
}