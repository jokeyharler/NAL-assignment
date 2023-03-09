import { Bookmark } from '../types';

export const paginate = (array: Bookmark[], currentPage: number, limit: number) => {
  return array.slice((currentPage - 1) * limit, currentPage * limit);
};
