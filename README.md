This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This is a simple web app that fetches data from a remote API and displays them in charts.

It uses Next.js & on the backend and React with AntD and AntV components on the frontend, with a PostgreSQL database with Drizzle, using tRPC & react query for communication.


### To run the app:

If you are running it on localhost, change the backend URL in charts/src/app/clients/trpcClient.tsx to the one hidden in the comment
and run: 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### The app is deployed on vercel on this url:
Open [https://unicorn-charts.vercel.app/](https://unicorn-charts.vercel.app/) with your browser to see the result.


#### Note: To make this app more professional, it would be nice to refactor the main page.tsx a bit more and fix
the rendering of the like button to make it more seamless - it works correctly in the background but sometimes it doesn't show properly to the user.
