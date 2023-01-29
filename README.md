# config
Create an .env file and configure the private key and node api of the account in the file:
```
# private key
GOERLI_PRIVATE_KEY='PRIVATE_KEY1,PRIVATE_KEY_2'
MAINNET_PRIVATE_KEY='PRIVATE_KEY1,PRIVATE_KEY_2'

# alchemy api
# details: https://dashboard.alchemy.com/
GOERLI_ALCHEMY_API='https://eth-goerli.g.alchemy.com/v2/{YOUR_API_KEY}'
MAINNET_ALCHEMY_API='https://eth-mainnet.g.alchemy.com/v2/{YOUR_API_KEY}'

```

Locate the following code in the mint.js file and change the function name:

```
  // The name of the contract function to be called is changed to the name of the function you want to call
  return contract.publicSaleMint(
    ...config.args,
    {
      maxFeePerGas: config.maxFeePerGas,
      maxPriorityFeePerGas: config.maxPriorityFeePerGas,
      value: ethers.utils.parseEther(config.value),
    }
  );
```
Finally, you need to modify the specific parameter configuration in config.js according to the actual situation.

# run
```shell
node mint.js
```

