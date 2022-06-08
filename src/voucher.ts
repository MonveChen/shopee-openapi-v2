/*
 * @Author: Monve
 * @Date: 2022-06-07 19:53:39
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-08 10:13:12
 * @FilePath: /shopee-openapi-v2/src/voucher.ts
 */

import { ApiShopMethod, Get } from "./utils/request"


export class VoucherApi {

  @Get({ url: '/api/v2/voucher/get_voucher_list' })
  getShopInfo!: ApiShopMethod<
    {
      page_no?: number, page_size?: number,
      status: 'upcoming' | 'ongoing' | 'expired' | 'all'
    },
    {
      response: {
        more: boolean,
        voucher_list: {
          voucher_id: number,
          voucher_code: string,
          voucher_name: string,
          voucher_type: number,
          reward_type: number,
          usage_quantity: number,
          current_usage: number,
          start_time: number,
          end_time: number,
          is_admin: boolean,
          voucher_purpose: number,
          discount_amount: number,
          percentage: number,
          cmt_voucher_status: number,
          display_start_time: number
        }[]
      }
    }
  >

}