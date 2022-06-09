/*
 * @Author: Monve
 * @Date: 2022-04-08 10:52:47
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-09 13:56:33
 * @FilePath: /shopee-openapi-v2/src/test.ts
 */

import axios from "axios";
import { request } from "http";
import shopee from "./index"

const main = async () => {
  if (!process.env.PARTNER_ID || !process.env.PARTNER_KEY) {
    throw new Error("env value partner_id or PARTNER_KEY not found");

  }

  shopee.setAppConfig({ partner_id: process.env.PARTNER_ID, partner_key: process.env.PARTNER_KEY, is_dev: true, redirect: 'https://dev.dibiaozuitu.com/openapi/shopee/auth_redirect/c932e987fa81e70889e56a20b09df648', retries: 3 })

  // //获取授权链接
  // const url = await shopee.getAuthLink()
  // console.log(url)
  // //获取token
  // const res = await shopee.getAccesstoken({ code: '55485a58484f724c7963636369546e48', shop_id: 445519300, main_account_id: 445519300, partner_id: 2003523 })
  // console.log(res)

  //获取店铺信息
  const res2 = await shopee.shop.getShopInfo({ shop_id: 46958, access_token: "4d597476676d4b495a4c6d4b7076557a" })
  console.log(res2)

  // // 获取会话列表
  // const access_token = '50000601317sMk1gvHhri0OdBgbUg18cf3b17luyEHkRmvmrtEDXBtxFuGZ3Bv0z'
  // const res2 = await shopee.get_session_list({
  //   access_token, baseUrl_type: 'th',
  //   start_time: new Date().valueOf(), page_size: 20
  // })
  // console.log(JSON.stringify(res2.data))
  // const res3 = await shopee.get_session({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103'
  // })
  // console.log(JSON.stringify(res3.data))
  // const res4 = await shopee.set_session_read({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103',
  //   last_read_message_id: '2vzWIi80BtRir61331'
  // })
  // console.log(JSON.stringify(res4.data))
  // const res5 = await shopee.recall_messages({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103',
  //   message_id: '2vzWIi80BtRir61331'
  // })
  // console.log(JSON.stringify(res5.data))

  // const res6 = await shopee.get_messages({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103',
  //   last_message_id: '2vzWIi80BtRir61331', start_time: new Date().valueOf(), page_size: 20
  // })
  // console.log(JSON.stringify(res6.data))

  // const res7 = await shopee.send_messages({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103',
  //   template_id: 1, txt: 'test222'
  // })
  // console.log(JSON.stringify(res7.data))
}

main()