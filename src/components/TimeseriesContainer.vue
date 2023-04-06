<template>
	<v-table>
		<thead>
			<tr>
				<th :class="textAlign" v-for="stamp in tableData.tableHead">
					{{stamp}}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="line of tableData.tableBody">
				<td :class="textAlign" v-for="data of line">
					{{data}}
				</td>
			</tr>
		</tbody>
	</v-table>

</template>

<script setup>

</script>

<script>
export default {
	name: "TimeseriesContainer",
	props: {
		device: {},
		containerDetails: {},
		containerValues: {
			type: Array,
			default: []
		}
	},
	computed: {
		textAlign() {
			if (!this.containerValues.length) return 'text-left'
			else return 'text-right'
		},
		tableData() {
			const lines = {stamp: ['Date Local time']};
			this.containerDetails.fields.forEach(field => {
				lines[field.name] = [field.name];
			});
			this.containerValues.forEach(record => {
				for (const [key, value] of Object.entries(record) ) {
					if (key === 'stamp') //convert stamp to local date
						lines[key].push(new Date(value).toLocaleString())
					else
						lines[key].push(value);
				}
			});
			const tableHead = lines.stamp;
			delete lines.stamp;

			const tableBody = [];
			for (const [key, values] of Object.entries(lines)) {
				tableBody.push(values)
			}

			return {
				tableHead,
				tableBody
			};
		}
	}
}
</script>

<style scoped>

</style>
