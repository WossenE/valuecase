import {FormEvent, useCallback, useRef, useState} from "react";
import {FileUpload, uploadFile} from "./uploadFile";

export default function FileUploadExample() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [fileToUpload, setFileToUpload] = useState<File | null>(null)
    const [fileUpload, setFileUpload] = useState<FileUpload | null>(null)

    const fileCallback = useCallback((e: FormEvent<HTMLInputElement>) => {
        const input = (e.target as HTMLInputElement | undefined)
        if ( input && input.files && input.files.length > 0 ) {
            setFileToUpload(input.files[0])
        } else {
            setFileToUpload(null)
        }
    }, [])

    const handleFileUpload = useCallback((e: FormEvent) => {
        e.preventDefault()
        if ( fileToUpload ) {
            uploadFile(fileToUpload)
                .then((result) => {
                    setFileUpload(result)
                    setFileToUpload(null)
                    formRef.current?.reset()
                })
        }
    }, [fileToUpload])

    return <>
        <form ref={formRef} onSubmit={handleFileUpload}>
            <input type="file" onInput={fileCallback}/>
            <br />
            <br />
            {fileToUpload && <button type={"submit"}>Upload file ⬆️</button>}
        </form>

        {fileUpload && <div>
            <hr />
            File-ID: {fileUpload.fileId}
            <br />
            File-Path: <a href={fileUpload.filePath} target={"_blank"}>{fileUpload.filePath}</a>
        </div>}
    </>
}