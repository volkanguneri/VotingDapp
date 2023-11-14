"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Flex } from "@/components/Styles/Flex.styled";

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
    marginInline: "25%",
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // Add more inline styles as needed
    // backgroundColor: "hsl(0, 0%, 90%)",

    // font-family: "Georgia";
    fontFamily: "Garamond",
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
