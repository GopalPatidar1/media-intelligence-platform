export const FILE_TYPE_MAP: Record<string, "image" | "video" | "pdf" | "doc" | "other"> = {
  // images
  "image/png": "image",
  "image/jpeg": "image",
  "image/jpg": "image",
  "image/webp": "image",
  "image/gif": "image",

  // videos
  "video/mp4": "video",
  "video/mpeg": "video",
  "video/quicktime": "video",
  "video/webm": "video",

  // pdf
  "application/pdf": "pdf",

  // docs
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "doc",
};
