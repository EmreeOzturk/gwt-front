import "@/styles/globals.css";
import "reactflow/dist/style.css";
import type { AppProps } from "next/app";
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import Script from "next/script";
import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '@/ni18n.config.ts';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Script src="/script.js"></Script>
    </Provider>
  );
}

export default appWithI18Next(App, ni18nConfig);