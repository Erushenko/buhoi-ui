require('./generic.scss')

const List = require('./list')
const Edit = require('./edit')
const Multiselect = require('./multiselect')
const Menu = require('./menu')
const Same = require('./same')
const TextInput = require('./text-input')
const Calendar = require('./calendar')
const DateRangeFilter = require('./date-range-filter')
const Select = require('./select')

const components = {
	List,
	Edit,
	Multiselect,
	Menu,
	Same,
	TextInput,
	Select,
	Calendar,
	DateRangeFilter,
}

module.exports = components

if (process.env.NODE_ENV == 'development') {
	const { createStore, combineReducers, applyMiddleware } = require('redux')
	const logger = require('redux-logger')

	const reducers = combineReducers({
		textInput: TextInput.reducer,
		dateRangeFilter: DateRangeFilter.reducer,
	})

	const store = createStore(reducers, applyMiddleware(logger()))

	store.subscribe(() => setTimeout(render,0))

	function render () { // eslint-disable-line no-inner-declarations
		const props = { ...store.getState(), dispatch: store.dispatch }
		const dom = AllComponents(props)
		const node = document.getElementById('root')
		Inferno.render(dom, node)
	}

	store.dispatch(TextInput.actions.setValue('hi'))

	if (module.hot) {
		module.hot.accept(() => store.dispatch({ type: 'HOT_RELOAD' }))
	}

	function AllComponents ({ textInput, dateRangeFilter, dispatch }) { // eslint-disable-line no-inner-declarations
		return <div>
			<TextInput {...textInput} label="text input" onChange={v => dispatch(TextInput.actions.setValue(v))} />
			<DateRangeFilter {...dateRangeFilter} onChange={() => null} dispatch={dispatch} />
		</div>
	}
}