/*
 * @Author: Monve
 * @Date: 2022-06-07 19:50:52
 * @LastEditors: Monve
 * @LastEditTime: 2022-07-19 18:28:58
 * @FilePath: /shopee-openapi-v2/src/order.ts
 */

import { ApiShopMethod, Get, Post } from "./utils/request"

export type OrderStatus = 'UNPAID' | 'READY_TO_SHIP' | 'PROCESSED' | 'SHIPPED' | 'COMPLETED' | 'IN_CANCEL' | 'CANCELLED' | 'INVOICE_PENDING'

export class OrderApi {

  @Post({ url: '/api/v2/order/set_note' })
  setNote!: ApiShopMethod<
    { order_sn: string, note: string },
    {}
  >

  @Get({ url: '/api/v2/order/get_order_list' })
  getOrderList!: ApiShopMethod<
    {
      time_range_field: string, time_from: number,
      time_to: number, page_size: number, cursor?: string,
      order_status?: OrderStatus,
      response_optional_fields?: string
    },
    {
      response: {
        more: boolean,
        order_list: {
          order_sn: string,
          order_status: OrderStatus
        }[],
        next_cursor: string
      }
    }
  >

  @Post({ url: '/api/v2/order/handle_buyer_cancellation' })
  handleBuyerCancellation!: ApiShopMethod<
    { order_sn: string, operation: string },
    { response: { update_time: number } }
  >

  @Get({ url: '/api/v2/order/get_order_detail' })
  getOrderDetail!: ApiShopMethod<
    { order_sn_list: string[], response_optional_fields?: string[] },
    {
      response: {
        order_list: {
          order_sn: string,
          region: string,
          currency: string,
          cod: boolean,
          total_amount: number,
          order_status: OrderStatus,
          shipping_carrier: string,
          payment_method: string,
          estimated_shipping_fee: number,
          message_to_seller: string,
          create_time: number,
          update_time: number,
          days_to_ship: number,
          ship_by_date: number,
          buyer_user_id: number,
          buyer_username: string,
          recipient_address: {
            name: string,
            phone: string,
            town: string,
            district: string,
            city: string,
            state: string,
            region: string,
            zipcode: string,
            full_address: string
          },
          actual_shipping_fee: number,
          goods_to_declare: boolean,
          note: string,
          note_update_time: number,
          item_list: {
            item_id: number,
            item_name: string,
            item_sku: string,
            model_id: number,
            model_name: string,
            model_sku: string,
            model_quantity_purchased: number,
            model_original_price: number,
            model_discounted_price: number,
            wholesale: boolean,
            weight: number,
            add_on_deal: boolean,
            main_item: boolean,
            add_on_deal_id: number,
            promotion_type: string,
            promotion_id: number,
            order_item_id: number,
            promotion_group_id: number,
            image_info: {
              image_url: string
            },
            product_location_id: string[],
          }[]
          pay_time: number,
          dropshipper: string,
          dropshipper_phone: string,
          split_up: boolean,
          buyer_cancel_reason: string,
          cancel_by: string,
          cancel_reason: string,
          actual_shipping_fee_confirmed: boolean,
          buyer_cpf_id: string,
          fulfillment_flag: string,
          pickup_done_time: string,
          package_list: {
            package_number: string,
            logistics_status: string,
            shipping_carrier: string,
            item_list: {
              item_id: number,
              model_id: number
            }[],
            parcel_chargeable_weight_gram: number
          }[],
          invoice_data: {
            number: string,
            series_number: string,
            access_key: string,
            issue_date: number,
            total_value: number,
            products_total_value: number,
            tax_code: string
          },
          checkout_shipping_carrier: string,
          reverse_shipping_fee: number,
          order_chargeable_weight_gram: number
        }[]
      }
      warning: string[]
    }
  >

}