/*
 * @Author: Monve
 * @Date: 2022-06-07 19:50:58
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-08 11:35:26
 * @FilePath: /shopee-openapi-v2/src/payment.ts
 */
import { ApiShopMethod, Get } from "./utils/request"


export class PaymentApi {

  @Get({ url: '/api/v2/payment/get_escrow_detail' })
  getEscrowDetail!: ApiShopMethod<
    { order_sn: string },
    {
      response: {
        order_sn: string,
        buyer_user_name: string,
        return_order_sn_list: string[],
        order_income: {
          escrow_amount: number,
          buyer_total_amount: number,
          original_price: number,
          seller_discount: number,
          shopee_discount: number,
          voucher_from_seller: number,
          voucher_from_shopee: number,
          coins: number,
          buyer_paid_shipping_fee: number,
          buyer_transaction_fee: number,
          cross_border_tax: number,
          payment_promotion: number,
          commission_fee: number,
          service_fee: number,
          seller_transaction_fee: number,
          seller_lost_compensation: number,
          seller_coin_cash_back: number,
          escrow_tax: number,
          final_shipping_fee: number,
          actual_shipping_fee: number,
          order_chargeable_weight: number,
          shopee_shipping_rebate: number,
          shipping_fee_discount_from_3pl: number,
          seller_shipping_discount: number,
          estimated_shipping_fee: number,
          seller_voucher_code: string[],
          drc_adjustable_refund: number,
          cost_of_goods_sold: number,
          original_cost_of_goods_sold: number,
          original_shopee_discount: number,
          seller_return_refund: number,
          items: {
            item_id: number,
            item_name: string,
            item_sku: string,
            model_id: number,
            model_name: string,
            model_sku: string,
            original_price: number,
            discounted_price: number,
            discount_from_coin: number,
            discount_from_voucher_shopee: number,
            discount_from_voucher_seller: number,
            activity_type: string,
            activity_id: number,
            is_main_item: boolean,
            quantity_purchased: number
          }[],
          escrow_amount_pri: number,
          buyer_total_amount_pri: number,
          original_price_pri: number,
          seller_return_refund_pri: number,
          commission_fee_pri: number,
          service_fee_pri: number,
          drc_adjustable_refund_pri: number,
          pri_currency: string,
          aff_currency: string,
          exchange_rate: number,
          reverse_shipping_fee: number,
          final_product_protection: number,
          credit_card_promotion: number,
          credit_card_transaction_fee: number,
          final_product_vat_tax: number
        }
      }
    }
  >

}