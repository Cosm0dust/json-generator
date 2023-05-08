export const formateDateString = (date: string) =>{
    if(date){
        const newDate = date.split('-').reverse()
        return newDate.join('.')
    }
    return ''
}
