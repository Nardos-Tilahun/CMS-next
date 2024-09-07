import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    // Credentials({
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'Email' },
    //     password: {
    //       label: 'Password',
    //       type: 'password',
    //       placeholder: 'Password',
    //     },
    //   },
    //   async authorize(credentials) {
    //     let user = null;
    // if (!credentials?.username || !credentials?.password) {
    //   return null;
    // }
    // Replace this with your actual API call logic
    // const response = await fetch('your-api-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: credentials.username,
    //     password: credentials.password,
    //   }),
    // });
    // if (!response.ok) {
    //   return null;
    // }
    // const user = await response.json();
    // user = {
    //   id: 1,
    //   name: 'John Doe',
    //   email: 'john@email.com',
    // };
    // if (!user) {
    //   return null;
    // }

    // return user;
    //   },
    // }),
  ],
});
/**
 * If the user object is null or undefined, we return null, which will
 * cause NextAuth to not log the user in.
 */
/**
 * If the login is successful, return the user object. This will cause
 * NextAuth to log the user in.
 */
