export const FILE_TYPE_MAP: Record<
  string,
  'image' | 'video' | 'pdf' | 'doc' | 'other'
> = {
  // images
  'image/png': 'image',
  'image/jpeg': 'image',
  'image/jpg': 'image',
  'image/webp': 'image',
  'image/gif': 'image',

  // videos
  'video/mp4': 'video',
  'video/mpeg': 'video',
  'video/quicktime': 'video',
  'video/webm': 'video',

  // pdf
  'application/pdf': 'pdf',

  // docs
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'doc',
};

export const MIME_MAP: Record<string, { mime: string; ext: string }> = {
  image: { mime: 'image/png', ext: 'png' },
  pdf: { mime: 'application/pdf', ext: 'pdf' },
  video: { mime: 'video/mp4', ext: 'mp4' },
  doc: { mime: 'application/msword', ext: 'doc' },
};
