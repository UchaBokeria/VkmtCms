import { Http } from '@serv/Http';

export class ChatSource {

  static async chats() {
    var res = await Http.get(`communication/chats/1`);
    return res?.result;
  }

  static async messages(room) {
    var res = await Http.get(`communication/chatMessages/${room}`);
    return res?.result;
  }

}