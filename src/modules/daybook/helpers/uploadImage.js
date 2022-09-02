import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return;
  try {
    const formData = new FormData();
    formData.append("upload_preset", "ml_default");
    formData.append("file", file);
    const url = "https://api.cloudinary.com/v1_1/dzl4f0sb7/image/upload";
    const { data } = await axios.post(url, formData);
    return data.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default uploadImage;
