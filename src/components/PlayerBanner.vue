<template>
  <div class="player-banner">
    <img :src="getImgUrl" />
    <div class="player-info">
      <div class="player-name">Name: {{ playerData.fullName }}</div>
      <div class="player-bio">
        age: {{ playerData.ageDecimal }}, pos: {{ playerData.position }},
        throws: {{ playerData.throws }}
      </div>
      <div class="player-contract-info">
        orgName {{ playerData.orgAbbr }} | Svc {{ playerData.serviceTime }}
      </div>
    </div>
    <div>
      Pitch Date:
      <select @change="selectedPitchDay()" v-model="key">
        <option
          v-for="(value, index) in pitchDays"
          :key="value.gameId"
          :value="index"
        >
          {{ value.gameDate | displayDate }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { playerInformationData, pitchData } from "../shared/data";

export default {
  name: "PitcherData",
  props: {
    playerInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      clonedPlayerInfo: { ...this.playerInfo },
      playerData: [],
      pitchData: [],
      pitchDays: [],
      key: "",
    };
  },
  mounted() {
    this.returnPlayerData(this.clonedPlayerInfo);
  },
  methods: {
    async returnPlayerData(clonedPlayerInfo) {
      this.playerData = await playerInformationData.getPlayerInformation(
        clonedPlayerInfo.playerId
      );
      this.playerData = this.playerData.data.playerDetail;
      this.returnPitchData(this.playerData);
    },
    async returnPitchData(playerData) {
      var returnedPitchData = await pitchData.getPitchData(playerData.playerId);
      this.pitchData = returnedPitchData.data.pitches;

      this.getPitchingDays(this.pitchData, "gameDate");
    },
    getPitchingDays(pitchData, key) {
      this.pitchDays = [...new Map(pitchData.map((x) => [x[key], x])).values()];
    },
    selectedPitchDay() {
      this.$emit("select", this.pitchDays[this.key]);
    },
  },
  computed: {
    getImgUrl() {
      return (
        "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/" +
        this.playerData.imgId +
        "/headshot/67/current"
      );
    },
  },
  filters: {
    displayDate: function (value) {
      return value.slice(0, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
img {
  width: 50px;
}
</style>