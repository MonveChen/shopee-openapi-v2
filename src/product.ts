/*
 * @Author: Monve
 * @Date: 2022-06-07 19:49:42
 * @LastEditors: Monve
 * @LastEditTime: 2022-07-22 14:47:38
 * @FilePath: /shopee-openapi-v2/src/product.ts
 */

import { ApiShopMethod, Get } from "./utils/request"


export class ProductApi {

  @Get({ url: '/api/v2/product/get_item_base_info' })
  getItemBaseInfo!: ApiShopMethod<
    {
      item_id_list: number[],
      need_tax_info?: boolean,
      need_complaint_policy?: boolean
    },
    {
      response: {
        item_list: {
          item_id: number,
          category_id: number,
          item_name: string,
          description: string,
          item_sku: string,
          create_time: number,
          update_time: number,
          attribute_list: {
            attribute_id: number,
            original_attribute_name: string,
            is_mandatory: boolean,
            attribute_value_list: {
              value_id: number,
              original_value_name: string,
              value_unit: string
            }[]
          }[],
          price_info: {
            currency: string,
            original_price: number,
            current_price: number,
            inflated_price_of_original_price: number,
            inflated_price_of_current_price: number,
            sip_item_price: number,
            sip_item_price_source: string,
          }[],
          stock_info: {
            stock_type: number,
            stock_location_id: string,
            current_stock: number,
            normal_stock: number,
            reserved_stock: number
          }[],
          image: {
            image_url_list: string[],
            image_id_list: string[]
          },
          weight: string,
          dimension: {
            package_length: number,
            package_width: number,
            package_height: number
          },
          logistic_info: {
            logistic_id: number,
            logistic_name: string,
            enabled: boolean,
            shipping_fee: number,
            size_id: number,
            is_free: boolean,
            estimated_shipping_fee: number
          }[],
          pre_order: {
            is_pre_order: boolean,
            days_to_ship: number
          },
          wholesales: {
            min_count: number,
            max_count: number,
            unit_price: number,
            inflated_price_of_unit_price: number,
          }[],
          condition: string,
          size_chart: string,
          item_status: string,
          has_model: boolean,
          promotion_id: number,
          video_info: {
            video_url: string,
            thumbnail_url: string,
            duration: number
          }[],
          brand: {
            brand_id: number,
            original_brand_name: string,
          },
          item_dangerous: number,
          complaint_policy: {
            warranty_time: string,
            exclude_entrepreneur_warranty: boolean,
            complaint_address_id: number,
            additional_information: string
          },
          tax_info: {
            ncm: string,
            diff_state_cfop: string,
            csosn: string,
            origin: string,
            cest: string,
            measure_unit: string,
            invoice_option: string,
            vat_rate: string,
            hs_code: string,
            tax_code: string
          },
          stock_info_v2: {
            summary_info: {
              total_reserved_stock: number,
              total_available_stock: number
            },
            seller_stock: {
              location_id: string,
              stock: number
            },
            shopee_stock: {
              location_id: string,
              stock: number
            }
          }
        }[],
        description_info: {
          extended_description: {
            field_list: {
              field_type: string,
              text: string,
              image_info: {
                image_id: string,
                image_url: string
              }
            }[]
          }
        },
        description_type: string
      }
    }
  >

  @Get({ url: '/api/v2/product/get_item_extra_info' })
  getItemExtraInfo!: ApiShopMethod<
    { item_id_list: number[] },
    {
      warning: string,
      response: {
        item_list: {
          item_id: number,
          sale: number,
          views: number,
          likes: number,
          rating_star: number,
          comment_count: number
        }[]
      }
    }
  >

  @Get({ url: '/api/v2/product/get_item_list' })
  getItemList!: ApiShopMethod<
    {
      offset: number, page_size: number,
      update_time_from?: number, update_time_to?: number,
      item_status: string[]
    },
    {
      warning: string,
      response: {
        item: {
          item_id: number,
          item_status: string,
          update_time: number
        }[],
        total_count: number,
        has_next_page: boolean,
        next_offset: number
      }
    }
  >

  @Get({ url: '/api/v2/product/get_model_list' })
  getModelList!: ApiShopMethod<
    { item_id: number },
    {
      warning: string,
      response: {
        tier_variation: {
          option_list: {
            option: string,
            image: {
              image_id: string,
              image_url: string
            }
          }[],
          name: string
        }[],
        model: {
          price_info: {
            current_price: number,
            original_price: number,
            inflated_price_of_original_price: number,
            inflated_price_of_current_price: number,
            sip_item_price: number,
            sip_item_price_source: string
          },
          model_id: number,
          stock_info: {
            normal_stock: number,
            stock_type: number,
            current_stock: number,
            reserved_stock: number,
            stock_location_id: string,
          }[],
          tier_index: number[],
          promotion_id: number,
          model_sku: string,
          pre_order: {
            is_pre_order: boolean,
            days_to_ship: number,
          },
          stock_info_v2: {
            summary_info: {
              total_reserved_stock: number,
              total_available_stock: number
            },
            seller_stock: {
              location_id: string,
              stock: number
            }[],
            shopee_stock: {
              location_id: string,
              stock: number
            }[]
          }
        }[]
      }
    }
  >

}