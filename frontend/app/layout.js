"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// import { GlobalStyles } from "./global.styled";

const { chains, publicClient } = configureChains([hardhat], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "48850a402642441a360aaf998ac21039",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export default function RootLayout({ children }) {
  const bodyStyle = {
    marginInline: "20%",
    marginTop: "2rem",
    // Add more inline styles as needed
  };

  return (
    <html lang="en">
      {/* <GlobalStyles> */}
      <body style={bodyStyle}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
        </WagmiConfig>
        {/* </GlobalStyles> */}
      </body>
    </html>
  );
}
