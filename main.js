// Import necessary dependencies
const axios = require('axios');
const { validateInput } = require('./utils');

// Define the MasterOracleLib class
class MasterOracleLib {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.masteroracle.io/v1';
  }

  // Define a method to fetch data from the API
  async fetchData(symbol, timeframe) {
    try {
      // Validate input
      validateInput(symbol, timeframe);

      // Make an API request
      const response = await axios.get(`${this.baseUrl}/data`, {
        params: {
          symbol,
          timeframe,
          apiKey: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  // Add more methods as needed
}

// Export the MasterOracleLib class
module.exports = MasterOracleLib;
