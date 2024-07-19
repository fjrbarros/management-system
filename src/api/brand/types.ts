export interface IBrand {
  brand_id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface IBrandResponse {
  data: IBrand[];
  totalCount: number;
}

export interface IBrandParams {
  name: string;
  brand_id?: string;
}

export interface IGetBrandsParams {
  page: number;
  pageSize: number;
  search: string;
}
