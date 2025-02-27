import products from "../../db/products";

  const mockFetchProducts=async (query)=>{
    return await restApi(products,query)
    
  }

  const mockSearchProducts = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        resolve({
          success: true,
          status:200,
          message: "Operation successfull",
          data:filteredProducts
        });
      }, 500);
    });
  };

  const restApi = async (data,query="") => {
    return new Promise((resolve, reject) => {
     setTimeout(() => {
        if (!data) {
          reject({ success:false,status:500,message:"Opertion unsuccessfull"});
        } else {
          const filteredProduct=query === "" ?data:data.filter((items=>{
           return items.title.toLowerCase().includes(query.toLowerCase())||items.brand.toLowerCase().includes(query.toLowerCase())
          }))
          resolve({
            success: true,
            status:200,
            message: "Operation successfull",
            data:filteredProduct
          });
        }
      }, 1000);
    });
  };
  const paymentApi = async () => {
    return new Promise((resolve, reject) => {
     setTimeout(() => {
          resolve({
            success: true,
            status:200,
            message: "Payment Confirmed",
          });
      }, 6000);
    });
  };

  export default {
    mockFetchProducts,
    mockSearchProducts,
    paymentApi
  }