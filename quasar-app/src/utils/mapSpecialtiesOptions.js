export default function(sp) {
	return { ...sp, label: `${sp.category}: ${sp.name}` }
}
