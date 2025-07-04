---
layout: page
---

# 推荐计划 API

<GlobalAuth />

## 获取推荐链接列表。
! Need access token in bearer token authorization

<InteractiveReferralprogramAPIEndpoint1 />

## 添加推荐链接。
! Need access token in bearer token authorization

<InteractiveReferralprogramAPIEndpoint2 />

## 将费用历史导出到 xlsx 文件
! Need access token in bearer token authorization

<InteractiveReferralprogramAPIEndpoint3 />

## 获取费用历史
! Need access token in bearer token authorization

<InteractiveReferralprogramAPIEndpoint4 />

## 获取推荐链接的公共属性。
No description available

<InteractiveReferralprogramAPIEndpoint5 />

## 获取推荐计划的当前百分比。
! Need access token in bearer token authorization

<InteractiveReferralprogramAPIEndpoint6 />

## 获取推荐计划的标题。
! Need access token in bearer token authorization

<InteractiveReferralprogramAPIEndpoint7 />

## 获取推荐链接的详细信息。
! Need access token in bearer token authorization

<InteractiveReferralprogramAPIEndpoint8 />

## 设置默认推荐链接。
! Need access token in bearer token authorization

<InteractiveReferralprogramAPIEndpoint9 />

<script setup>
import InteractiveReferralprogramAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint1.vue'
import InteractiveReferralprogramAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint2.vue'
import InteractiveReferralprogramAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint3.vue'
import InteractiveReferralprogramAPIEndpoint4 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint4.vue'
import InteractiveReferralprogramAPIEndpoint5 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint5.vue'
import InteractiveReferralprogramAPIEndpoint6 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint6.vue'
import InteractiveReferralprogramAPIEndpoint7 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint7.vue'
import InteractiveReferralprogramAPIEndpoint8 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint8.vue'
import InteractiveReferralprogramAPIEndpoint9 from '../../.vitepress/theme/components/InteractiveReferralprogramAPIEndpoint9.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Get list of referral link.', anchor: '#get-list-of-referral-link' },
  { text: 'Add referral link.', anchor: '#add-referral-link' },
  { text: 'Export history of fees to xlsx file', anchor: '#export-history-of-fees-to-xlsx-file' },
  { text: 'Get history of fees', anchor: '#get-history-of-fees' },
  { text: 'Get public attributes of referral link.', anchor: '#get-public-attributes-of-referral-link' },
  { text: 'Get current percents of referral program.', anchor: '#get-current-percents-of-referral-program' },
  { text: 'Get header of referral program.', anchor: '#get-header-of-referral-program' },
  { text: 'Get details of referral link.', anchor: '#get-details-of-referral-link' },
  { text: 'Set default referral link.', anchor: '#set-default-referral-link' }
]" />
