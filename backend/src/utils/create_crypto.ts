import {AES, enc} from 'crypto-js'

const secretKey = process.env.SECRET_KEY as string

export const encrypt = (text: string): string => {
  return AES.encrypt(text, secretKey).toString()
}

export const decrypt = (cipherText: string): string => {
  const bytes = AES.decrypt(cipherText, secretKey)
  return bytes.toString(enc.Utf8)
}