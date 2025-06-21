/* eslint-disable */
// @ts-ignore

export type Category = {
  /** 分组ID编号 */
  id?: number;
  /** 分组名称 */
  name?: string;
};

export type deletePetIdParams = {
  /** Pet id to delete */
  petId: string;
};

export type getFindByStatusParams = {
  /** Status values that need to be considered for filter */
  status: string;
};

export type getPetIdParams = {
  /** 宠物 ID */
  petId: string;
};

export type Pet = {
  /** 宠物ID编号 */
  id: number;
  /** 分组 */
  category: Category;
  /** 名称 */
  name: string;
  /** 照片URL */
  photoUrls: string[];
  /** 标签 */
  tags: Tag[];
  /** 宠物销售状态 */
  status: 'available' | 'pending' | 'sold';
};

export enum StatusEnum {
  available = 'available',
  pending = 'pending',
  sold = 'sold',
}

export type IStatusEnum = keyof typeof StatusEnum;

export type Tag = {
  /** 标签ID编号 */
  id?: number;
  /** 标签名称 */
  name?: string;
};
