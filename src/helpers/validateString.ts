type Pattern = 'phone' | 'birthday' | 'name'
export const validateString = (input: string, pattern: Pattern) => {
    if (pattern === 'phone') {
        const regExp = /^\+7 \(\d{3}\) \d{3}-\d{4}$/;
        return regExp.test(input);
    }
    if (pattern === 'birthday') {
        const regExp = /^(\d{2})\.(\d{2})\.(\d{4})$/;
        if (!regExp.test(input)) {
            return false
        }
        const [year, month, day] = input.split('.')
            .map(el => Number(el)).reverse()
        const inputDate = new Date(year, month, day)
        const currentDate = new Date();
        return inputDate <= currentDate;
    }
    return input.length > 0
}