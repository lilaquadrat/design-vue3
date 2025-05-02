<script setup lang="ts">
import type { ChildData, ContentWithPositions } from '@lilaquadrat/interfaces';
import { provide } from 'vue';

const props = defineProps<{
  content: ContentWithPositions;
  inline?: boolean;
  sub?: boolean;
  routeBase?: string;
  linkEvents?: boolean;
  linkBase?: string;
  linkMode?: string;
  contentChildData?: ChildData;
}>();

provide('linkMode', props.linkMode);
provide('linkBase', props.linkBase);
</script>

<template>
  <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
    <tbody>
      <tr>
        <td align="center" style="padding: 40px">
          <table style="width: 100%; max-width: 600px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td>
                  <article v-if="!!content.top.length" class="top container" :class="{ inline, sub }">
                    <component :is="`${single.type}`" v-for="single in content.top" :key="single.uuid" :class="[single.classes, { sub }]" v-bind="single" :additional="content.additional" position="top" />
                  </article>
    
                  <table v-if="!!content.content.length" class="container" border="0" cellspacing="0" cellpadding="0" :inline="inline">
                    <tbody>
                      <tr>
                        <td>
                          <template v-for="single in content.content" :key="single.uuid">
                            <component :is="`${single.type}`" :class="[single.classes, { sub }]" v-bind="single" :sub="sub" :additional="content.additional" position="content" />
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
    
                  <article v-if="!!content.bottom.length" class="bottom container" :class="{ inline, sub }">
                    <component :is="`${single.type}`" v-for="single in content.bottom" :key="single.uuid" :class="[single.classes, { sub }]" v-bind="single" :additional="content.additional" position="bottom" />
                  </article>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</template>
