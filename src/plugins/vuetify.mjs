/**
 * plugins/vuetify.mjs
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
	blueprint: md3,
	defaults: {
		VBtn: {
			rounded: 'pill',
		},
		VListItem: {
			rounded: 'xl'
		},
		VTextField: {
			variant: 'outlined',
			color: 'primary'
		},
		VTextarea: {
			variant: 'outlined',
			color: 'primary'
		},
	}
})
