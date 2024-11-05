import logo from '@/public/images/logo.svg';
import Image from 'next/image';
import { SubscriptionForm } from '../SubscriptionForm';
import styles from './coming-soon.module.css';

export default function ComingSoon() {
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
      <span className={styles.attribution}>
        Challenge by{' '}
        <a
          href='https://www.frontendmentor.io?ref=challenge'
          target='_blank'>
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a
          href='https://hugomendez.dev'
          target='_blank'>
          Hugo Méndez
        </a>
        .
      </span>
    </main>
  );
}
