const sdk = require('@defillama/sdk');
const LEKKER_TOKEN_CONTRACT = '';
const LEKKER_LEVERAGE_CONTRACT = '';

async function tvl(timestamp, block, chainBlocks) {
  const balances = {};
  const transform = await transformBscAddress();

  const collateralBalance = (await sdk.api.abi.call({
    abi: 'erc20:balanceOf',
    chain: 'bsc',
    target: LEKKER_TOKEN_CONTRACT,
    params: [LEKKER_LEVERAGE_CONTRACT],
    block: chainBlocks['eth'],
  })).output;

  await sdk.util.sumSingleBalance(balances, `eth:{LEKKER_TOKEN_CONTRACT}`, collateralBalance)

  return balances;
}

module.exports = {
  timetravel: true,
  misrepresentedTokens: false,
  methodology: 'counts the number of Leverage tokens in the Lekker Leverage contract.',
  start: 1000235,
  eth: {
    tvl,
  }
};