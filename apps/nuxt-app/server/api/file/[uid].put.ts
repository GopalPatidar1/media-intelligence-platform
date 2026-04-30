import { updateFileByUid } from '@@/server/services/file.service';
import { FileForm } from '@@/server/types/file';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) return { error: 'No file uploaded' };

  const payload: FileForm = {
    fileName: '',
    type: '',
    department: '',
    status: '',
  };

  for (const item of files) {
    if (item.name === 'file') {
      continue;
    } else if (item.name === 'name') {
      payload.fileName = item.data.toString();
    } else if (item.name === 'status') {
      payload.status = item.data.toString();
    } else if (item.name === 'department') {
      payload.department = item.data.toString();
    }
  }

  return await updateFileByUid(event, files[0], payload);
});
