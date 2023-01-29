export const config = {
  // mainnet or testnet
  network: 'testnet',
  // contract address
  address: '0x7b7917e083cea6d9f6a3060a7330c1072fcb4e40', 
  // rotation interval(mm)
  interval: 100,
  // start mint time(timestamp, mm)
  startTime: 1673115721000,
  // mint args
  args: [408],
  // 300Gwei
  maxFeePerGas: 300000000000,
  // 200Gwei
  maxPriorityFeePerGas: 200000000000,
  // mint value, ether
  value: '0.12',
  // contract abi
  abi: [
    'function purchase(uint256) external payable returns (uint256)',
  ],
}