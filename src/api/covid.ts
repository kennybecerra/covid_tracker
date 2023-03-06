


const baseURL = 'https://api.covid19api.com'

export const getCountryData = async (
	country: string
) => {

	const url = `https://api.covid19api.com/total/country/${country}/status`

	return await fetch(url)

}