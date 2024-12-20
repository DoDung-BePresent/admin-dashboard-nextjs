"use client";

import { useState } from "react";
import { Image, Upload } from "antd";
import { BadgeAlert, Plus } from "lucide-react";
import { UploadFile } from "antd/es/upload";
import type { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface FileUploadProps {
  images: { id: string; url: string; alt: string | undefined }[];
  setImages: React.Dispatch<
    React.SetStateAction<{ id: string; url: string; alt: string | undefined }[]>
  >;
}

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FileUpload: React.FC<FileUploadProps> = ({ setImages, images }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    file,
    fileList: newFileList,
  }) => {
    if (file.status === "done") {
      const imageBase64 = await getBase64(file.originFileObj as FileType);
      setImages([
        ...images,
        {
          id: file.uid,
          url: imageBase64,
          alt: file.name,
        },
      ]);
    } else if (file.status === "removed") {
      const filteredImages = images.filter((image) => image.id !== file.uid);
      setImages(filteredImages);
    }
    setFileList(newFileList);
  };

  return (
    <div className="flex-1">
      <h5 className="font-medium">Product Image</h5>
      <div className="mt-2">
        <Upload
          fileList={fileList}
          listType="picture-card"
          onChange={handleChange}
          onPreview={handlePreview}
          maxCount={8}
        >
          {fileList.length >= 8 ? null : (
            <div>
              <Plus className="mx-auto" />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>
      <div className="flex items-start gap-2 mt-4">
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
