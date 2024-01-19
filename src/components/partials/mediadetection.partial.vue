<script setup></script>
<template>
  <section id="mediadetection" class="mediadetection">
    <div class="mobile"></div>
    <div class="tablet"></div>
    <div class="desktop"></div>
    <div class="wide"></div>
  </section>
</template>
<style lang="less" scoped>
.mediadetection {

.tablet,
.desktop,
.wide {
  display: none;
}

.mobile {
  display: block;
}

@media @tablet {

  .mobile,
  .desktop,
  .wide {
    display: none;
  }

  .tablet {
    display: block
  }
}

@media @desktop {

  .mobile,
  .tablet,
  .wide {
    display: none;
  }

  .desktop {
    display: block;
  }
}

@media @wide {

  .mobile,
  .tablet,
  .desktop {
    display: none;
  }

  .wide {
    display: block
  }
}

}
</style>