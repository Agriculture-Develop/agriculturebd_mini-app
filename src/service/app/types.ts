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
  author: string;
  status?: string;
  page?: number;
  count?: number;
};

export type getFilesTypesIdParams = {
  types: string;
  id: string;
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

export type news = {
  code: number;
  msg: string;
  data: {
    id: number;
    title: string;
    category_id: number;
    abstract: string;
    keyword: string[];
    source: string;
    content: string;
    cover_url: string;
    files_url: string[];
    status: string;
    author: string;
    created_at: string;
    updated_at: string;
  };
  /** 大类别(新闻/政策) */
  type: string;
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
