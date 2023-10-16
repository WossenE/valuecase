import axios from "axios";

export type FileUpload = {
    fileId: string,
    filePath: string
}

export async function uploadFile(file: File, order: number) : Promise<FileUpload> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("jsonData", JSON.stringify({order}));


    const fileId = await axios.post("/api/files", formData).then(res => res.data.id)
    return {
        fileId,
        filePath: `/api/files/${fileId}`
    }
}