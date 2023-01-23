import { Http } from '@serv/Http';

export class CategorySource {

  constructor() { }

  Create = async (body) =>  {
    var res = await Http.create(`products/categories`, body)
    return res?.result;
  }

  Read = async () => {
    var res = await Http.get(`products/categories/List`)
    return res?.result;
  }

  Update = async (ref, body) => {
    var res = await Http.update('products/categories', ref, body)
    return res?.result;
  }

  Delete = async (refs:string) => {
    var res = await Http.remove('products/categories', refs)
    return res?.result;
  }

  static iconUpload = async (file) => {
    var res = await Http.fileUpload(file,'products/categories/iconUpload')
    return res?.result?.dir
  }
  
}