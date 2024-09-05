import main_axios from "./mainaxios";


 export const refreshToken = async () => {
    try {
      const resp = await main_axios.post("/auth/refresh-tokens",{
        refreshToken: localStorage.getItem("rToken"),
      });
      console.log("refresh token", resp.data);
      
      return resp.data;
    } catch (e) {
      console.log("Error",e);   
    }
  };