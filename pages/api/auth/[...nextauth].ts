import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
    Providers.Credentials({
      id: 'login',
      name: 'Login',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.info(credentials);
        // Add logic here to look up the user from the credentials supplied
        let user;
        try {
          user = await prisma.user.findUnique({ where: { email: credentials.email } });
          console.info(user);
        } catch (e) {
          console.log(e);
        }

        let isValid = false;

        if (user && user.password) {
          isValid = await bcrypt.compare(credentials.password, user.password);
        }

        if (user && isValid) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          // return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')); // Redirect to error page
          return Promise.reject('/login?failed=1'); // Redirect to a URL
        }
      },
    }),
    Providers.Credentials({
      id: 'register',
      name: 'Register',

      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async credentials => {
        // Add logic here to look up the user from the credentials supplied
        let user;
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (existingUser) {
            return Promise.reject('/login?error=Existing');
          }

          const password = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.create({
            data: { email: credentials.email, password: password },
          });
        } catch (err) {
          console.log(err);
          return Promise.reject('/login?error=CredentialsSignin');
        }

        return Promise.resolve(user);
      },
    }),
  ],
  session: {
    jwt: true,
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  pages: {
    signIn: '/',
    signOut: '/login',
  },
};
