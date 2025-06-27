---
layout: page
---

# Datasource API

<InteractiveDatasourceAPI />

## GET /datasource/coin-info
get coin info by asset id and source id

<InteractiveDatasourceAPIEndpoint1 />

## Get datasource assets price.
No description available

<InteractiveDatasourceAPIEndpoint2 />

## GET /datasource/prices/history
get datasource prices history by asset id, coin id, source id and interval endpoint handler

<InteractiveDatasourceAPIEndpoint3 />

## Get datasource list.
No description available

<InteractiveDatasourceAPIEndpoint4 />

<script setup>
import InteractiveDatasourceAPI from '../.vitepress/theme/components/InteractiveDatasourceAPI.vue'
import InteractiveDatasourceAPIEndpoint1 from '../.vitepress/theme/components/InteractiveDatasourceAPIEndpoint1.vue'
import InteractiveDatasourceAPIEndpoint2 from '../.vitepress/theme/components/InteractiveDatasourceAPIEndpoint2.vue'
import InteractiveDatasourceAPIEndpoint3 from '../.vitepress/theme/components/InteractiveDatasourceAPIEndpoint3.vue'
import InteractiveDatasourceAPIEndpoint4 from '../.vitepress/theme/components/InteractiveDatasourceAPIEndpoint4.vue'
import SimpleOutline from '../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'GET /datasource/coin-info', anchor: '#get-datasourcecoininfo' },
  { text: 'Get datasource assets price.', anchor: '#get-datasource-assets-price' },
  { text: 'GET /datasource/prices/history', anchor: '#get-datasourcepriceshistory' },
  { text: 'Get datasource list.', anchor: '#get-datasource-list' }
]" />
