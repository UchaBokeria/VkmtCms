import { Http } from '@serv/Http';

export class CompanyInfoSource {

  static async Read() { 
    var res = await Http.get('interface/CompanyInfo/List')
    return res?.result;
  }

  static async Update(ref, body) { 
    var res = await Http.update('interface/CompanyInfo', '1', {value: body})
    return res?.result;
  }

  static async Delete(refs:string) { 
    var res = await Http.remove('interface/CompanyInfo', refs)
    return res?.result;
  }

}