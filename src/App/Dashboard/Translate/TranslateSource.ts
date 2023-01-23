import { Http } from '@serv/Http';

export class TranslateSource {
  
  public lang:any;

  constructor(lang) {
    this.lang = lang
  }

  static async LangList() { 
    var res = await Http.get('interface/translate/LangList')
    return res?.result;
  }

  async Create(body) {
    body.lang_id = this.lang.id
    var res = await Http.create('interface/translate', body)
    return res?.result;
  }

  async Read() { 
    var res = await Http.get(`interface/translate/ListOf/${this.lang.name}`)
    return res?.result;
  }

  async Update(ref, body) { 
    var res = await Http.update('interface/translate', ref, body)
    return res?.result;
  }

  async Delete(refs:string) { 
    var res = await Http.remove('interface/translate', refs)
    return res?.result;
  }

}