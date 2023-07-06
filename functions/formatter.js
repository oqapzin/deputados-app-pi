export function dateFormatter(date) {
    if (date == null || date == 0) {
        return "Data não informada."
    } else {
        let data = new Date(date);
        return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(data)
    }
};

export function numberFormatter(value) {
    return (value > 0) ? "R$" + Intl.NumberFormat().format(value) : "R$" + value
}

export function timeFormatter(time) {
    if (time < 60) {
        return `${time}min`
    } else {
        const horas = Math.floor(time / 60);
        const min = time % 60;
        const textoHoras = (`00${horas}`).slice(-2);
        const textoMinutos = (`00${min}`).slice(-2);

        return `${textoHoras}h ${textoMinutos}min`;
    }
}