import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { loginWithGoogle, signIn } from "@/pages/services/user.services";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Crendetianls",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.id = user.user_id;
        token.email = user.email;
        token.name = user.name;
        token.phone = user.phone;
        token.gender = user.gender;
        token.role = user.role;
        // token.image = user.link;
      }
      if (account?.provider === "google") {
        const data = {
          name: user.name,
          email: user.email,
          // image: user.image,
          type: "google",
        };
        // console.log(user)
        await loginWithGoogle(data, (datas: any) => {
          console.log(data);
          console.log(datas);
          token.name = datas.name;
          token.email = datas.email;
          // token.image = datas.image;
          token.role = datas.role;
          token.id = datas.user_id;
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("gender" in token) {
        session.user.gender = token.gender;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      // if ("image" in token) {
      //   session.user.image = token.image;
      // }
      // console.log(token.id);
      // console.log(session.user.id);
      const accessToken = jwt.sign(
        token,
        process.env.NEXT_PUBLIC_SECRET || "",
        { algorithm: "HS256" }
      );

      session.accessToken = accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
