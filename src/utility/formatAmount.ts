const formatNumber = (value?: unknown) => {
	if (typeof value === "number") {
		return new Intl.NumberFormat().format(value)
	}

	return "0";

}
export default formatNumber;