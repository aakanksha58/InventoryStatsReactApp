import axios from "axios";

const API_URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

  
export const fetchInventory = async () => {
    try {
      const response = await axios.get(API_URL);
      const productsWithId = response.data.map((product, index) => ({
        ...product,
        id: index, 
      }));
      return productsWithId;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      throw error;
    }
  };