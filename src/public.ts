/*
 * @Author: Monve
 * @Date: 2022-06-07 19:52:30
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-08 16:04:43
 * @FilePath: /shopee-openapi-v2/src/public.ts
 */

import { ApiMethod, Get, Post } from "./utils/request"


export class PublicApi {

  @Get({ url: '/api/v2/public/get_shops_by_partner' })
  getShopsByPartner!: ApiMethod<
    { page_size: number, page_no: number },
    {
      authed_shop_list: {
        region: string,
        shop_id: number,
        auth_time: number,
        expire_time: number,
        sip_affi_shop_list: {
          region: string,
          affi_shop_id: string
        }[]
      }[],
      more: boolean
    }
  >

  @Get({ url: '/api/v2/public/get_merchants_by_partner' })
  getMerchantsByPartner!: ApiMethod<
    { page_size: number, page_no: number },
    {
      authed_merchant_list: {
        region: string,
        merchant_id: number,
        auth_time: number,
        expire_time: number,
      }[],
      more: boolean
    }
  >

  @Post({ url: '/api/v2/public/get_token_by_resend_code' })
  getTokenByResendCode!: ApiMethod<
    { resend_code: string },
    {
      shop_id_list: number[],
      merchant_id_list: number[],
      refresh_token: string,
      access_token: string,
      expire_in: number
    }
  >

  @Post({ url: '/api/v2/public/get_refresh_token_by_upgrade_code' })
  getRefreshTokenByUpgradeCode!: ApiMethod<
    { upgrade_code: string, shop_id_list: number[] },
    {
      response: {
        success_shop_id_list: number[],
        refresh_token: string,
        failure_list: {
          shop_id: number,
          failed_reason: string
        }[]
      }
    }
  >

}