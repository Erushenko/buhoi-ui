require('./style.scss')

module.exports = Grouing

function Grouing (props) {
	const { fields, onClick } = props

	return <div className="group-items">
		{fields.map(it => <span
			field={it.field}
			className="group-items"
			onClick={() => handleChange(it.field)}>{it.label}
		</span>)}
	</div>

	function handleChange (field) {
		onClick(field)
	}
}