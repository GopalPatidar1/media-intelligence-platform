import express, { Request, Response, NextFunction } from 'express';
import {
  fetchFileByUid,
  deleteFileById,
  fetchFileStatsByType,
  fetchFilesByType,
  uploadFileService,
  updateFileByUid,
} from '../services/file.service';
import { FileForm } from '../types/file';

const router = express.Router();

export const deleteFileByIdRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params!;
  return await deleteFileById(id as string);
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

  return await updateFileByUid(req, files[0], payload);
};

export const fetchFileStatsByTypeRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const { type, where } = query;
  let parseWhere: { fileName?: string } = {};
  if (typeof where === 'string') {
    parseWhere = where ? JSON.parse(where) : {};
  }
  if (type) {
    return await fetchFilesByType(req, type as string, parseWhere);
  }

  return await fetchFileStatsByType(req, res, next);
};

export const uploadFileRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as any[];
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

  return await uploadFileService(files[0], payload, req);
};

router.get('/', fetchFileStatsByTypeRoute);
router.get('/:uid', fetchFileByUidRoute);
router.post('/upload', uploadFileRoute);
router.put('/:uid', updateFileByUidRoute);
router.delete('/:id', deleteFileByIdRoute);

export default router;
