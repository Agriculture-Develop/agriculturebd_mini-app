import { IUserInfoVo, IUserId } from './user.typing'
import { httpGet } from '@/utils/http'
export const getUserInfo = (id: string) => {
  return httpGet<IUserInfoVo>(`/public/user/${id}`)
}
