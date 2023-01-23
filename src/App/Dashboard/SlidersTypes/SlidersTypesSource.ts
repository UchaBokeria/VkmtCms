import { Http } from '@serv/Http';

export class SlidersTypesSource {
  
  static async Create(body) {
    var res = await Http.create('interface/SlidersTypes', body)
    return res?.result;
  }

  static async Read() {
    var res = await Http.get('interface/SlidersTypes/List')
    return res?.result;
  }

  static async Update(ref, body) {
    var res = await Http.update('interface/SlidersTypes', ref, body)
    return res?.result;
  }

  static async Delete(refs:string) {
    var res = await Http.remove('interface/SlidersTypes', refs)
    return res?.result;
  }

}