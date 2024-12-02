import React from "react";
import WalletConnect from "./components/WalletConnect";

const Home: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Connect to MetaMask</h1>
      <WalletConnect />
    </div>
  );
};

export default Home;
