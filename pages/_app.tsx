import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "./components/Providers";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/UserContext";


export default function App({ Component, pageProps }: AppProps) {
  return (
      <UserProvider>
      <Providers>
<Component {...pageProps} />;
      <Toaster position="top-right" />

</  Providers>
  </UserProvider>
  )

}
