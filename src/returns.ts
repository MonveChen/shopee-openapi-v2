/*
 * @Author: Monve
 * @Date: 2022-06-07 19:51:00
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-08 16:03:44
 * @FilePath: /shopee-openapi-v2/src/returns.ts
 */
import { ApiShopMethod, Get, Post } from "./utils/request"


export class ReturnsApi {

  @Get({ url: '/api/v2/returns/get_return_list' })
  getReturnList!: ApiShopMethod<
    {
      page_no: number, page_size: number,
      create_time_from?: number, create_time_to?: number,
      status?: string, negotiation_status?: string,
      seller_proof_status?: string, seller_compensation_status?: string
    },
    {
      response: {
        more: boolean,
        returns: {
          image: string[],
          reason: string,
          text_reason: string,
          return_sn: number,
          refund_amount: number,
          currency: string,
          create_time: number,
          update_time: number,
          status: string,
          due_date: number,
          tracking_number: string,
          dispute_reason: string[],
          dispute_text_reason: string[],
          needs_logistics: boolean,
          amount_before_discount: number,
          user: {
            username: string,
            email: string,
            portrait: string,
          },
          item: {
            model_id: number,
            name: string,
            images: string[],
            amount: number,
            item_price: number,
            is_add_on_deal: boolean,
            is_main_item: boolean,
            add_on_deal_id: number,
            item_id: number,
            item_sku: string,
            variation_sku: string
          }[],
          order_sn: string,
          return_ship_due_date: number,
          return_seller_due_date: number,
          negotiation_status: string,
          seller_proof_status: string,
          seller_compensation_status: string
        }[]
      }
    }
  >

  @Post({ url: '/api/v2/returns/confirm' })
  confirm!: ApiShopMethod<
    { return_sn: string },
    {
      response: {
        return_sn: string
      }
    }
  >

  @Get({ url: '/api/v2/returns/dispute' })
  dispute!: ApiShopMethod<
    {
      return_sn: string, email: string, dispute_reason: string,
      dispute_text_reason: string, image: string[]
    },
    { response: { return_sn: string } }
  >

}