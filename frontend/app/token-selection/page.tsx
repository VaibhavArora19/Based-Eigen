'use client';

import React, { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import axios from 'axios';
import { ArrowLeft, ChevronRight, Info, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Base chain ID
const BASE_CHAIN_ID = '0x2105'; // 8453 in hexadecimal for wallet_switchEthereumChain
const COVALENT_CHAIN_ID = 8453; // Base chain ID in decimal for Covalent API

// Custom hook for fetching token balances
export function useTokenBalances() {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTokenBalances() {
      if (!authenticated || !wallets || wallets.length === 0) return;

      setIsLoading(true);
      setError(null);

      const userAddress = wallets[0].address;

      // Check cache first
      const cachedTokens = localStorage.getItem(`tokens_${userAddress}`);
      if (cachedTokens) {
        setTokens(JSON.parse(cachedTokens));
        setIsLoading(false);
        return;
      }

      try {
        // Primary method: Covalent API
        await fetchWithCovalent(userAddress);
      } catch (err) {
        console.error('Covalent fetch failed, falling back to token list:', err);
        // Fallback: Base token list
        try {
          await fetchWithBaseTokenList(userAddress);
        } catch (fallbackErr) {
          console.error('Token list fetch failed:', fallbackErr);
          setError(fallbackErr.message || 'Failed to fetch token balances');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokenBalances();
  }, [authenticated, wallets]);

  // Method 1: Fetch tokens using Covalent API
  async function fetchWithCovalent(address) {
    const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
    if (!COVALENT_API_KEY) {
      throw new Error('Covalent API key is not configured');
    }

    try {
      const response = await axios.get(
        `https://api.covalenthq.com/v1/${COVALENT_CHAIN_ID}/address/${address}/balances_v2/`,
        {
          headers: {
            Authorization: `Basic ${btoa(COVALENT_API_KEY + ':')}`,
          },
        }
      );

      if (response.data?.data?.items) {
        const tokenItems = response.data.data.items.filter(
          (item) => parseFloat(item.balance) > 0
        );

        const formattedTokens = tokenItems.map((item) => ({
          id: item.contract_address || 'eth',
          name: item.contract_name || 'Ethereum',
          symbol: item.contract_ticker_symbol || 'ETH',
          address: item.contract_address || '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          decimals: item.contract_decimals || 18,
          balance: ethers.formatUnits(item.balance, item.contract_decimals || 18),
          logoUrl: item.logo_url || null,
          description: item.contract_name ? `A token on the Base network` : 'The native currency of the Base network',
          isNative: item.native_token || false,
        }));

        setTokens(formattedTokens);
        localStorage.setItem(`tokens_${address}`, JSON.stringify(formattedTokens));
      } else {
        throw new Error('Invalid response from Covalent API');
      }
    } catch (error) {
      console.error('Covalent API error:', error);
      throw new Error('Failed to fetch tokens from Covalent');
    }
  }

  // Method 2: Fallback using Base token list
  async function fetchWithBaseTokenList(address) {
    try {
      const tokenListResponse = await axios.get(
        'https://raw.githubusercontent.com/base-org/token-list/main/build/base.tokenlist.json'
      );

      const tokenList = tokenListResponse.data.tokens.filter(
        (token) => token.chainId === COVALENT_CHAIN_ID
      );

      const privyProvider = await wallets[0].getEthereumProvider();
      const provider = new ethers.BrowserProvider(privyProvider);

      // Check ETH balance
      const ethBalance = await provider.getBalance(address);
      let tokensWithBalances = [];

      if (ethBalance > BigInt(0)) {
        tokensWithBalances.push({
          id: 'eth',
          name: 'Ethereum',
          symbol: 'ETH',
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          decimals: 18,
          balance: ethers.formatEther(ethBalance),
          logoUrl: '/images/eth-logo.svg',
          description: 'The native currency of the Base network',
          isNative: true,
        });
      }

      // Check token balances
      const tokenBalancePromises = tokenList.map(async (token) => {
        try {
          const tokenContract = new ethers.Contract(
            token.address,
            ['function balanceOf(address) view returns (uint256)'],
            provider
          );

          const balance = await tokenContract.balanceOf(address);

          if (balance > BigInt(0)) {
            return {
              id: token.address.toLowerCase(),
              name: token.name,
              symbol: token.symbol,
              address: token.address,
              decimals: token.decimals,
              balance: ethers.formatUnits(balance, token.decimals),
              logoUrl: token.logoURI || null,
              description: 'A token on the Base network',
              isNative: false,
            };
          }
          return null;
        } catch (error) {
          console.warn(`Error checking balance for token ${token.symbol}:`, error);
          return null;
        }
      });

      const tokenResults = await Promise.all(tokenBalancePromises);
      const validTokens = tokenResults.filter((t) => t !== null);

      const formattedTokens = [...tokensWithBalances, ...validTokens];
      setTokens(formattedTokens);
      localStorage.setItem(`tokens_${address}`, JSON.stringify(formattedTokens));
    } catch (error) {
      console.error('Token list fetch error:', error);
      throw new Error('Failed to fetch tokens from token list');
    }
  }

  return { tokens, isLoading, error };
}

// Updated DepositPage component
export default function DepositPage() {
  const { user, authenticated, login, ready } = usePrivy();
  const { wallets } = useWallets();
  const { tokens, isLoading: loadingTokens, error: tokenError } = useTokenBalances();
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [depositStep, setDepositStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [networkCorrect, setNetworkCorrect] = useState(false);

  // Check if user is on the correct network (Base)
  useEffect(() => {
    const checkNetwork = async () => {
      if (!authenticated || !wallets || wallets.length === 0) return;
      try {
        const privyProvider = await wallets[0].getEthereumProvider();
        const provider = new ethers.BrowserProvider(privyProvider);
        const network = await provider.getNetwork();
        setNetworkCorrect(network.chainId.toString() === BigInt(parseInt(BASE_CHAIN_ID, 16)).toString());
      } catch (error) {
        console.error('Error checking network:', error);
        setNetworkCorrect(false);
      }
    };
    checkNetwork();
  }, [authenticated, wallets]);

  // Set error message from token fetch error
  useEffect(() => {
    if (tokenError) {
      setErrorMessage(tokenError);
    }
  }, [tokenError]);

  const switchToBaseNetwork = async () => {
    if (!wallets || wallets.length === 0) return;
    try {
      setIsLoading(true);
      const privyProvider = await wallets[0].getEthereumProvider();
      await privyProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_CHAIN_ID }],
      });
      const provider = new ethers.BrowserProvider(privyProvider);
      const network = await provider.getNetwork();
      setNetworkCorrect(network.chainId.toString() === BigInt(parseInt(BASE_CHAIN_ID, 16)).toString());
    } catch (error) {
      console.error('Error switching network:', error);
      setErrorMessage('Failed to switch to Base network. Please try manually switching in your wallet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    setDepositStep(1);
    setErrorMessage('');
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setErrorMessage('');
    }
  };

  const handleMaxAmount = () => {
    setAmount(selectedToken.balance);
  };

  const handleConnect = async () => {
    if (!authenticated) {
      try {
        await login();
      } catch (error) {
        setErrorMessage('Could not connect wallet. Please try again.');
      }
    }
  };

  const handleDeposit = async () => {
    if (!authenticated) {
      setErrorMessage('Please connect your wallet first');
      return;
    }
    if (!networkCorrect) {
      setErrorMessage('Please switch to Base network first');
      return;
    }
    if (!selectedToken) {
      setErrorMessage('Please select a token first');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }
    if (parseFloat(amount) > parseFloat(selectedToken.balance)) {
      setErrorMessage(`You don't have enough ${selectedToken.symbol}. Maximum: ${selectedToken.balance}`);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const privyProvider = await wallets[0].getEthereumProvider();
      const provider = new ethers.BrowserProvider(privyProvider);
      const signer = await provider.getSigner();

      // Simulate deposit (replace with actual contract interaction)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setDepositSuccess(true);
      setDepositStep(2);
    } catch (error) {
      console.error('Deposit error:', error);
      setErrorMessage('There was an error processing your deposit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedToken(null);
    setAmount('');
    setDepositStep(0);
    setDepositSuccess(false);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-md md:max-w-2xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Deposit</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Add funds to your DefiShield account</p>
          </div>

          {/* Card Container */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
            {/* Loading State */}
            {(!ready || (authenticated && networkCorrect && loadingTokens && depositStep === 0)) && (
              <div className="p-8">
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    {!ready ? 'Connecting to your wallet...' : 'Fetching your tokens...'}
                  </p>
                </div>
              </div>
            )}

            {/* Connect Wallet State */}
            {ready && !authenticated && (
              <div className="p-8">
                <div className="text-center py-8 px-4">
                  <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Connect Your Wallet
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Connect your wallet to see your available tokens and make a deposit
                  </p>
                  <button
                    onClick={handleConnect}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors"
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            )}

            {/* Wrong Network Warning */}
            {ready && authenticated && !networkCorrect && (
              <div className="p-8">
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 max-w-2xl mx-auto">
                  <div className="flex items-start mb-4">
                    <AlertCircle className="text-orange-500 mr-3 flex-shrink-0 mt-0.5" size={24} />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        Wrong Network Detected
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">
                        DefiShield operates on the Base network. Please switch your network to continue.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={switchToBaseNetwork}
                    disabled={isLoading}
                    className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Switching...' : 'Switch to Base Network'}
                  </button>
                </div>
              </div>
            )}

            {/* No Tokens Found */}
            {ready &&
              authenticated &&
              networkCorrect &&
              !loadingTokens &&
              tokens.length === 0 &&
              depositStep === 0 && (
                <div className="p-8">
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                      No Tokens Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      We couldn't find any tokens in your wallet on Base network.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      You'll need to transfer some tokens to your wallet before you can make a deposit.
                    </p>
                  </div>
                </div>
              )}

            {/* Token Selection */}
            {ready &&
              authenticated &&
              networkCorrect &&
              !loadingTokens &&
              tokens.length > 0 &&
              depositStep === 0 && (
                <div className="p-8">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Choose a Token
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Select which token you want to deposit:
                  </p>
                  <div className="space-y-3">
                    {tokens.map((token) => (
                      <div
                        key={token.id}
                        onClick={() => handleTokenSelect(token)}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <div className="flex items-center">
                          {token.logoUrl ? (
                            <img
                              src={token.logoUrl}
                              alt={token.symbol}
                              className="w-10 h-10 mr-3 rounded-full"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3 ${
                              token.logoUrl ? 'hidden' : 'flex'
                            }`}
                          >
                            <span className="font-bold text-sm">{token.symbol.substring(0, 3)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{token.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              {parseFloat(token.balance).toFixed(4)} {token.symbol}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-400" size={20} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Amount Input */}
            {ready && authenticated && networkCorrect && depositStep === 1 && selectedToken && (
              <div className="p-8">
                <button
                  onClick={() => setDepositStep(0)}
                  className="flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline"
                >
                  <ArrowLeft className="mr-1" size={16} /> Back to tokens
                </button>
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Enter Amount
                </h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                  <div className="flex items-center mb-2">
                    {selectedToken.logoUrl ? (
                      <img
                        src={selectedToken.logoUrl}
                        alt={selectedToken.symbol}
                        className="w-8 h-8 mr-2 rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-2 ${
                        selectedToken.logoUrl ? 'hidden' : 'flex'
                      }`}
                    >
                      <span className="font-bold text-xs">{selectedToken.symbol.substring(0, 3)}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedToken.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Available balance:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {parseFloat(selectedToken.balance).toFixed(6)} {selectedToken.symbol}
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Amount to deposit:
                  </label>
                  <div className="flex relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-l-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-r-xl flex items-center font-medium text-gray-900 dark:text-white">
                      {selectedToken.symbol}
                    </div>
                    <button
                      onClick={handleMaxAmount}
                      className="absolute right-24 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded font-medium hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Enter the amount you wish to deposit into DefiShield
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
                  <div className="flex items-start">
                    <Info className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm text-gray-700 dark:text-blue-200 font-medium mb-1">
                        Protected by DefiShield
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Your assets will be protected by our protocol and you can claim compensation in
                        case of rug pulls or hacks.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDeposit}
                  disabled={isLoading}
                  className={`w-full p-4 rounded-xl font-medium text-lg transition-colors ${
                    isLoading
                      ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Deposit Now'}
                </button>
              </div>
            )}

            {/* Success State */}
            {depositStep === 2 && depositSuccess && (
              <div className="p-8">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-green-500 dark:text-green-400" size={42} />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Deposit Successful!
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 max-w-xs mx-auto">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {parseFloat(amount).toFixed(6)} {selectedToken?.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Status:</span>
                      <span className="text-green-500 font-medium">Completed</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your deposit has been processed and your assets are now protected by DefiShield.
                  </p>
                  <button
                    onClick={resetForm}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Make Another Deposit
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="px-8 pb-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl text-red-700 dark:text-red-300 flex items-start">
                  <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}
          </div>

          {/* Help Box */}
          <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Need Help?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              If you're having trouble with your deposit or have any questions, our support team is
              here to help.
            </p>
            <div className="mt-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}