/*
 * @Author: Monve
 * @Date: 2022-04-01 19:00:11
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-09 11:57:41
 * @FilePath: /shopee-openapi-v2/src/utils/const.ts
 */


export const BASE_URL = Object.freeze({
  test: 'https://partner.test-stable.shopeemobile.com',
  live: 'https://partner.shopeemobile.com',
})

export const api_config = {
  retries: 0,
  retryDelay: (retryCount: number) => Math.pow(retryCount, 2) * 1000
}
