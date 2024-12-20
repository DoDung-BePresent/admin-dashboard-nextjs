import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
  try {
    const { files, folderName } = await req.json();

    if (!files || !folderName || !Array.isArray(files)) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const { url, alt } = file;

      if (!url || !alt) {
        throw new Error("Invalid file structure");
      }

      const result = await cloudinary.v2.uploader.upload(url, {
        folder: folderName,
        resource_type: "image",
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      });

      return {
        url: result.secure_url,
        alt: alt,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    return NextResponse.json(
      {
        success: true,
        data: uploadedFiles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
