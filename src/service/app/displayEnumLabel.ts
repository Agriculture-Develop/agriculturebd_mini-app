/* eslint-disable */
// @ts-ignore
import * as API from './types';

export function displayStatusEnum(field: API.IStatusEnum) {
  return { available: 'available', pending: 'pending', sold: 'sold' }[field];
}
