import axios from "axios";

export default async function getProducts() {
  try {
    const response = await axios.get(
      "https://api.npoint.io/2d40a74230990aff735d"
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    return;
  }
}
