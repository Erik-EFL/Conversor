export interface ConvertedFile {
  id: string;
  html: string;
};

export interface GetFilesResponse {
  success: boolean;
  data?: ConvertedFile[];
  error?: string;
}
