<template>
<v-row class="mt-2" align="center" v-for="field in fields">
	<ContainerField :fieldData="field" :writeable="writeable"
									@update:value="valueChanged(field.name, $event)"/>
</v-row>

<v-row class="flex-row mt-4">
	<v-spacer/>
	<v-btn v-if="writeable" color="primary" prepend-icon="mdi-content-save" :disabled="!canSave" @click="saveChangedValues">
		Save
	</v-btn>
</v-row>



</template>

<script setup>
import ContainerField from "./ContainerField.vue";
</script>

<script>
export default {
	name: "ConfigContainer",
	props: {
		device: {},
		containerDetails: {},
		containerValues: {
			type: Object,
			default: {}
		},
	},
	data() {
		return {
			changedValues: {}
		}
	},
	methods: {
		valueChanged(name, value) {
			this.changedValues[name] = value;
		},
		async saveChangedValues() {
			Object.assign(this.containerValues, this.changedValues);
			await this.device.writeContainer(this.containerDetails.name, this.changedValues);
			this.changedValues = {};
		}
	},
	computed: {
		writeable() {
			return this.containerDetails.transferDirection === 'down';
		},
		fields() {
			const fields = [];
			this.containerDetails.fields.forEach(field => {
				field.value = this.containerValues[field.name] ?? null;
				fields.push(field);
			});
			return fields;
		},
		canSave() {
			return !!Object.keys(this.changedValues).length;
		}
	},
	async mounted() {

	}
}
</script>

<style scoped>

</style>
