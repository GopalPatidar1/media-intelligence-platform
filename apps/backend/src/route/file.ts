import express, { Request, Response, NextFunction } from 'express';
import {
  fetchFileByUid,
  deleteFileById,
  fetchFileStatsByType,
  fetchFilesByType,
  uploadFileService,
  updateFileByUid,
} from '@/services/file.service';
import { FileForm } from '@/types/file';
import createHttpError from 'http-errors';
import multer from 'multer';
const upload = multer();

const router = express.Router();

export const deleteFileByIdRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params!;
    await deleteFileById(id as string);
    return res.send(200).json({ message: 'File deleted successfully' });
  } catch (err: any) {
    return next(
      createHttpError(400, { message: err.message || 'something went wrong' })
    );
  }
};

export const fetchFileByUidRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await fetchFileByUid(req, res, next);
};

export const updateFileByUidRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as any[];
  if (!files || files.length === 0)
    return next(createHttpError(400, { error: 'No file uploaded' }));

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

  return await updateFileByUid(req, files[0], payload, next);
};

export const fetchFileStatsByTypeRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const { type, search } = query;
    let parseWhere: { fileName?: string } = {};
    if (typeof search === 'string') {
      parseWhere = search ? { fileName: search } : {};
    }
    let data;
    if (type) {
      data = await fetchFilesByType(req, type as string, parseWhere);
    } else data = await fetchFileStatsByType(req, res, next);
    return res.status(200).json(data);
  } catch (err: any) {
    return next(
      createHttpError(400, { message: err.message || 'something went wrong' })
    );
  }
};

export const uploadFileRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file as Express.Multer.File;
    if (!file) return next(createHttpError(400, { error: 'No file uploaded' }));

    const payload: FileForm = {
      fileName: '',
      type: '',
      department: '',
      status: '',
    };

    if (req.body.name) {
      payload.fileName = req.body.name;
    } else if (req.body.status) {
      payload.status = req.body.status;
    } else if (req.body.department) {
      payload.department = req.body.department;
    }

    return await uploadFileService(req, res, next, payload);
  } catch (err: any) {
    return next(
      createHttpError(400, { message: err.message || 'Something went wrong' })
    );
  }
};

router.get('/get', fetchFileStatsByTypeRoute);
router.get('/:uid', fetchFileByUidRoute);
router.post('/upload', upload.single('file'), uploadFileRoute);
router.put('/:uid', updateFileByUidRoute);
router.delete('/:id', deleteFileByIdRoute);

export default router;
