# shopee-openapi-v2

A shopee openapi sdk, currently there is only sdk about im part

[![OSCS Status](https://www.oscs1024.com/platform/badge/MonveChen/shopee-openapi-v2.svg?size=small)](https://www.oscs1024.com/project/MonveChen/shopee-openapi-v2?ref=badge_small)

#### Usage

```typescript
import shopee from "shopee-openapi-v2"

shopee.setAppConfig({ partner_id: 108334, partner_key: "ZKpigRItsXvnImXfLzuKliOTByAOUhsZ", is_dev: true, redirect: 'xxxx' })
// retries、retryDelay 可选，用于当error === 'system_busy'时重试，默认retries:0，retryDelay:(retryCount: number) => Math.pow(retryCount, 2) * 1000

//授权
const res = await shopee.token_create({ code: '0_108334_gr0GkF1EuYdpvrIbqAD6pU7J5318' })
console.log(res.data.access_token)

await shopee.getAuthLink()
//https://partner.shopeemobile.com/api/v2/shop/auth_partner?partner_id=102323&sign=c4a1f3c87247100b2cfb48778f4dbf90b540f18fb9d2aa7a5abb5ed7f963cd0a&timestamp=1654498701&redirect=https://xx.xxxx.com/openapi/shopee/auth_redirect/c932e987fa81e70889e56a20b09df648

await shopee.chat.getAccesstoken({ code: '55485a58484f724c7963636369546e48', shop_id: 4455100, partner_id: 102323 })
```

##### 更多例子

<https://github.com/MonveChen/shopee-openapi-v2/blob/main/src/test.ts>

##### 

目前仅有im相关的接口，希望更多的人加入([如何加入](https://www.zhihu.com/question/39721968?from=profile_question_card))，一起为该开源sdk做出贡献([源码](https://www.zhihu.com/question/39721968?from=profile_question_card))

该项目由typescript编写，新接口参照[原有装饰器编写的接口](https://github.com/MonveChen/shopee-openapi-v2/blob/main/src/index.ts)填充即可，

e.g.

```typescript
@Post({ url: '/im/message/send' })
  send_messages!: ApiShopMethod<
    {
      access_token: string, template_id: number, session_id: string,
      txt?: string, img_url?: string, width?: number, height?: number,
      item_id?: string, order_id?: string, promotion_id?: string
    }, ExtraRes & { data: { message_id: string, template_id: number, current_time: number } }
  >
```
