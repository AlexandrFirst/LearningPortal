import React, { ChangeEvent, PropsWithChildren, useRef } from "react";

interface FileUploadProps extends PropsWithChildren {
  accept: string;
  onFileAdded?: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  onFileAdded,
  children,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onFileAdded?.(event.target?.files?.[0] ?? null);
  };

  const handleClick = () => ref.current?.click();

  return (
    <span onClick={handleClick} style={{ cursor: "pointer" }}>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        style={{ display: "none" }}
        accept={accept}
        ref={ref}
      />
      {children}
    </span>
  );
};
