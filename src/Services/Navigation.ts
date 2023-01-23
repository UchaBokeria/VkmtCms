import { lazy } from 'react'
import { Http } from './Http'
import { Auth } from './Auth'

export class NavigationService {
    
    public static async routes() {
        var list = await Http.post('interface/menu/show')
        list.result.forEach((e:any)=> e.element = this.import(e.component))
        return Auth.Check ? list.result : []
    }

    private static import(dir:string=Auth.AuthRoute) {
        dir = Auth.Check ? dir : Auth.AuthRoute
        return  lazy(() => import(`../App/${dir}/${dir}.tsx`))
    }
    
}