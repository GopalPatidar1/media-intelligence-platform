import { deleteFileById } from '../../services/file.service';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!;
  return await deleteFileById(id as string);
});
