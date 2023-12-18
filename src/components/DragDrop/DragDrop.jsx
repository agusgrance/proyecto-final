import React from "react";
import { FileUploader } from "react-drag-drop-files";

function DragDrop({ image, handleImage }) {
  const handleChange = (files) => {
    if (files) {
      handleImage(files);
    }
  };

  return (
    <div>
      <FileUploader handleChange={handleChange} name="file">
        {image && (
          <div className="w-[200px]">
            <p>Imagen subida:</p>
            <img
              className="w-full object-cover"
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Uploaded"
              width={"100%"}
            />
          </div>
        )}
      </FileUploader>
    </div>
  );
}

export default DragDrop;
