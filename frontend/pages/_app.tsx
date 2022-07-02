import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '../redux/store';
import { Api } from '../services/api';
import '../styles/app.scss';
import '../styles/_helpers.scss';
import { setUserData } from '../redux/User/slice';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Read manga online - ReManga</title>
        <meta name='description' content='ReManga' />
        <link rel='icon' href='/icon.png' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const userData = await Api(ctx).user.getCurrentUser();

        store.dispatch(setUserData(userData));
      } catch (err) {
        console.log(err);
      }

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
        state: ctx.store,
      };
    }
);

export default wrapper.withRedux(App);
