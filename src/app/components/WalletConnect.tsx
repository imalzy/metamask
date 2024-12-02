"use client";

import React from "react";
import { useWallet } from "../hooks/useWallet";
import Image from "next/image";

const WalletConnect: React.FC = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <button className="hover:border-b" onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button className="border border-white p-4 hover:bg-white hover:text-black flex items-center gap-2" onClick={connectWallet}>Connect to MetaMask
          <Image src={"/metamask.svg"} alt="MetaMask Logo" width={24} height={24} />
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
