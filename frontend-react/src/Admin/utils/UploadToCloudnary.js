const upload_preset = "restaurant-food";
const cloud_name = "dwywmwwvg";
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset); // ✅ nombre correcto
  data.append("cloud_name", cloud_name);

  try {
    const res = await fetch(api_url, {
      method: "POST",
      body: data, // ✅ FormData enviado correctamente
    });

    const fileData = await res.json();

    if (fileData.error) {
      console.error("Cloudinary error:", fileData.error);
      return null;
    }

    return fileData.secure_url; // ✅ este es el URL de la imagen subida
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};