import socket from "@serv/Socket";
import ChatModal from './MailModal';

import { Component } from 'react';
import { MailSource } from './MailSource';
import Table from "@comp/Table/Table";

export default class Mail extends Component <any, any>{

  constructor(props) {
    super(props);
    this.state = { mails: null }
  }

  componentDidMount = async () => { 
    this.setState({mails: await MailSource.mails()})
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
    <div className="Mails">
      <h1 className='title'>Mails</h1>
      <div>
        { 
        this.state.mails && <Table config = {
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