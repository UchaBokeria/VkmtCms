import { Http } from '@serv/Http';
import { Tasks } from './FiltersSourceDto';

export class FiltersSource {
  
  public id:any;

  constructor(id) {
    this.id = id
  }

  Create = async (body) =>  {
    body.category_id = this.id
    var res = await Http.create(`products/categories/Filters`, body)
    return res?.result;
  }

  Read = async () => {
    var res = await Http.get(`products/categories/Filters/List/${this.id}`)
    return res?.result;
  }

  Update = async (ref, body) => {
    var res = await Http.update('products/categories/Filters', ref, body)
    return res?.result;
  }

  Delete = async (refs:string) => {
    var res = await Http.remove('products/categories/Filters', refs)
    return res?.result;
  }

}