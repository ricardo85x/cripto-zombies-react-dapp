import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from "web3modal";

import { ZombieContracts as ZombieContractsRaw } from "./solidity/config"

interface ZombieContractsProps {
  ZombieOwnership: {
    address: string,
    abi: any
  }
}

const ZombieContracts: ZombieContractsProps = ZombieContractsRaw

interface ZombieProps {
  dna: number,
  name: string,
  level: number,
  readyTime: number,
  winCount: number,
  lossCount: number
}

interface ZombieFactoryContractProps {
  methods: {
    createRandomZombie: Function,
    ownerZombieCount: Function,
    zombies: (id: number) => { call: () => ZombieProps },
    zombieToOwner : (id: number) => { call: () => string },
    getZombiesByOwner : (owner: string) => { call: () => Array<number> },
    
  },
}

function App() {

  const [accountAddress, setAccountAddress] = useState<string>()
  const [zombieFactory, setZombieFactory] = useState<ZombieFactoryContractProps>()
  const [zombie_name, setZombieName] = useState<string>("NoName")
  const [nZombies, setNZombies] = useState(0)
  const [zombieArmy, setZombieArmy] = useState<ZombieProps[]>([])
  const [web3Enabled, setWeb3Enabled] = useState(false)


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

      setZombieFactory(_zombieFactory)
      setAccountAddress(_accounts[0])
      setWeb3Enabled(true)

      provider.on("accountsChanged", (accounts: string[]) => {
        console.log("accountsChanged", accounts);
        setAccountAddress(accounts[0])
      });
      
      // Subscribe to chainId change
      provider.on("chainChanged", (chainId: number) => {
        console.log("chainChanged", chainId);
      });
      
      // Subscribe to provider connection
      provider.on("connect", (info: { chainId: number }) => {
        console.log("connect", info);
      });
      
      // Subscribe to provider disconnection
      provider.on("disconnect", (error: { code: number; message: string }) => {
        console.log("disconnect", error);
      });

    }
  }

  useEffect(() => {
    displayZombies()
  }, [accountAddress])

  const displayZombies = async () => {
    if (accountAddress){
      const ids = await getZombiesByOwner(accountAddress);
      if (ids) {
        const army :Array<ZombieProps> = []
        for ( const id of ids ) {
          const zombie = await getZombiesDatails(id);
          if (zombie) {
            army.push(zombie)
          }
        }
        setZombieArmy(army);
      }
    }
  }


  const getZombiesDatails =  (id: number) => {
    return zombieFactory?.methods.zombies(id).call()
  }

  const zombieToOwner = (id: number) => {
    return zombieFactory?.methods.zombieToOwner(id).call()
  }

  const getZombiesByOwner = (owner: string) => {
    return zombieFactory?.methods.getZombiesByOwner(owner).call()
  }

  const ownerZombieCount = async (accountAddress: string) => {
    return zombieFactory?.methods.ownerZombieCount(accountAddress).call()
  }

  const createZombie = async () => {
    if (nZombies == 0) {
      zombieFactory?.methods.createRandomZombie(zombie_name).send( { 
        from: accountAddress,
        gas: 221000,
        gasPrice: 20000000000
      }).once('receipt', (receipt: any) => {
        console.log(receipt)
        const { status } = receipt
        if ( status ){
          setNZombies(1)
          displayZombies()
        }
      })
    }
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
            <h3>My Address: {accountAddress}</h3>

            <div>
            { zombieArmy.map( zombie => (
                <ul key={zombie.dna}>
                  <li>Name: {zombie.name}</li>
                  <li>DNA: {zombie.dna}</li>
                  <li>Level: {zombie.level}</li>
                  <li>Wins: {zombie.winCount}</li>
                  <li>Losses: {zombie.lossCount}</li>
                  <li>Ready Time: {zombie.readyTime}</li>
                </ul>

            ) )}
            </div>

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
