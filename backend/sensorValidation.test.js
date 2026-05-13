import { describe, test, expect } from 'vitest'

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


describe('Light sensor', () => {
    test('Lux value at 1000 accepted', () => {expect(isValidLux(1000)).toBe(true) })
    test('Lux value at 0 accepted', () => {expect(isValidLux(0)).toBe(true)})
    test('Lux value at negative value rejected', () => {expect(isValidLux(-1)).toBe(false)})
})
