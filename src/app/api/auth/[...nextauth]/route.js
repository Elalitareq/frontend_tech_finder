import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // onSignIn: onSignIn,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password123",
        },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            `${process.env.EXPRESS_BACKEND_API_URL}/user/login`,
            { email: credentials.email, password: credentials.password },
            { withCredentials: true }
          );
          let user = response.data.user;

          if (user) {
            return {
              id: +user._id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              role: user.role,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            }
          }
        } catch (e) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// function onSignIn(googleUser) {
//   const googleId = googleUser.getAuthResponse().id_token;
//   const email = googleUser.getEmail();

//   axios.post(`${process.env.EXPRESS_BACKEND_API_URL}/user/google/login`, {
//     googleId,
//     email,
//   });
// }
