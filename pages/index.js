import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Dummy Website</title>
        <meta
          name="description"
          content="This is a dummy website built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to My Dummy Website!</h1>

        <p>
          This is a simple Next.js application.
        </p>
      </main>

      <footer>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by Vercel
        </a>
      </footer>
    </div>
  );
}
