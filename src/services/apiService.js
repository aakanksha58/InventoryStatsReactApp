import axios from "axios";

const API_URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

  
export const fetchInventory = async () => {
    try {
      const response = await axios.get(API_URL);
      // Add an id to each product if it's missing
      const productsWithId = response.data.map((product, index) => ({
        ...product,
        id: index, // or use some other unique identifier if available
      }));
      return productsWithId;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      throw error;
    }
  };