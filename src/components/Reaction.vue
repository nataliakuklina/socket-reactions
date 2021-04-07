<template>
  <div :id="value.id" class="heart">
    {{ code }}
  </div>
</template>

<script>
import REACTIONS from '../constants';

export default {
  props: {
    value: null
  },
  computed: {
    reactions: () => REACTIONS,
    code() {
      const { code }  = this.value
      if (!this.reactions[code]) {
        return '❤️';
      }

      return this.reactions[code];
    }
  },
}
</script>

<style scoped>
.heart {
  opacity: 1;
  width: 20px;
  border-radius: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  font-size:20px;
}
</style>