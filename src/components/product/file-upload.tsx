"use client";

import { useState } from "react";
import { Image, Upload, UploadFile } from "antd";
import { BadgeAlert, Image as ImageIcon } from "lucide-react";

const { Dragger } = Upload;

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// TODO: Need to improve logic
/**
 * When you upload an image using the FileUpload component,
 * the image is duplicated three times in the display list (fileList).
 * This results in incorrect rendering, even though only one file was
 * selected and uploaded.
 *
 * Fix temporary by using includes()
 */
const FileUpload = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState<string[]>([]);

  const handleChange = async ({ file }: any) => {
    const imageSrc = await getBase64(file.originFileObj as File);
    if (!fileList.includes(imageSrc)) {
      setFileList((prev) => [...prev, imageSrc]);
    }
  };

  return (
    <div>
      <h5 className="font-semibold">Product Image</h5>
      <div className="mt-2 grid md:grid-cols-2 gap-4">
        <Dragger
          className="w-full aspect-square"
          maxCount={4}
          onChange={handleChange}
          showUploadList={false}
          listType="picture-card"
        >
          <div className="flex flex-col gap-2">
            <ImageIcon size={40} className="text-gray-500 mx-auto" />
            <p className="text-xs font-semibold">Drop your images</p>
            <p className="text-xs">Support for a single or bulk upload.</p>
          </div>
        </Dragger>
        <div className="grid grid-cols-2 gap-2">
          {fileList.map((file, index) => (
            <Image
              key={index}
              src={file}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
              }}
              className="rounded-md w-full aspect-square"
            />
          ))}
        </div>
      </div>
      <div className="flex items-start gap-2 mt-2">
        <BadgeAlert size={16} className="text-gray-600 mt-[1px]" />
        <p className="text-xs text-gray-500">
          You need at least 4 images.
          <br /> Pay attention to the quality of the pictures you add
          (important)!
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
