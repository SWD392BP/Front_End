import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: "823138256860-ul3kcmrmiu6i30on6v61f561pt85ebik.apps.googleusercontent.com",
        clientSecret: "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",
    }),
  ],
});

export { handler as GET, handler as POST };
