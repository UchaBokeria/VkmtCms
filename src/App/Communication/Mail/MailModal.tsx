import socket from "@serv/Socket";
import { Component } from 'react';
import { MailSource } from './MailSource';
import GetDatetime from '@serv/Datetime';

export default class ChatModal extends Component <any, any>{

    constructor(props) {
        super(props);
        this.state = {
            user: props.username,
            room: props.client_uuid,
            messages: [],
            input: '',
        }
    }
    
    componentDidMount = async () => {
        this.setState({messages: await MailSource.messages(this.state.room) })
        console.log(1,this.state.room);
            
        socket.emit('admin-join-room', this.state.room)
        socket.on('msg-reciver', (data:any) =>  {
            this.setState({messages: data})
            document.querySelector(".message-list").scrollIntoView({ behavior: 'smooth' })
        }) 
    }

    sendMsg = (body) => {
        if(body === '' || body === null || body === undefined) return;
        this.setState({input: ''});

        this.state.messages.push({
            body: body,
            from: null,
            datetime: GetDatetime()
        });

        this.setState({messages: this.state.messages});

        socket.emit('admin-msg-sender', {
            operator_id:localStorage.getItem("USERID"), 
            body:body
        }, this.state.room);
    }

    render() {
        return (
        <div className="Mail">
            <div className="message-list">
            {   this.state.messages.map((e,x) => {
                return (
                <div className={e.from === this.state.user ? 'message-container' : 'message-container me'} key={`msg-${x}`}>
                    <img src={e.from === this.state.user ? 'You' : 'Me' }  key={`img-${x}`} alt='img' />
                    <p key={`txt-${x}`}>{e.body}</p>
                    <div key={`time-${x}`}>{e.datetime}</div>
                </div>) })
            }
            </div>

            <div className="message-input">
                <input  type="text" id="message-input" value={this.state.input} autoComplete="off"
                        onChange={e => this.setState({input:e.target.value})} />
                <button id="message-send" onClick={() => this.sendMsg(this.state.input)}>send</button>
            </div>
        </div>
        );
    }
};