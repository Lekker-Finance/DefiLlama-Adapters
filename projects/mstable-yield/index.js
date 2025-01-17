const sdk = require('@defillama/sdk')

const vaults = [
  '0x9614a4C61E45575b56c7e0251f63DCDe797d93C5', // 3CRV
]

module.exports = {
  ethereum: {
    tvl: async (_, block) => {
      const totalAssets = await sdk.api2.abi.multiCall({
        abi: abis.totalAssets, calls: vaults,block,
      })
      const asset = await sdk.api2.abi.multiCall({
        abi: abis.asset, calls: vaults,block,
      })

      const balances = {}
      vaults.map((_,i) => sdk.util.sumSingleBalance(balances,asset[i],totalAssets[i], 'ethereum'))
      return balances
    }
  }
}

const abis = {
  totalAssets: {"inputs":[],"name":"totalAssets","outputs":[{"internalType":"uint256","name":"totalManagedAssets","type":"uint256"}],"stateMutability":"view","type":"function"},
  asset: {"inputs":[],"name":"asset","outputs":[{"internalType":"address","name":"assetTokenAddress","type":"address"}],"stateMutability":"view","type":"function"},
}