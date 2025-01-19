export type ApiResponse<T = any> = {
  data?: T;
  error?: string;
  status: number;
};

export const createApiResponse = <T>(
  data?: T,
  error?: string,
  status: number = 200
): ApiResponse<T> => ({
  data,
  error,
  status,
}); 