import dayjs from 'dayjs'
export const formatTime = (apiTime) => {
  return dayjs(apiTime).format('YYYY年MM月DD日')
}
