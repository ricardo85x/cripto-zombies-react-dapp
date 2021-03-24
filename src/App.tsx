import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from "web3modal";

import { ZombieContracts as ZombieContractsRaw } from "./solidity/config"

interface ZombieContractsInterface {
  ZombieOwnership: {
    address: string,
    abi: any
  }
}

const ZombieContracts: ZombieContractsInterface = ZombieContractsRaw

interface ZombieInterface {
  dna: number,
  name: string,
  level: number,
  readyTime: number,
  winCount: number,
  lossCount: number
}

interface ZombieFactoryContractInterface {
  methods: {
    createRandomZombie: Function,
    ownerZombieCount: Function,
    zombies: (id: number) => { call: () => ZombieInterface }
  },
}

function App() {

  const [accountAddress, setAccountAddress] = useState<string>()
  const [zombieFactory, setZombieFactory] = useState<ZombieFactoryContractInterface>()
  const [zombie_name, setZombieName] = useState<string>("NoName")
  const [nZombies, setNZombies] = useState(0)
  const [web3Enabled, setWeb3Enabled] = useState(false)

  useEffect(() => {

  },[])

  const connectWeb3 = async () => {

    const providerOptions = {
      metamask: {
        id: "injected",
        name: "MetaMask",
        type: "injected",
        check: "isMetaMask",
        package: null,
      }
    };
    
    const web3Modal = new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });
    
    const provider = await web3Modal.connect();

    if (provider){
      const web3 = new Web3(provider);
      const _accounts = await web3.eth.getAccounts()
      const _zombieFactory = new web3.eth.Contract(
        ZombieContracts.ZombieOwnership.abi, 
        ZombieContracts.ZombieOwnership.address
      )
      const _nZombies :number = await _zombieFactory?.methods.ownerZombieCount(_accounts[0]).call()
      
      if (_nZombies) {
        setNZombies(_nZombies)
      }

      setAccountAddress(_accounts[0])
      setZombieFactory(_zombieFactory)
      setWeb3Enabled(true)
    }
  }

  const getZombiesDatails = (id: number) => {
    return zombieFactory?.methods.zombies(id).call()
  }

  const createZombie = async () => {

    if (nZombies == 0) {
      zombieFactory?.methods.createRandomZombie(zombie_name).send( { 
        from: accountAddress,
        gas: 221000,
        gasPrice: 20000000000
      }).once('receipt', (receipt: any) => {
        console.log(receipt)
      })
    }

  }


  const showFactory = async () => {
    console.log(zombieFactory)

    const nZombies = await zombieFactory?.methods.ownerZombieCount(accountAddress).call()
    console.log(nZombies)
  }

  return (
    <div className="App">
      <h1>Hello Reacto Zombies</h1>

      {
        !web3Enabled && <button onClick={connectWeb3}>Connect</button>
      }

      {
        web3Enabled && (
          <>
            <h3>Address: {accountAddress}</h3>

            <button onClick={() => showFactory()}>Debug Factory</button>
            
            { nZombies == 0 && ( 
              <div>
                <input type="text" onChange={(el) => setZombieName(el.target.value)} />
                <button onClick={() => createZombie()}>Create Random Zombie</button>
              </div>
            )} 

          </>
        )
      }

    </div>
  );
}

export default App;
