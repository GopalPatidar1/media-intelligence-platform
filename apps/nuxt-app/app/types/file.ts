export type FileStatus = "uploaded" | "processing" | "failed";

export interface FileForm {
  name: string;
  type: string;
  department: string;
  status: FileStatus;
}
