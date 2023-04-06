<template>
	<v-card min-height="85vh" >
		<v-card-title class="d-flex flex-row">
			<span>{{containerDetails.name}}</span>
			<v-spacer/>
			<v-btn color="primary" variant="tonal"  prepend-icon="mdi-autorenew" @click="getContainerValues">Load</v-btn>
		</v-card-title>
		<v-card-subtitle>Container: {{containerDetails.container}}; transferDirection: {{containerDetails.transferDirection}}</v-card-subtitle>
		<v-divider class="mx-2"/>
		<v-card-text class="mx-6">
			<ConfigContainer v-if="isConfigContainer" :device="device" :containerDetails="containerDetails" :containerValues="containerValues"/>
			<TimeseriesContainer v-else :device="device" :containerDetails="containerDetails" :containerValues="containerValues"/>
		</v-card-text>

	</v-card>
</template>

<script setup>
import ConfigContainer from "../components/ConfigContainer.vue";
import TimeseriesContainer from "../components/TimeseriesContainer.vue";
</script>

<script>
export default {
	name: "ContainerView",
	props: {
		device: {},
		containerDetails: {},
	},
	data() {
		return {
			containerValues: undefined
		}
	},
	watch: {
		containerDetails(v) {
			this.containerValues = undefined;
			//automatically fetch the container values
			this.getContainerValues();
		}
	},
	computed: {
		isConfigContainer() {
			return this.containerDetails.container.startsWith('config');
		}
	},
	methods: {
		async getContainerValues() {
			if (this.isConfigContainer) {
				this.containerValues = await this.device.getContainer(this.containerDetails.name);
			} else {
				this.containerValues = await this.device.getTimeseries(this.containerDetails.name, {count: -5});
			}

		}
	}
}
</script>

<style scoped>

</style>
