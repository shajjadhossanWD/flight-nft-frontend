import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import swal from 'sweetalert';
import { contractABI, contractAddress, tokenAddress, tokenABI } from '../utils/constant';

export const FlightNFTContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const MintNFTContract = new ethers.Contract(contractAddress, contractABI, signer);

  return MintNFTContract;
}

const gettokenContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

  return tokenContract;
}

export default function FlightNFTProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [user1, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [Id, setId] = useState();
  const [chains, setChains] = useState('');
  const [payAmount, setPayAmount] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [metamaskBalance, setMetamaskBalance] = useState({});
  window.addEventListener('load', () => {
    setPageLoading(false);
  });

 

  const logOut = async () => {
    setCurrentAccount(null);
    setUser({});
    await axios.post("https://backend.grighund.net/api/users/logout", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => console.log(res.data.message))
    localStorage.removeItem("token");
    // await logout();
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) {
        return console.log("please use metamask")
      }
      //  return swal({
      //   title: "Attention",
      //   text: "Please use Metamask browser to access Dapps of https://grighund.net. You can access normally after pressing OK.",
      //   icon: "warning",
      //   button: "OK",
      //   dangerMode: true,
      //   className: "modal_class",

      // });

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    const tokenContract = gettokenContract();
    const balance = await tokenContract.balanceOf(currentAccount);
    const amount = ethers.utils.formatEther(balance);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balance1 = await provider.getBalance(currentAccount)
    const metamask = {
      usdsc: amount,
      bnb: ethers.utils.formatEther(balance1)
    }
    return setMetamaskBalance(metamask);
  }

  useEffect(() => {
    if (user1.walletAddress) {
      getBalance();
    }
  }, [user1])

  const connectWallet = async (wallet) => {
    try {
      if (window.innerWidth < 576 && !ethereum) {
        return swal({
          title: "Attention",
          text: "Please use Metamask browser!",
          icon: "warning",
          button: "OK",
          dangerMode: true,
          className: "modal_class",
        });
      }
      if (!ethereum) {
        return console.log("please use metamask")
      }
      if (wallet === "Metamask") {
        setLoading(true);
        // return swal({
        //   title: "Attention",
        //   text: "Please use Metamask browser to access Dapps of https://grighund.net. You can access normally after pressing OK.",
        //   icon: "warning",
        //   button: "OK",
        //   dangerMode: true,
        //   className: "modal_class",
        // });
        const chainid = await window.ethereum.request({ method: 'eth_chainId' });
        console.log("This is Chain ID: ", chainid)
        setChains(chainid);
        if (chainid === "0x38" || chainid === "0x61") {
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
          setCurrentAccount(accounts[0]);

          await axios.post(`https://backend.grighund.net/api/users/`, {
            walletAddress: accounts[0],
          })
            .then((res) => {
              if (res.data.user) {
                setUser(res.data.user);
                setLoading(false);
                localStorage.setItem("token", res.data.token);
                const wrapper = document.createElement('div');
                wrapper.innerHTML = `<p class='text-break text-white fs-6'>You have succesfully logged in with <br/>Binance Chain.</p>`;
                return swal({
                  title: "Success",
                  // text: "You have succesfully logged in with Binance Chain.",
                  content: wrapper,
                  icon: "success",
                  button: "OK",
                  // dangerMode: true,
                  className: "modal_class_success",
                });
              }
            });

        }
        else {
          swal({
            title: "Attention",
            text: "Please change to Binance Chain before connecting.",
            icon: "warning",
            button: "OK",
            dangerMode: true,
            className: "modal_class",
          });
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }

  };


  const setID = async () => {
    try {
      if (ethereum) {
        const MintNFTContract = getEthereumContract();
        const ID = await MintNFTContract.totalSupply();
        setId(ID.toString());
        // console.log("This is ID in setID: " + ID);
        // console.log("This is Id in setID: " + Id);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, [])


  useEffect(() => {
    if (currentAccount && localStorage.getItem("token")) {
      setLoading(true);
      axios.get(`https://backend.grighund.net/api/users/${currentAccount}`, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(res => {
          setUser(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentAccount]);

  return (
    <FlightNFTContext.Provider value={{
      connectWallet,
      currentAccount,
      user1,
      setUser,
      logOut,
      loading,
      contractAddress,
      Id,
      setID,
      chains,
      pageLoading,
      payAmount,
      setPayAmount,
      getBalance,
      metamaskBalance,
    }}>
      {children}
    </FlightNFTContext.Provider>
  )
}