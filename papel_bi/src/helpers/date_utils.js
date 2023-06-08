

export function getLastFiveYears(){
    const currentYear = new Date().getFullYear()
    const currentYear_1 = currentYear - 1
    const currentYear_2 = currentYear - 2
    const currentYear_3 = currentYear - 3
    const currentYear_4 = currentYear - 4

    return [currentYear, currentYear_1,currentYear_2,currentYear_3,currentYear_4]
}

export function getCurrentYear(){
    return new Date().getFullYear()
}

export function getCurrentMonth(){
    const month = new Date().getMonth()
    switch(month){
        case 0: return {key:1, month: 'Enero'}
        case 1: return {key:2, month: 'Febrero'}
        case 2: return {key:3, month: 'Marzo'}
        case 3: return {key:4, month: 'Abril'}
        case 4: return {key:5, month: 'Mayo'}
        case 5: return {key:6, month: 'Junio'}
        case 6: return {key:7, month: 'Julio'}
        case 7: return {key:8, month: 'Agosto'}
        case 8: return {key:9, month: 'Septiembre'}
        case 9: return {key:10, month: 'Octubre'}
        case 10: return {key:11, month: 'Noviembre'}
        case 11: return {key:12, month: 'Diciembre'}
        
        default: return {key:1, month: 'Enero'}
    }
    return month
}

export function getMonths(){

    return [
        {key:1, month: 'Enero'},
        {key:2, month: 'Febrero'},
        {key:3, month: 'Marzo'},
        {key:4, month: 'Abril'},
        {key:5, month: 'Mayo'},
        {key:6, month: 'Junio'},
        {key:7, month: 'Julio'},
        {key:8, month: 'Agosto'},
        {key:9, month: 'Septiembre'},
        {key:10, month: 'Octubre'},
        {key:11, month: 'Noviembre'},
        {key:12, month: 'Diciembre'},
    ]

}