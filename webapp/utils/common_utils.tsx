
export function millisecToDate(millisec: number): string {

    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };

    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const datestring = formatter.format(new Date(millisec))

    return datestring

}


export function calcGiorniLav(startMsec: number, endMsec: number): number {

    let ggLav = 1
    let lastCheck = startMsec

    while (lastCheck < endMsec) {

        lastCheck += 1000 * 60 * 60 * 24
        let week_day = new Date(lastCheck).getDay()
        if(week_day !== 0 && week_day !== 6) {
            ggLav++
        }
    }

    return ggLav

}


