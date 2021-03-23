import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import { ZombieContracts as ZombieContractsRaw } from "./solidity/config"

interface ZombieContractsInterface {
  ZombieOwnership: {
    address: string,
    abi: any
  }
}

const ZombieContracts: ZombieContractsInterface = ZombieContractsRaw

interface AccountInterface {
  address: string,
}

interface ZombieFactoryContract {
  methods: {
    createRandomZombie: Function,
    ownerZombieCount: Function
  },
}

interface ZombieInterface {
  name: string,
  level: number
}



function App() {

  const [account, setAccount] = useState<AccountInterface>({ address: ''})
  const [zombieFactory, setZombieFactory] = useState<ZombieFactoryContract>()

  const [zombie_name, setZombieName] = useState<string>("NoName")

  const [zombieArmy, setZombieArmy] = useState<ZombieInterface[]>([])

  const [web3, setWeb3] = useState<Web3>()

  useEffect(() => {

 // const _web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const _web3 = new Web3("http://localhost:7545")

    _web3.eth.getAccounts().then((response: Array<string> ) => {
      setAccount({ address: response[1]})
      setZombieFactory( 
        new _web3.eth.Contract(
          ZombieContracts.ZombieOwnership.abi, 
          ZombieContracts.ZombieOwnership.address
        )
      )
      setWeb3(_web3)
    })

  },[])


  const createZombie = async () => {

    zombieFactory?.methods.createRandomZombie(zombie_name).send( { 
      from:account.address,
      gas: 1500000,
      gasPrice: '30000000000000'
    }).once('receipt', (receipt: any) => {
      console.log(receipt)
    })
  }


  const showFactory = async () => {
    console.log(zombieFactory)

    const nZombies = await zombieFactory?.methods.ownerZombieCount(account.address).call()
    console.log(nZombies)

  }

  return (
    <div className="App">
      <h1>Hello Reacto Zombies</h1>
      <h3>Address: {account.address}</h3>


      <button onClick={() => showFactory()}>Debug Factory</button>
      <hr/>
      <input type="text" onChange={(el) => setZombieName(el.target.value)} />
      <button onClick={() => createZombie()}>Create Random Zombie</button>

    </div>
  );
}

export default App;
