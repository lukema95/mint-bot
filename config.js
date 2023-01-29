export const config = {
  // mainnet or testnet
  network: 'testnet',
  // contract address
  address: '0x3cf78e4e213782871a16c7f5d8e032092c547238', 
  // rotation interval(mm)
  interval: 1000,
  // start mint time(timestamp, mm)
  startTime: 1673115721000,
  // mint args
  args: ['123456', 2],
  // 300Gwei
  maxFeePerGas: 300000000000,
  // 200Gwei
  maxPriorityFeePerGas: 200000000000,
  // mint value, ether
  value: '0.0001',
  // contract abi
  abi: [
    'function publicSaleMint(uint256, uint256) external payable',
    'function totalSupply() public view override returns (uint256)'
  ],
}