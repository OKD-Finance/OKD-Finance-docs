---
layout: page
---

# 钱包 API

<GlobalAuth />

## 获取余额
! Need access token in bearer token authorization

<InteractiveWalletAPIEndpoint1 />

## 获取美元总余额
! Need access token in bearer token authorization

<InteractiveWalletAPIEndpoint2 />

## 获取用户交易历史。
! Need access token in bearer token authorization

<InteractiveWalletAPIEndpoint3 />

## Returns deposit address for coin+chain. Result is described here.
https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr
! Need access token in bearer token authorization

<InteractiveWalletAPIEndpoint4 />

## Create internal transfer (operation) between users.
! Need access token in bearer token authorization

<InteractiveWalletAPIEndpoint5 />

## Create withdrawal (operation) for specified assets
! Need access token in bearer token authorization

<InteractiveWalletAPIEndpoint6 />

## 拒绝用户确认的提现。
! Need Bearer token and OTP authorization

<InteractiveWalletAPIEndpoint7 />

<script setup>
import InteractiveWalletAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveWalletAPIEndpoint1.vue'
import InteractiveWalletAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveWalletAPIEndpoint2.vue'
import InteractiveWalletAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveWalletAPIEndpoint3.vue'
import InteractiveWalletAPIEndpoint4 from '../../.vitepress/theme/components/InteractiveWalletAPIEndpoint4.vue'
import InteractiveWalletAPIEndpoint5 from '../../.vitepress/theme/components/InteractiveWalletAPIEndpoint5.vue'
import InteractiveWalletAPIEndpoint6 from '../../.vitepress/theme/components/InteractiveWalletAPIEndpoint6.vue'
import InteractiveWalletAPIEndpoint7 from '../../.vitepress/theme/components/InteractiveWalletAPIEndpoint7.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Get balances', anchor: '#get-balances' },
  { text: 'Get total balance in USD', anchor: '#get-total-balance-in-usd' },
  { text: 'Get user transactions history.', anchor: '#get-user-transactions-history' },
  { text: 'Returns deposit address for coin+chain. Result is described here. https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr', anchor: '#returns-deposit-address-for-coinchain-result-is-described-here-httpsbybitexchangegithubiodocsv5assetdepositsubdepositaddr' },
  { text: 'Create internal transfer (operation) between users.', anchor: '#create-internal-transfer-operation-between-users' },
  { text: 'Create withdrawal (operation) for specified assets', anchor: '#create-withdrawal-operation-for-specified-assets' },
  { text: 'Reject withdrawal confirmed by user.', anchor: '#reject-withdrawal-confirmed-by-user' }
]" />
