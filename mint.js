import * as ethers from 'ethers'
import * as dotenv from "dotenv";
import { config } from './config.js' 
dotenv.config({ path:'.env' });


const rpc = config.network == 'mainnet' ?  process.env.MAINNET_ALCHEMY_API :  process.env.GOERLI_ALCHEMY_API

const privateKeys = config.network == 'mainnet' ? process.env.MAINNET_PRIVATE_KEY.split(',') : process.env.GOERLI_PRIVATE_KEY.split(',')

const provider = new ethers.providers.JsonRpcBatchProvider(rpc)

const sendTx = async (key) => {
  // // query current gas price 
  // const gasPrice = await provider.getGasPrice()
  // console.log("current gas price: ", gasPrice.toNumber())
  
  // // query current fee data
  // const feeData = await provider.getFeeData()
  // console.log("last base fee per gas: ", feeData.lastBaseFeePerGas.toNumber())
  // console.log("current max priority per gas: ", feeData.maxPriorityFeePerGas.toNumber())
  // // maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas
  // console.log("current max fee per gas: ", feeData.maxFeePerGas.toNumber())

  // const supply = await contract.totalSupply()
  // console.log("contract current supply: ", supply.toNumber())


  console.log('key: ', key)
  const wallet = new ethers.Wallet(key, provider)
  console.log('address: ', wallet.address)
  const contract = new ethers.Contract(config.address, config.abi, wallet)

  // The name of the contract function to be called is changed to the name of the function you want to call
  return contract.publicSaleMint(
    ...config.args,
    {
      maxFeePerGas: config.maxFeePerGas,
      maxPriorityFeePerGas: config.maxPriorityFeePerGas,
      value: ethers.utils.parseEther(config.value),
    }
  );

  // const receipt = await tx.wait()
  // if (receipt) {
  //   console.log('mint successful! tx hash: ', tx.hash)
  // }else{
  //   console.log('mint failed!')
  // }
  
}

let pool = [];

for (let key of privateKeys) {
  pool.push(sendTx(key));
}

const mint = () => {
  const now = Date.parse(new Date());
  if (now >= config.startTime) {
    console.log('========= start send tx ========')
    Promise.all(pool).then((txs) => {
      for (let tx of txs) {
        console.log('send tx hash: ', tx.hash);
        const res = tx.wait();
        res.then(data => {
          console.log('mint successful! tx hash: ', tx.hash);
          clearInterval(interval);
          return;
        }).catch(err => {
          console.log('err: ', err);
          clearInterval(interval);
          return;
        })
      }
    })

  }else {
    console.log('now is: ', now)
  }

  clearInterval(interval);
}

var interval = setInterval(mint, config.interval)
