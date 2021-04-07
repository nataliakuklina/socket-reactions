<template>
  <div id="app">
    <template v-for="(symbol, code) in reactions">
      <button :key="code" @click="handleReactionClick(code)">{{ symbol }}</button>
    </template>

    <div class="reactions">
      <Reaction v-for="receive in received"
               :key="receive.id"
               :value="receive"
               :class="getClass(receive.id)"
      />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

import { io } from 'socket.io-client';

import Reaction from '@/components/Reaction.vue';

import REACTIONS from './constants';

const URL = 'http://localhost:3000';

const Socket = io(URL, { autoConnect: false });

export default {
  data() {
    return {
      received: [],
    };
  },
  computed: {
    reactions: () => REACTIONS,
  },
  mounted() {
    Socket.connect();
    Socket.on('reaction', this.handleReactionMessage)
  },
  beforeDestroy() {
    Socket.disconnect();
  },
  destroyed() {
    Socket.off('reaction');
  },
  methods: {
    handleReactionClick(code) {
      const id = Number(new Date());
      const data = { code, id }
      this.updateReceived(data);

      Socket.emit('reaction', data);
    },
    handleReactionMessage(data) {
      this.updateReceived(data);
    },
    updateReceived(data) {
      this.received.push(data);

      this.$nextTick(() => {
        this.addAnimation(data.id);
      })
    },
    addAnimation(id) {
      const object = {
        el: '.' + this.getClass(id),
        duration: 6
      };

      const timeline = gsap.timeline({ paused: true });
      timeline.to(object.el,
      {
        duration: 'random(3, 7)',
        opacity: 0,
        scale: 'random(1, 2)',
        x: 'random(-10, 10)',
        y: '-=400',
        modifiers: {
          x: x => `${Math.sin(parseFloat(x)) * 15}px`
        },
        onComplete: () => {
          this.clearReaction();
        }
      }, '<').play();
    },
    clearReaction() {
      this.received.shift();
    },
    getClass(id) {
      return `reaction_${id}`;
    },
  },
  components: { Reaction },
};
</script>
