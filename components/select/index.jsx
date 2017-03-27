const { read } = require('buhoi-client').actions
const { combineReducers } = require('redux')
const Same = require('../same')

require('./style.scss')

module.exports = Select
module.exports.actions = { setValue }
module.exports.reducer = combineReducers({
	value: valueReducer,
	items: itemsReducer,
	request: requestReducer,
})

function Select (props) {
	const { resource, query, request, value, items, dispatch, onChange, label } = props

	if (!items && resource && !request) {
		dispatch(fetch(resource, query))
		return <Same />
	}

	if (request) {
		return <Same />
	}

	if (!value) {
		dispatch(setValue(items[0]))
		onChange(items[0])
	}

	return <div className="select">
		<span>{label}</span>
		<select onChange={handleChange}>{items.map(it =>
			<option value={it.id} selected={value && it.id == value.id}>{it.name}</option>
		)}</select>
	</div>

	function handleChange (ev) {
		const id = ev.target.value
		const selectIt = items.find(it => it.id == id)
		dispatch(setValue(selectIt))
		onChange(selectIt)
	}
}

function fetch (resource, query) {
	return read('SELECT_LOADING', resource, query)
}

function setValue (value) {
	return { type: 'SELECT_SET_VALUE', value }
}

function valueReducer (state = null, action) {
	return action.type == 'SELECT_SET_VALUE' ? action.value : state
}

function itemsReducer (state = null, action) {
	switch (action.type) {
		case 'SELECT_LOADING_SUCCEEDED': return action.result
		case 'SELECT_LOADING_FAILED': return []
		default: return state
	}
}

function requestReducer (state = null, action) {
	switch (action.type) {
		case 'SELECT_LOADING_STARTED':
			return action.request
		case 'SELECT_LOADING_SUCCEEDED':
		case 'SELECT_LOADING_FAILED':
			return null
		default: return state
	}
}