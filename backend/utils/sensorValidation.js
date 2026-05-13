export function isValidLux(value) {
    return Number.isInteger(value) && value >= 0 && value <= 1000
}

export function isValidSound(value) {
    return Number.isInteger(value) && value >= 0 && value <= 120
}

export function isValidTemperature(value) {
    return Number.isInteger(value) && value >= 0 && value <= 50
}

export function isValidHumidity(value) {
    return Number.isInteger(value) && value >= 20 && value <= 90
}