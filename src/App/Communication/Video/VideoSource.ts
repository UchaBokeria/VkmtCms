import { Http } from '@serv/Http';

export class VideoSource {

  static async videos() {
    var res = await Http.get(`communication/videos/1`);
    return res?.result;
  }

  // static async messages(room) {
  //   var res = await Http.get(`communication/messages/${room}`);
  //   return res?.result;
  // }

}