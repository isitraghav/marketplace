import axios from "axios";
import { supabase } from "./supabase";

const API_ENDPOINT = "https://marketplace-api-ten.vercel.app";

// Get products from API
export async function getFeed() {
  try {
    const response = await axios.get(`${API_ENDPOINT}/feed`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function searchQuery(q) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/search/${q}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function listItem(title, description, price, imageSrc) {
  const user = await supabase.auth.getUser();
  const {
    data: {
      user: { id },
    },
  } = user;

  try {
    const response = await axios.post(`${API_ENDPOINT}/list`, {
      name: title,
      description,
      price,
      owner: id,
      ship: ["india"],
      image: imageSrc,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
