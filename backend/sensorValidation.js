function isValidLux(value) {
    return Number.isInteger(value) && value >= 0 && value <= 1000
}

function isValidSound(value) {
    return Number.isInteger(value) && value >= 0 && value <= 120
}

function isValidTemperature(value) {
    return Number.isInteger(value) && value >= 0 && value <= 50
}

function isValidHumidity(value) {
    return Number.isInteger(value) && value >= 20 && value <= 90
}