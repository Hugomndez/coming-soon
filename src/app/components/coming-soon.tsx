import styles from './coming-soon.module.css';

export default function ComingSoon() {
  const currentYearDate = new Date().getFullYear();

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <img
          src='/images/logo.svg'
          alt='Ping logo'
          width='86'
          height='26'
          decoding='async'
          fetchPriority='high'
          className={styles.logo}
        />
        <h1 className={styles.title}>
          We are launching <span>soon!</span>
        </h1>
        <p className={styles.subTitle}>Subscribe and get notified</p>
        {/* <SubscribeForm client:load /> */}
      </div>
      <span className={styles.copyright}>
        &copy; {currentYearDate} Copyright Ping. All rights reserved.
      </span>
    </main>
  );
}
