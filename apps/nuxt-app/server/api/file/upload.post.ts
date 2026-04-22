import { uploadFileService } from "../../services/file.service";
import { FileForm } from "../../types/file";

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) return { error: "No file uploaded" };

  const payload: FileForm = {
    fileName: "",
    type: "",
    department: "",
    status: "",
  };

  for (const item of files) {
    if (item.name === "file") {
      continue;
    } else if (item.name === "name") {
      payload.fileName = item.data.toString();
    } else if (item.name === "status") {
      payload.status = item.data.toString();
    } else if (item.name === "department") {
      payload.department = item.data.toString();
    }
  }

  return await uploadFileService(files[0], payload);
});
