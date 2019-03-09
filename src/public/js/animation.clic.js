/**
 * animation.clic.js
 * Animation library
 * CLIC website software
 *
 * @description Animation helpers with DOM objects transformations synchronized with a clock
 * @author      Alexandre CHAU
 * @global      Occupies AnimationClic namespace in document environment
 */
const AnimationClic = function () {
    // rate of animation (ms)
    let rate = 10
    // animation functions are registered here
    let callbacks = []
    // synchronized clock
    let clock = setInterval(() => {
        callbacks.forEach(f => f())
    }, rate)

    /**
     * @exports Animation classes
     */
    return {
        /**
         * An animation that moves the background of an object diagonaly indefinitely
         * @constructor
         * @param {HTMLElement} htmlElement the DOM element which background will be animated
         * @param {boolean} xAxis move background on the x axis
         * @param {boolean} yAxis move background on the y axis
         */
        BackgroundDiagonalTranslation: function (htmlElement, xAxis, yAxis) {
            // internal position tracker
            this.position = 0
            // reference required to capture the position property inside the closure
            const that = this
            callbacks.push(() => {
                htmlElement.style.backgroundPosition = `${xAxis ? that.position : 0}px ${yAxis ? that.position : 0}px`
                this.position += 0.2
            })
        }
    }
}()