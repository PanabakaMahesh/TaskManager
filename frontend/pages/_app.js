import { Provider } from "react-redux";
import store from "../store"; // Ensure this path is correct

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
