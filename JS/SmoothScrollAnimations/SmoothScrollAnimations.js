/**
 * Animate a object when it's visible in the Window.
 * Set a data-attribute on the element and pass it as the first paramenter to this function to target it.
 *
 * This function will add the elements to a animation queue and set will-translate on it to prepare the browser.
 * Then when the offset hit's it will remove the .not-visible class and add the .visible class to the element.
 * So you need to hook your css transitions to the .not-visible and .visible classes.
 *
 *
 */
function SmoothScrollAnimations() {

    var that = this;
    /**
     * Store the positions in pixels when we should try to animate. Each pixel value maps to a element in the animationElements var
     * @type {Array}
     */
    that.animationQueue = [];

    /**
     * Store all the elements that we should animate.
     * @type {Array}
     */
    that.animationElements = [];

    /**
     * Store all the elements that are prepared for animation.
     * Prepared elements has the CSS will-change option set. To optimize animations
     * @type {Array}
     */
    that.preparedElements = [];

    /**
     * Timestamp of the last time we scrolled. To stop the functions from fireing on every scroll action.
     * @type {number}
     */
    that.lastScroll = Date.now();

    /**
     * The offset determines when to add the animate class to a element.
     * @type {number}
     */
    that.offset = 50;



    /**
     * Set the animate classes on a the elements in the elementList
     * to trigger the animations
     * @param elementList
     */
    that.animateElement = function (elementList, pos) {
        //Loop all elements and add/remove classes on the next available animationframe
        elementList.forEach(function (element) {
            requestAnimationFrame(function () {
                element.classList.add('visible');
                element.classList.remove('not-visible');
            });
        });

        //Remove the animationhint a little bit later
        setTimeout(function () {
            that.removeAnimationHint(elementList, pos);
        }, 1000);


    };

    /**
     * Hint the browser that a element is about to be animated
     * And store the element in a array
     * @param elementList
     * @param pos
     */
    that.addAnimationHint = function (elementList, pos) {
        that.preparedElements[pos] = true;
        elementList.forEach(function (element) {
            element.style.willChange = 'transform, opacity';
        });
    };

    /**
     * Remove the animation hint from a elementList
     * @param elementList
     * @param pos
     */
    that.removeAnimationHint = function (elementList, pos) {
        elementList.forEach(function (element) {
            element.style.willChange = 'auto';
        });

        delete that.preparedElements[pos];

    };

    /**
     * Stuff to do every time we scroll.
     * Takes a lastScroll value in form of a timestamp to prevent the animation from firing on every scroll event
     * @param lastScroll
     * @returns {*}
     */
    that.scrollFunction = function (lastScroll) {
        //Bail if early if we the scroll delay hasn't passed.
        if (Date.now() + 10000 < lastScroll) {
            return lastScroll;
        }

            var windowScrollPos = window.pageYOffset || document.documentElement.scrollTop,
            windowHeight = window.innerHeight,
            offset = that.offset,
            triggerValue = (windowScrollPos + windowHeight) - offset,
            prepareValue = (windowScrollPos + windowHeight) + offset;

        //Loop all pixel values in our queue.
        that.animationQueue.forEach(function (pos, index) {
            //console.log('each', pos, triggerValue);
            //If the triggerValue is bigger then our scroll pos fire the animation
            if (triggerValue > pos) {
                if (typeof that.animationElements[pos] === 'undefined') {
                    return;
                }
                that.animateElement(that.animationElements[pos], pos);

                //Clean up the queue
                that.animationQueue.splice(index, 1);
                delete that.animationElements[pos];

            } else if (prepareValue > pos) {
                if (typeof that.preparedElements[pos] !== 'undefined') {
                    return;
                }

                that.addAnimationHint(that.animationElements[pos], pos);
            }
        });

        return Date.now();
    };

}

/**
 * Init function
 * Use this function to add elements to the animation queue
 * @param dataAttr [data-attribute selector to target the element]
 */
SmoothScrollAnimations.prototype.addElements = function (dataAttr) {

    var that = this,
        elementsToAnimate = document.querySelectorAll(dataAttr),
        windowHeight = window.innerHeight;

    /**
     * Loop all elements on the page that should animate
     */
    [].forEach.call(elementsToAnimate, function (el) {
        var elementBox = el.getBoundingClientRect();

        // If the element is outside of the viewport, we want to animate it.
        // Push it to the animation queue and hide it
        // If it's already in the viewport don't bother
        if (elementBox.top - windowHeight > 0) {

            if (typeof that.animationElements[elementBox.top] === 'undefined') {
                that.animationElements[elementBox.top] = [];
            }

            that.animationQueue.push(elementBox.top);
            that.animationElements[elementBox.top].push(el);


            requestAnimationFrame(function () {
                el.classList.add('not-visible');
            })
        }

    });



    /**
     * Add Eventlistener to the window scroll event
     */
    window.addEventListener('scroll', function (e) {
        that.lastScroll = that.scrollFunction(that.lastScroll);
    });

};

window.SmoothScrollAnimations = new SmoothScrollAnimations();
