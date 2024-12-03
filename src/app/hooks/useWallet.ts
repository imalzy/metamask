/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { ethers } from "ethers";

type WalletState = {
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

export const useWallet = (): WalletState => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const ethProvider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      setProvider(ethProvider);

      // Check if already connected
      ethProvider.listAccounts().then((accounts: string | any[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });

      // Listen for account changes
      (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      // Listen for network changes
      (window as any).ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }else{
      console.log("MetaMask is not available in this environment.");
    }
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    if (!provider) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("account informations", accounts);
      setAccount(accounts[0]);
    } catch (error: any) {
      (window as any).ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return { account, provider, connectWallet, disconnectWallet };
};
