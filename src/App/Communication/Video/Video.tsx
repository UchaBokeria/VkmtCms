import socket from "@serv/Socket";
import Table from "@comp/Table/Table";

import { Component } from 'react';
import { VideoSource } from './VideoSource';

export default class Video extends Component <any, any>{

  constructor(props:any) {
    super(props);
    this.state = {
      Videos: null
    }
  }

  componentDidMount = async () => {
    this.setState({Videos: await VideoSource.videos() })
  
    socket.on("connect", () => {
      socket.emit('join-admin-Video', localStorage.getItem('TOKEN'))
      socket.on("video-list", (data:any) =>  this.setState({Videos: data})) 
    })
  }
  
  RoomCol = (e) => {
    return (
      <div  className="RoomCol" key={`parent-${e.client_uuid}`}>
        <p  key={`id-${e.client_uuid}`}>{e.client_uuid}</p>
        <i  className="material-icons"  key={`copy-${e.client_uuid}`}
            onClick={c => {
              // @ts-ignore
              c.target.innerHTML = 'done';
              navigator.clipboard.writeText(e.client_uuid);
              // @ts-ignore
              setTimeout(e => c.target.innerHTML = 'content_copy', 500);
            }}>content_copy</i>
      </div>
    )
  }
  
  render() {
    return (
    <div className="Video">
      <h1 className='title'>Video</h1>
      <div>
        { 
        this.state.Videos && <Table config = {
          {
            static: true,
            buttons: false,
            identifer: 'client_uuid',
            data: this.state.Videos,
            columns: [
              { name: "client_uuid", title: "Room", template: this.RoomCol },
              { name: "datetime", title: "Date" },
            ],
            modal: false,
            dbClick: (e) => {
              socket.emit('cms-join-listens', e.client_uuid);

              var talk = window.open(
                `https://shop.vakomotors.ge/#/video-call?ref=${e.client_uuid}&i=${globalThis.user_id}`,
                "_blank", "width=900, height=800"
              );
              
              socket.on("already-taken", () => {
                if (confirm("Client is already taken, Close Window?")) {
                  talk.close();
                }
              });
            }
          }
          }/>
        }
        </div>
    </div>
    );
  }
};