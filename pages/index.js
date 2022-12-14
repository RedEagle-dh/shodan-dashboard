import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>SHODAN</a>
        </h1>

        <p className={styles.description}>
          Get on the <a href="https://discord.gg/7YPrNdFxWu">Main Server</a>
        </p>

        <div className={styles.grid}>
          <a href="/commands" className={styles.card}>
            <h2>Custom Commands &rarr;</h2>
            <p>Create and Edit your own Commands!</p>
          </a>

          <a href="/announcements" className={styles.card}>
            <h2>Announcements &rarr;</h2>
            <p>Write in a Channel as the Bot</p>
          </a>

          <a
            href="/configuration"
            className={styles.card}
          >
            <h2>Configuration &rarr;</h2>
            <p>Setup your channel configurations.</p>
          </a>

          <a
            href="/features"
            className={styles.card}
          >
            <h2>Features &rarr;</h2>
            <p>
              Settings for some of the features.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
