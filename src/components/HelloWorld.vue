<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Authenticate Nami</p>
    <button id="login-btn" @click="authenticate">Login</button>
  </div>
</template>

<script lang="ts">
import { Buffer } from "buffer";
let csl, wallet;

async function loadCsl(){
    csl = await import("@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib");
};
loadCsl();

async function authenticate() {
      console.log("In authenticate()")

      if (!csl) await loadCsl(); // make sure CSL is loaded before doing anything else.

      wallet = await window.cardano.nami.enable();

      const [stakeAddrHex, stakeAddrBech32] = await getStakeAddress();
      const messageUtf = `account: ${stakeAddrBech32}`;

      console.log(`debug: messageUtf after getStakeAddress: ${messageUtf}`)
      const messageHex = Buffer.from(messageUtf).toString("hex");    
      const sigData = await wallet.signData(stakeAddrHex, messageHex);
      const result = await submitToBackend(sigData);
      alert(result.message);
    }

    async function getStakeAddress(){
    const networkId = await wallet.getNetworkId();
    const changeAddrHex = await wallet.getChangeAddress();

    console.log(`Debug: changeAddrHex: ${changeAddrHex}`)
    
    // derive the stake address from the change address to be sure we are getting
    // the stake address of the currently active account.
    const changeAddress = csl.Address.from_bytes( Buffer.from(changeAddrHex, 'hex') );
    const stakeCredential = csl.BaseAddress.from_address(changeAddress).stake_cred();
    const stakeAddress = csl.RewardAddress.new(networkId, stakeCredential).to_address();

    return [stakeAddress.to_hex(), stakeAddress.to_bech32()];
}

async function submitToBackend(sigData){
  console.log("In submitToBackend with sigData:")
  console.log(sigData)

  // replace with real API route later - if we get here we got past the csl error.
    const result = await fetch(`http://localhost:8081/login`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sigData),
    });
    return result.json();
}

export default {
  data() {
    return {
      
    }
  },
  props: {
    msg: String
  },
  methods: {
    async loadCsl2(){ // In case vue handles methods different than functions
      csl = await import("@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib");
    }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  border: 1px solid black;
  background-color: #f1f1f1;
  color: black;
  min-width: 50vw;
  min-height: 40vw;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
