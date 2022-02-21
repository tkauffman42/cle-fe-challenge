<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8"><h1>CLE Guardians Pitchers</h1></div>
    </div>
    <table v-if="!selectedPlayer" class="table">
      <thead>
        <tr>
          <th scope="col">Player Name</th>
          <th scope="col">Position</th>
          <th scope="col">Org Abbreviation</th>
        </tr>
      </thead>
      <tbody
        v-for="player in allPlayers"
        :key="player.playerId"
        v-on:click="clickedPlayer(player)"
      >
        <tr class="clickable-row">
          <td>{{ player.fullName }}</td>
          <td>{{ player.position }}</td>
          <td>{{ player.orgAbbr }}</td>
        </tr>
      </tbody>
    </table>
    <PlayerDetail
      v-if="selectedPlayer"
      :player="selectedPlayer"
      @return="returnToAllPlayers"
    />
  </div>
</template>
<script>
import { allPlayerData } from "../shared/data";
import PlayerDetail from "./PlayerDetail.vue";
export default {
  name: "clePitchers",
  components: {
    PlayerDetail,
  },
  data() {
    return {
      allPlayers: [],
      selectedPlayer: undefined,
    };
  },
  async created() {
    await this.loadPlayers();
  },
  methods: {
    async loadPlayers() {
      var returnedPlayers = await allPlayerData.getPlayers();

      this.allPlayers = returnedPlayers.data.players;
    },
    clickedPlayer(player) {
      this.selectedPlayer = player;
    },
    returnToAllPlayers() {
      this.selectedPlayer = undefined;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/_variables.scss";
.clickable-row {
  &:hover {
    cursor: pointer;
  }
}
</style>;
