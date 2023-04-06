<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import ContainerView from "./views/ContainerView.vue";
</script>

<template>
	<v-app class="h-auto w-auto">
		<v-toolbar border color="surface">
		</v-toolbar>
		<v-main>
			<v-container style="max-width: 1300px">
				<v-row>
					<v-col cols="3">
						<v-sheet min-height="85vh">
							<v-card min-height="85vh" :title="deviceName" >
								<v-divider class="mx-2"/>
								<v-card-text>
									<v-list active-color="primary" density="compact" nav>
										<v-list-subheader title="ONE"/>
										<v-list-item title="Device status" prepend-icon="mdi-checkbox-blank-circle" append-icon="mdi-open-in-new"
																 :href="deviceStatusPage" target="_blank"/>

										<v-list-subheader v-if="navigationItems.configurationContainer.length" title="Configuration"/>
										<v-list-item v-for="container of navigationItems.configurationContainer" :key="container.container"
																 :active="selectedContainer?.name === container.name"
																 :title="container.name" prepend-icon="mdi-checkbox-blank-circle"
																 @click="navigationClick(container)"/>

										<v-list-subheader v-if="navigationItems.timeseriesContainer.length" title="Timeseries"/>
										<v-list-item v-for="container of navigationItems.timeseriesContainer" :key="container.container"
																 :active="selectedContainer?.name === container.name"
																 :title="container.name" prepend-icon="mdi-checkbox-blank-circle"
																 @click="navigationClick(container)"/>
									</v-list>
								</v-card-text>
							</v-card>

						</v-sheet>
					</v-col>
					<v-col cols="9">
						<v-sheet min-height="85vh">
							<ContainerView v-if="selectedContainer" :containerDetails="selectedContainer" :device="device" />
						</v-sheet>
					</v-col>

				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import {ONE_API, Device} from "../helper/one_api.mjs";
export default {
	name: 'App',
	data() {
		return {
			device: null,
			deviceName: '',
			deviceStatusPage: '',
			deviceBlueprint: [],
			selectedContainer: null
		}
	},
	computed: {
		navigationItems() {
			const configurationContainer = [];
			const timeseriesContainer = [];

			for (const container of this.deviceBlueprint) {
				if (container.container.startsWith('config'))
					configurationContainer.push(container);
				else
					timeseriesContainer.push(container);
			}
			const listItems = [];
			if(configurationContainer.length) {
				listItems.push({type: 'subheader', name: 'Configuration'})
				listItems.push(...configurationContainer);
			}
			if(timeseriesContainer.length) {
				listItems.push({type: 'subheader', name: 'Timeseries'})

				listItems.push(...timeseriesContainer);
			}

			return {
				configurationContainer,
				timeseriesContainer
			}
		}
	},
	methods: {
		navigationClick( container) {
			this.selectedContainer = container;
		}
	},
	async created() {
		try {
			ONE_API.apiToken = import.meta.env.VITE_API_TOKEN;
			const device = new Device(import.meta.env.VITE_DEVICE_ID);
			await device.initialize();
			this.deviceName = device.name;
			this.deviceBlueprint = await device.getBlueprint();
			this.deviceStatusPage = device.statusPage;
			this.selectedContainer = this.deviceBlueprint[0]; //autoselect the first container
			this.device = device;
			document.title = device.name;
		} catch (e) {
			console.error(e);
		}
	}
}

</script>

<style scoped>
</style>
