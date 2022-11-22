import React, { DragEvent, useState } from "react";
import styles from "./fileUpload.module.scss";
import { Typography } from "@mui/material";
import { FileUpload } from "./FileUpload";

interface FileUploadDragAndDropProps {
  onFileAdded?: (file: File | null) => void;
  accept: string;
}

export const FileUploadDragAndDrop: React.FC<FileUploadDragAndDropProps> = ({
  onFileAdded,
  accept,
}) => {
  const [drag, setDrag] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDropFile = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFileAdded?.(e.dataTransfer.files[0]);
    setDrag(false);
  };

  return (
    <div>
      {drag ? (
        <div
          className={styles.dropArea}
          onDragStart={handleDragStart}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragStart}
          onDrop={handleDropFile}
        >
          Відпустіть файли, щоб завантажити їх
        </div>
      ) : (
        <div
          className={styles.dropArea}
          onDragStart={handleDragStart}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragStart}
        >
          Перетащіть файл,
          <FileUpload accept={accept} onFileAdded={onFileAdded}>
            <Typography color={"cornflowerblue"}>або клацніть сюди</Typography>
          </FileUpload>
          щоб завантажити його (тільки один)
        </div>
      )}
    </div>
  );
};
