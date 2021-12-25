export default function cloneObj (obj) {
	let clone
	if (obj.__proto__ == Array.prototype)
		clone = []
	else 
		clone = {}

	for (let key in obj) {
		if (typeof(obj[key]) != 'object')
			clone[key] = obj[key]
		else
			clone[key] = cloneObj(obj[key])
		
		//if (key == '_scopeId') clone[key] = "data-v-22222222"
	}

	return clone
}