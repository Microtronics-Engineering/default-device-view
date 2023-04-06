<template>
<v-text-field
		:disabled="disabled"
		:modelValue="value"
		:readonly="readonly"
		:rules="rules"
		:label="title"
		:type="type"
		@update:modelValue="valueChanged($event)">
	<template v-if="unit" v-slot:append-inner>
		<div class="">{{unit}}</div>
	</template>
</v-text-field>

</template>

<script setup>

</script>

<script>
export default {
	name: "ContainerField",
	props: {
		fieldData: {
			type: Object,
			mandatory: true,
			default: {}
		},
		writeable: {
			type: Boolean,
			mandatory: true,
			default: false
		}
	},
	data() {
		return {
			changedValues: {},
			typeNumber : ["s8", "s16", "s32", "s64", "u8", "u16", "u32", "f16", "f32", "f64"],
			typeString : ["string"],
			typeStamp : ["stamp32", "stamp40"],
		}
	},
	computed: {
		title() {
			return this.fieldData.title;
		},
		value() {
			return this.fieldData.value;
		},
		isStamp() {
			return this.typeStamp.includes(this.fieldData.type);
		},
		isString() {
			return this.typeString.includes(this.fieldData.type);
		},
		isNumber() {
			return this.typeNumber.includes(this.fieldData.type);
		},
		readonly() {
			return !this.writeable;
		},
		disabled() {
			return this.fieldData.value === null && !this.writeable;
		},
		type() {
			if (this.isStamp) {
				return null//'datetime-local';
			} else if (this.isNumber) {
				return 'number';
			}
			return null;
		},
		rules() {
			if (this.isNumber) {
				return this.rulesNumber(this.fieldData)
			} else if (this.isString){
				return this.rulesString(this.fieldData)
			} else if (this.isStamp){
				return this.rulesStamp(this.fieldData)
			} else {
				return null;
			}
		},
		unit() {
			return this.fieldData.unit || null;
		},
		canSave() {
			return !!Object.keys(this.changedValues).length;
		}
	},
	methods: {
		rulesNumber(field) {
			return [
				field.minValue==null || field.value >= field.minValue ,
				field.maxValue==null || field.value <= field.maxValue
			];
		},
		rulesString(field) {
			return [
				field.minValue==null || field.value.length >= field.minValue ,
				field.maxValue==null || field.value.length <= field.maxValue
			];
		},
		rulesStamp(field) {
			//todo define stamp format
			return [true];
		},
		valueChanged(value) {
			if (this.isStamp) {
				value = new Date(value).toISOString();
			}
			this.$emit('update:value', value)
		}
	}
}
</script>

<style lang="less" scoped>

</style>
