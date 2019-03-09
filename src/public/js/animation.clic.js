const AnimationClic = function () {
    let rate = 10
    let callbacks = []
    let clock = setInterval(() => {
        callbacks.forEach(f => f())
    }, rate)

    return {
        BackgroundDiagonalTranslation: function (htmlElement, xAxis, yAxis) {
            this.position = 0
            const that = this
            callbacks.push(() => {
                htmlElement.style.backgroundPosition = `${xAxis ? that.position : 0}px ${yAxis ? that.position : 0}px`
                this.position += 0.2
            })
        }
    }
}()