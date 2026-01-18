import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist.',
  metadataBase: new URL('https://08-zustand-ecru-tau.vercel.app'),

  alternates: {
    canonical: '/404',
  },
  openGraph: {
    title: 'Page not found',
    description: 'The page you are looking for does not exist.',
    url: '/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub - Page not found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};
export default NotFound;
