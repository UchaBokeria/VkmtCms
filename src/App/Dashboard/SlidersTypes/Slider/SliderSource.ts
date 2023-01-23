import { Http } from '@serv/Http';

export class SliderSource {
  
  public id:any;

  constructor(id) {
    this.id = id
  }

  Create = async (body) =>  {
    body.type_id = this.id
    var res = await Http.create(`interface/SlidersTypes/Sliders`, body)
    return res?.result;
  }

  Read = async () => {
    var res = await Http.get(`interface/SlidersTypes/Sliders/List/${this.id}`)
    return res?.result;
  }

  Update = async (ref, body) => {
    var res = await Http.update('interface/SlidersTypes/Sliders', ref, body)
    return res?.result;
  }

  Delete = async (refs:string) => {
    var res = await Http.remove('interface/SlidersTypes/Sliders', refs)
    return res?.result;
  }

}