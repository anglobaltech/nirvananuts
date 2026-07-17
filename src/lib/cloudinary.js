import axios from "axios";

export const uploadImage = async (file) => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "nirvana-nuts");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data
  );

  return res.data.secure_url;
};