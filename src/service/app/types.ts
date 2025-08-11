/* eslint-disable */
// @ts-ignore

export type deleteAdminNewsCategoriesIdParams = {
  id: string;
};

export type deleteAdminNewsIdParams = {
  id: string;
};

export type deleteAdminUserIdParams = {
  id: string;
};

export type deletePublicFilesTypesNameParams = {
  types: string;
  name: string;
};

export type deletePublicGoodCommentIdParams = {
  id: string;
};

export type deletePublicGoodIdParams = {
  id: string;
};

export type getAdminNewsIdParams = {
  id: string;
};

export type getAdminNewsListParams = {
  title?: string;
  author?: string;
  status?: string;
  page?: number;
  count?: number;
};

export type getFilesTypesNameParams = {
  types: string;
  name: string;
};

export type getPublicGoodCommentIdParams = {
  id: string;
  comment?: string;
};

export type getPublicGoodIdCommentParams = {
  id: string;
};

export type getPublicGoodIdParams = {
  id: string;
};

export type getPublicGoodListParams = {
  title?: string;
  page?: number;
  count?: number;
};

export type getPublicUserIdParams = {
  id: string;
};

export type login = {
  code: number;
  msg: string;
  data: { id: number; token: string; role: string };
};

export type postPublicFilesTypesParams = {
  types: string;
};

export type postPublicGoodIdCommentParams = {
  id: string;
};

export type putAdminNewsCategoriesIdParams = {
  id: string;
};

export type putAdminNewsIdParams = {
  id: string;
};

export type putAdminNewsStatusIdParams = {
  id: string;
};

export type putAdminUserIdParams = {
  id: string;
};
