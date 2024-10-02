import logo from '@/public/images/logo.svg';
import Image from 'next/image';
import { SubscriptionForm } from '../SubscriptionForm';
import styles from './coming-soon.module.css';

export default function ComingSoon() {
  const currentYearDate = new Date().getFullYear();

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Image
          className={styles.logo}
          alt='Ping Logo'
          src={logo}
          priority
        />
        <h1 className={styles.title}>
          We are launching <span>soon!</span>
        </h1>
        <p className={styles.subTitle}>Subscribe and get notified</p>
        <SubscriptionForm />
      </div>
      <span className={styles.copyright}>
        &copy; {currentYearDate} Copyright Ping. All rights reserved.
      </span>
    </main>
  );
}
