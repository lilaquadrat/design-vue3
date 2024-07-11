<script setup lang="ts">
import type Sitemap from '@/interfaces/Sitemap.interface';
import type FooterContact from '@/interfaces/FooterContact.interface';
import type FooterSocial from '@/interfaces/FooterSocial.interface';
import { useInview } from '@/plugins/inview';
import { ref } from 'vue';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import type Picture from '../../interfaces/picture.interface';
import type Textblock from '../../interfaces/textblock.interface';
import type LinkListWithTitle from '../../interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '../../interfaces/ListWithTitle.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  contact?: FooterContact;
  social?: FooterSocial;
  legal?: string;
  sitemap?: Sitemap[];
  picture?: Picture;
  textblock?: Textblock;
  links?: LinkListWithTitle;
  list?: ListWithTitle;

}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });

</script>
<template>
  <footer :id="id" ref="element" :class="[inviewState, variant]" class="lila-footer-module lila-module">
    <section class="footer-container">
      <lila-picture-partial v-if="picture" v-bind="picture" class="picture-container" />
      <section class="informations-container">
        <lila-textblock-partial v-if="textblock" v-bind="textblock" />
        <lila-list-partial class="list-container" v-if="list" v-bind="list" />
        <lila-list-partial class="link-container" v-if="links" v-bind="links" />
      </section>

      <template v-if="sitemap">
        <li v-for="(element, index) in sitemap" :key="`sitemap-element-links-${index}`" class="link-container">
          <lila-list-partial class="link-container" v-if="element.links" v-bind="element.links" />
        </li>
      </template>
    </section>

    <section class="contact-social-container">
      <section v-if="contact" class="contact">
        <h3>{{ contact.title }}</h3>
        <h3><lila-link-partial v-bind="contact.link" /></h3>
      </section>

      <section v-if="social" class="social">
        <h3>{{ social.title }}</h3>

        <div class="icon-container">
          <lila-link-partial v-for="(element, index) in social.elements" :key="`social-elements-${index}`"
            :link="element.link.link">
            <lila-picture-partial v-bind="element.picture" />
          </lila-link-partial>
        </div>
      </section>
    </section>

    <section class="legal">{{ legal }}</section>
  </footer>
</template>
<style lang="less" scoped>
.lila-footer-module {

  .module;
  .multi(margin-top, 50);

  display: grid;
  grid-template-rows: min-content min-content min-content;
  gap: 40px;
  width: 100%;
  max-width: @desktopWidthExt;
  margin: auto;

  background: transparent;

  @media @desktop {
    .multi(margin-top, 80);
  }

  h3 {
    color: @grey;
    font-size: @fontTextSmaller;
    .font-bold;
  }

  .contact-social-container {
    display: grid;

    grid-template-rows: 1fr 1fr;

    gap: 20px;
    align-items: center;

    @media @tablet,
    @desktop {
      grid-template-rows: auto;
      grid-template-columns: max-content 1fr;
    }
  }

  .footer-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px 20px;
    @media @desktop {
      grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    }

  }
  .social {

    display: grid;

    grid-template-columns: 1fr 1fr;
    gap: 15px;
    align-items: center;

    @media @tablet, @desktop {
      grid-template-columns: 1fr auto;
      justify-items: end;
    }

    .icon-container {
      display: flex;
      flex-flow: wrap;

      gap: 10px;

      :deep(.lila-link) {

        display: grid;

        img {
          max-width: 30px;
          max-height: 30px;
        }
      }
    }
  }

  .contact {

    display: grid;

    grid-template-columns: 1fr 1fr;
    gap: 15px;

    align-items: center;

    @media @tablet,
    @desktop {
      grid-template-columns: 1fr auto;
      justify-items: start;
    }

    a {
      .font-bold;
      font-size: @fontText;
    }
  }

  .content {
    border: red solid 3px; 
    display: grid;
    grid-template-rows: min-content 1fr;
    gap: 10px;

    a {
      font-size: @fontTextSmaller;
    }
  }

  .legal {
    border-top: solid 1px @grey;
    text-align: right;

    .multi(padding, 4, 0);
  }

  &.noPicture {
    .footer-container > *:first-child {
      visibility: hidden;
      position: absolute;
    }
  }

  &.footerWithIcon {

    .footer-container {
    display: grid;
    grid-template-columns: 1fr;

    @media @desktop {
      grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    }
  }
    .informations-container {
      display: grid;
      gap: 20px
    }

    .contact {
      display: none;
    };

    .social {
      @media @tablet, @desktop {
        grid-column-start: 2;
      }
    }
  }
}</style>
