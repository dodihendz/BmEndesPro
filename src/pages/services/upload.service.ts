// async function uploadFile(file: any, newName: string, callback: Function) {
//   if (file) {
//     if (file.size < 1048576) {
//     //   cloud.uploader
//     //     .upload(newName, {
//     //       folder: "BMendes/User",
//     //       public_id: newName,
//     //       upload_preset: newName,
//     //       resource_type: "image",
//     //     })
//     //     .then((result: any) => {
//     //       callback("success", result);
//     //     })
//     //     .catch((err: any) => {
//     //       callback("gagal", err);
//     //     });
//     }
//   }
// }

import cloudinary from "@/lib/cloudinary/cloudinary";

async function uploadFile(data2: any, callback: Function) {
  console.log(data2.image);
  console.log(data2.id);

  const uploadResponse = await cloudinary.uploader
    .upload(
      data2.image,
      // This should be the actual file or a URL to the image
      {
        folder: "restaurant_images", // Specify the folder name
        public_id: `${data2.id}`, // Specify a unique identifier for the image
        use_filename: true,
      }
    )
    .then(callback("test"));
  return uploadResponse;
}

export default uploadFile;
