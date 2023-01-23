import { Http } from '@serv/Http';

export class BlogsSource {
  

  constructor(lang) {
    this.lang = lang
  }

  static async Read(page=1) { 
    var res = await Http.get(`Blogs/Blogs/List/${page}`)
    return res?.result;
  }

  static async Create(body) {
    var res = await Http.create('Blogs/Blogs', body)
    return res?.result;
  }

  static async Update(ref, body) { 
    var res = await Http.update('Blogs/Blogs', ref, body)
    return res?.result;
  }

  static async Delete(refs:string) { 
    var res = await Http.remove('Blogs/Blogs', refs)
    return res?.result;
  }

}