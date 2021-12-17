let ctemp = 0
let vref = 0
let lm60OutAvg = 0
let toffset = 10
let ADC_LOOP_CNT = 100
let PixelArray = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)

basic.forever(function () {

    getTemp()
    if (11111.5 <= ctemp && ctemp >= 11049.0) {
        PixelArray.showColor(neopixel.rgb(255, 0, 0))
        PixelArray.show()
    }
    if (11111.5 >= ctemp && ctemp <= 11049.0) {
        PixelArray.showColor(neopixel.rgb(0, 0, 255))
        PixelArray.show()
    }
})

function getTemp() {
    lm60OutAvg = 0
    vref = 0
    for (let index = 0; index < 10; index++) {
        lm60OutAvg += pins.analogReadPin(AnalogPin.P1)
    }
    ctemp = (6.25 * lm60OutAvg) + 424
    serial.writeNumber(ctemp)
    serial.writeLine("")
}
