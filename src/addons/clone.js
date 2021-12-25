import clone from './deepClone.js'

export default function (componentIN, props, symbol) {
	let component = clone(componentIN)
	component['created'] = function () {
	    props.map(prop => {
	        if (prop in this.person) {
	            this.person[prop] = symbol.repeat(this.person[prop].length)
	        }
	    })
	}

	return component
}