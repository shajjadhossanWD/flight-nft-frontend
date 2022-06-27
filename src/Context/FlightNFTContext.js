import React, { createContext, useState, useEffect } from "react";
import swal from 'sweetalert';
import axios from 'axios';

export const FlightNFTContext = createContext();

const { ethereum } = window;


export default function FlightNFTProvider({ children }) {
    const [loginModal, setLoginModal] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [chain, setChain] = useState(null);

    const openLoginModal = () => setLoginModal(true);
    const closeLoginModal = () => setLoginModal(false);

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

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) {
                return console.log("please use metamask")
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                const chainid = await window.ethereum.request({ method: 'eth_chainId' });
                setChain(chainid);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

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

                const chainid = await window.ethereum.request({ method: 'eth_chainId' });
                console.log("This is Chain ID: ", chainid)
                setChain(chainid);
                if (chainid === "0x38" || chainid === "0x61") {
                    const accounts = await ethereum.request({ method: "eth_requestAccounts", });
                    setCurrentAccount(accounts[0]);

                    await axios.post(``, {
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
    }

    const logOut = async () => {
        setCurrentAccount(null);
        setUser({});
        localStorage.removeItem("token");
    };

    return (
        <FlightNFTContext.Provider value={{
            loginModal,
            openLoginModal,
            closeLoginModal,
            connectWallet,
            currentAccount,
            loading,
            user,
            setUser,
            chain,
            logOut
        }}>
            {children}
        </FlightNFTContext.Provider>
    )
}
