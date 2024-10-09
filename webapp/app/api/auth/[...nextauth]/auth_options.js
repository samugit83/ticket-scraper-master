import CredentialsProvider from 'next-auth/providers/credentials'
import {VerifyUser} from '@/server_actions/queries'

export const authOptions = {
    callbacks: {
      async jwt({token, trigger, session, user}) {
  
        if(trigger === 'signIn') {  //!! carefull here !! don't put too much stuff in the token because is going to be an header and nginx has size limit
          let { id, email, nome, cognome } = user;   //i only get the usefull attribute from db, that i need in the jwt
          let { name, picture, ...rest } = token; //remove default unused attributes: name, email, picture
          token = {...rest, email, nome, cognome, id } 
        };
  
        if(trigger === 'update') {  //IMPORTANT: every time I add something, it immediately triggers the session as well (so it returns the updated session).
           token = session
        };

        console.log(token)

        return token
      },
      async session({ session, token }) { //So the jwt_helper isn't needed because I always keep the session updated.
        return token;  // this way, I write the token directly into the session, and I can retrieve it both from the server and the client using getSession, useSession, getServerSession, etc.
      }
    }, 
    pages: {signIn: '/auth'}, 
    providers: [
      CredentialsProvider({ 
        name: 'Blockvision',
        secret: process.env.NEXTAUTH_SECRET,
        async authorize(credentials, req) {
          //let user = await VerifyUser(credentials?.email, credentials?.password);
          //return user //restituisce i dati user, che poi vengono scritti nel jwt con la callback JWT
          return {id: 'fsdfdsaf', email: 'dfsfadaf@gmail.com', password: 'fadsfasddasf', nome: 'sdfa', cognome: 'asdfdfadf'}
        }
      }),
    ],
  };

