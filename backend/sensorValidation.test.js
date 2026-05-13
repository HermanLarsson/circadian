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
    test('Lux value above threshold rejected', () => {expect(isValidLux(1001)).toBe(false)})

})

describe('Sound Sensor', () => {
    test('Sound value at 120 accepted', () => {expect(isValidSound(120)).toBe(true) })
    test('Sound value at 0 accepted', () => {expect(isValidSound(0)).toBe(true)})
    test('Sound value at negative value rejected', () => {expect(isValidSound(-1)).toBe(false)})
    test('Sound value above threshold rejected', () => {expect(isValidSound(121)).toBe(false)})

})

describe('Temperature Sensor', () => {
    test('Temperature at 50 accepted', () => {expect(isValidTemperature(50)).toBe(true) })
    test('Temperature at 0 accepted', () => {expect(isValidTemperature(0)).toBe(true)})
    test('Temperature at negative value rejected', () => {expect(isValidTemperature(-1)).toBe(false)})
    test('Temperature above threshold rejected', () => {expect(isValidTemperature(51)).toBe(false)})
})

describe('Humidity Sensor', () => {
    test('Humidity at 90 accepted', () => {expect(isValidHumidity(90)).toBe(true) })
    test('Humidity at 20 accepted', () => {expect(isValidHumidity(20)).toBe(true)})
    test('Humidity below threshold rejected', () => {expect(isValidHumidity(19)).toBe(false)})
    test('Humidity above threshold rejected', () => {expect(isValidHumidity(91)).toBe(false)})
})


