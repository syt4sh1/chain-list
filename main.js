// Import necessary libraries and dependencies
const Web3 = require('web3');
const contractAbi = require('./ChainList.json'); // ABI of the smart contract
const contractAddress = '0xYourContractAddress'; // Replace with the actual contract address
const EthereumTx = require('ethereumjs-tx').Transaction;

// Initialize Web3 with a provider (e.g., MetaMask or a local node)
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Create an instance of the smart contract
const chainListContract = new web3.eth.Contract(contractAbi, contractAddress);

// Define the account that will interact with the contract
const yourAccountAddress = '0xYourAccountAddress'; // Replace with your actual Ethereum address
const privateKey = Buffer.from('YourPrivateKeyWithout0x', 'hex'); // Replace with your private key

// Function to create a new listing in the chain-list
async function createListing(title, description, price) {
  try {
    const nonce = await web3.eth.getTransactionCount(yourAccountAddress);
    const gasPrice = await web3.eth.getGasPrice();

    const txData = chainListContract.methods.createListing(title, description, web3.utils.toWei(price, 'ether')).encodeABI();
    const txParams = {
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: 2000000,
      to: contractAddress,
      data: txData,
    };

    const tx = new EthereumTx(txParams, { chain: 'ropsten' }); // Change to 'mainnet' for the Ethereum mainnet
    tx.sign(privateKey);

    const serializedTx = tx.serialize();
    const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

    console.log('Listing created:', receipt);
  } catch (error) {
    console.error('Error creating listing:', error);
  }
}

// Function to retrieve a listing by its ID
async function getListing(listingId) {
  try {
    const listing = await chainListContract.methods.getListing(listingId).call();
    console.log('Listing:', listing);
  } catch (error) {
    console.error('Error retrieving listing:', error);
  }
}

// Example usage
createListing('Item Title', 'Item Description', '0.1'); // Create a new listing
getListing(0); // Retrieve the listing with ID 0
