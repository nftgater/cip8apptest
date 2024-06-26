<template>
  
  <div class="home">
    
    <HelloWorld msg="CIP-0008 Implementation Example" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: DodgerBlue;
  border-radius: 0px 0px 10px 10px;

}
</style>