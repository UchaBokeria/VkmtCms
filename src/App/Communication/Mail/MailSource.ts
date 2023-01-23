import { Http } from '@serv/Http';

export class MailSource {

  static async mails() {
    var res = await Http.get(`communication/chats/1`);
    return res?.result;
  }

  static async messages(room) {
    var res = await Http.get(`communication/messages/${room}`);
    return res?.result;
  }

}