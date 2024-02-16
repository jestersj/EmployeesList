export const parseDate = (str: string) => {
    const [day, month,year] = str.split('.').reverse().map(el => Number(el))
    return new Date(day, month, year).getTime()
}