import { Http } from '@serv/Http';

export class AuthSource {

    static auth = async (email, password) => {
      return await Http.post( 'auth/login', { email: email, password: password } );
    }

}