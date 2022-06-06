/*
 * @Author: Monve
 * @Date: 2022-04-02 11:40:43
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-06 14:43:49
 * @FilePath: /shopee-openapi-v2/src/utils/sign.ts
 */
import * as crypto from 'crypto'

export const signRequest = (partner_key: string, params: string[]): string => {
  const baseString = params.reduce((prev, curr) => (prev += curr), "");
  return crypto.createHmac("sha256", partner_key).update(baseString).digest("hex");
}