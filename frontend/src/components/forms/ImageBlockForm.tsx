import { FormEvent, useCallback, useRef, useState } from "react";
import { FileUpload, uploadFile } from "../../uploadFile";
import Button from "../Button";

interface ImageBlockFormProps {
  order: number;
  fetchImageBlocks: () => Promise<void>;
}

function ImageBlockForm({ order, fetchImageBlocks }: ImageBlockFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [fileUpload, setFileUpload] = useState<FileUpload | null>(null);

  const fileCallback = useCallback((e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement | undefined;
    if (input && input.files && input.files.length > 0) {
      setFileToUpload(input.files[0]);
    } else {
      setFileToUpload(null);
    }
  }, []);

  const handleFileUpload = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (fileToUpload) {
        uploadFile(fileToUpload, order).then((result) => {
          setFileUpload(result);
          setFileToUpload(null);
          formRef.current?.reset();
          fetchImageBlocks();
        });
      }
    },
    [fileToUpload]
  );

  return (
    <>
      <form ref={formRef} onSubmit={handleFileUpload}>
        <input type="file" onInput={fileCallback} />
        <br />
        <br />
        {fileToUpload && <Button type={"submit"} lable="Upload Image" />}
      </form>

      {fileUpload && <div>Your image was successfully uploaded!</div>}
    </>
  );
}

export default ImageBlockForm;
