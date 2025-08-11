const baseUrl = import.meta.env.VITE_SERVER_BASEURL

export const avatar = (filename) => {
  return filename ? `${baseUrl}/files/avatar/${filename}` : ''
}

export const goodImg = (filename) => {
  return filename ? `${baseUrl}/files/good/${filename}` : ''
}
