import socket from "@serv/Socket";
import { Component } from "react";
import { ChatSource } from "./ChatSource";
import GetDatetime from "@serv/Datetime";

export default class ChatModal extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      user: props.username,
      room: props.client_uuid,
      messages: [],
      input: "",
    };
  }

  componentDidMount = async () => {
    this.setState({ messages: await ChatSource.messages(this.state.room) });
    console.log(1, this.state.room);

    socket.emit("admin-join-room", this.state.room);
    socket.on("msg-reciver", (data: any) => {
      this.setState({ messages: data });
      document
        .querySelector(".message-list")
        .scrollIntoView({ behavior: "smooth" });
    });
  };

  sendMsg = (body) => {
    if (body === "" || body === null || body === undefined) return;
    this.setState({ input: "" });

    this.state.messages.push({
      body: body,
      from: null,
      datetime: GetDatetime(),
    });

    this.setState({ messages: this.state.messages });

    socket.emit(
      "admin-msg-sender",
      {
        operator_id: localStorage.getItem("USERID"),
        body: body,
      },
      this.state.room
    );
  };

  render() {
    return (
      <div className="Chat">
        <div className="message-list">
          {this.state.messages.map((e, x) => {
            return (
              <div
                className={
                  e.from === this.state.user
                    ? "message-container"
                    : "message-container me"
                }
              >
                <div
                  className={
                    e.from === this.state.user
                      ? "message"
                      : "message me"
                  }
                  key={`msg-${x}`}
                >
                    <p className="sender">{e.from === this.state.user ? "Client" : "Operator"}</p>
                  {/* <img
                    src={e.from === this.state.user ? "You" : "Me"}
                    key={`img-${x}`}
                    alt="img"
                  /> */}
                  <p key={`txt-${x}`}>{e.body}</p>
                  <div className="timestamp" key={`time-${x}`}>{e.datetime}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="message-input">
          <input
            type="text"
            id="message-input"
            value={this.state.input}
            autoComplete="off"
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          <button
            id="message-send"
            onClick={() => this.sendMsg(this.state.input)}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              id="send-alt"
              className="icon glyph"
              fill="#fff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M21.88,4.73,16.2,20.65A2,2,0,0,1,14.3,22h0a2,2,0,0,1-1.9-1.31l-2.12-5.52,1.54-1.54,2.49-2.49a1,1,0,1,0-1.42-1.42l-2.49,2.49L8.82,13.76,3.31,11.63a2,2,0,0,1,0-3.83L19.27,2.12a2,2,0,0,1,2.61,2.61Z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
