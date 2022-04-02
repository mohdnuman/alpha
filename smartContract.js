const Web3 = require("web3");

const stakingAbi = require("./abi.json");
const tokenAbi=require("./abi2.json")
;
const readline = require("readline-sync");

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

const alphaStaking="0x2aA297c3208bD98a9a477514d3C80ace570A6deE";
const token="0xa1faa113cbE53436Df28FF0aEe54275c13B40975"

const stakingInstance = new web3.eth.Contract(
  stakingAbi,
  alphaStaking
);
const tokenInstance = new web3.eth.Contract(
  tokenAbi,
  token
);

async function getBalance() {
  let address = readline.question("enter address:");
  console.log("ALPHA staking:");

  const decimals=await tokenInstance.methods.decimals().call();
  const stake= await stakingInstance.methods.getStakeValue(address).call();

  const balance=(stake/(10**decimals)).toFixed(2)

  console.log('balance:',balance,'ALPHA');

}

getBalance();

