import socket from "@serv/Socket";
import ChatModal from './ChatModal';

import { Component } from 'react';
import { ChatSource } from './ChatSource';
import Table from "@comp/Table/Table";

export default class Chat extends Component <any, any>{

  constructor(props) {
    super(props);
    this.state = {
      chats: null
    }
  }

  componentDidMount = async () => this.setState({chats: await ChatSource.chats() })

  componentWillUnmount(): void {
    socket.on("connect", () => {
      socket.emit('join-admin-chat', localStorage.getItem('TOKEN'))
      socket.on("chat-list", (data:any) =>  this.setState({chats: data}) ) 
    });
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
    <div className="Chat">
      <h1 className='title'>Chat</h1>
      <div>
        { 
        this.state.chats && <Table config = {
          {
            static: true,
            buttons: false,
            identifer: 'client_uuid',
            data: this.state.chats,
            columns: [
              { name: "client_uuid", title: "Room", template: this.RoomCol },
              { name: "username", title: "Username" },
              { name: "datetime", title: "Date" },
            ],
            modal: {
              editable: true,
              preContent: e => <ChatModal {...e} />,
              sections: []
            }
          }
          }/>
        }
        </div>
    </div>
    );
  }
};