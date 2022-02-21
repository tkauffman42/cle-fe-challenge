<template>
  <div class="player-page">
    <button @click="returnToAllPlayers()">Return to all players</button>
    <PlayerBanner :playerInfo="clonedPlayer" @select="selectedPitchDay" />
    <div>
      <Panel title="All Pitches">
        <PitchPlot :pitches="allPitchData" />
      </Panel>
    </div>
    <div v-for="p in typesOfPitches" :key="p.pitchName">
      <div>
        <Panel :title="p.pitchName">
          <PitchPlot :pitches="allPitchData" :filteredPitch="p.pitchName" />
        </Panel>
      </div>
    </div>
  </div>
</template>
<script>
import PlayerBanner from "./PlayerBanner.vue";
import Panel from "./layout/Panel.vue";
import PitchPlot from "./plots/PitchPlot.vue";

import { pitchData } from "../shared/data";

export default {
  components: {
    PlayerBanner,
    Panel,
    PitchPlot,
  },
  props: {
    player: {
      type: Object,
    },
  },
  data() {
    return {
      clonedPlayer: { ...this.player },
      selectedGame: null,
      allPitchData: this.pitches,
      pitchData: [],
      typesOfPitches: [],
    };
  },
  methods: {
    //Returns the selected drop down gameID
    selectedPitchDay(selectedGameValue) {
      this.selectedGame = selectedGameValue;
    },
    //get all of the pitch data based on the playerId
    async returnPitchData(playerData) {
      var returnedPitchData = await pitchData.getPitchData(
        playerData.pitcherId
      );
      this.pitchData = returnedPitchData.data.pitches;

      var gamePitches = this.pitchData.filter(function (elem) {
        return elem.gameId === playerData.gameId;
      });
      //foreach pitch thrown in the game, set their x, y, pitch color and is selectable and push to the pitches array
      gamePitches.forEach((p) => {
        this.allPitchData.push({
          x: p.x, //-- REQUIRED - center of ball - in feet
          y: p.y, //-- REQUIRED -center of ball - in feet
          stroke: "black", //-- REQUIRED - outline color
          strokeWidth: 0.01, //-- REQUIRED - outline width - in feet
          strokeOpacity: 1, //-- REQUIRED - outline opacity
          selectedStroke: "gold", //-- OPTIONAL - selected outline color
          selectedStrokeWidth: 2, //-- OPTIONAL - selected stroke width - in feet
          fillOpacity: 1, //-- REQUIRED - fill opacity
          fill: p.pitchColor, //-- REQUIRED - fill color
          radius: 1.5 / 12, //-- REQUIRED - in feet
          isSelected: false, //-- OPTIONAL
          isSelectable: p.resultPitchId === 2 ? false : true, //-- OPTIONAL (if falsy, balls cannot be selected)
          isVisible: true, //-- REQUIRED],
          pitchType: p.pitchName, //-- required
        });
      });

      this.thrownPitches(gamePitches, "pitchName");
    },
    //gets all of the types of pitches that were thrown in the game
    thrownPitches(pitchData, key) {
      var pitchesThrown = [
        ...new Map(pitchData.map((x) => [x[key], x])).values(),
      ];

      this.typesOfPitches = pitchesThrown;
    },
    returnToAllPlayers() {
      this.$emit("return");
    },
  },
  watch: {
    selectedGame: {
      handler(newValue, oldValue) {
        this.allPitchData = [];
        this.returnPitchData(newValue);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/_variables.scss";
</style>