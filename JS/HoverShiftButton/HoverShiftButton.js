export default {
    containers: [],
    init: function () {
        this.containers = document.getElementsByClassName('button-container');
        this.addListeners();
    },

    addListeners: function () {
        [].forEach.call(this.containers, (container) => {
            container.addEventListener('mousemove', (e) => {
                let coords = this.getAnimationCoords(e, container);
                this.animateButton(container, coords);
            }, {passive: true});

            container.addEventListener('mouseleave', (e) => {
                this.resetButtonAnimation(container);
            }, {passive: true});
        })
    },

    /**
     *
     * @param e
     * @param container
     * @returns {{rotateX: number, rotateY: number, shadowX: number, shadowY: number}}
     */
    getAnimationCoords: function (e, container) {
        let button = container.getElementsByClassName('button')[0],
            shadow = container.getElementsByClassName('button-shadow')[0],
            buttonPos = button.getBoundingClientRect(),
            buttonXCenter = buttonPos.width / 2,
            buttonYCenter = buttonPos.height / 2,
            pointerX = (e.x - buttonPos.left),
            pointerY = (e.y - buttonPos.top);

        return {
            rotateX: (pointerY - buttonYCenter) / 12,
            rotateY: (pointerX - buttonXCenter) / 18,
            shadowX: ((pointerX - buttonXCenter) / 18) * -1,
            shadowY: ((pointerY - buttonYCenter) / 8) * -1
        }
    },
    /**
     *
     * @param container
     * @param coords
     */
    animateButton: function (container, coords) {
        let button = container.getElementsByClassName('button')[0],
            shadow = container.getElementsByClassName('button-shadow')[0];

        requestAnimationFrame(() => {
            button.style.transform = 'rotateX(' + coords.rotateX + 'deg) rotateY(' + coords.rotateY + 'deg) rotateZ(0deg) scale(0.985)';
            shadow.style.transform = 'translateX(' + coords.shadowX + 'px) translateY(' + coords.shadowY + 'px)';
        });

    },

    /**
     *
     * @param container
     */
    resetButtonAnimation: function (container) {
        let button = container.getElementsByClassName('button')[0],
            shadow = container.getElementsByClassName('button-shadow')[0];

        requestAnimationFrame(() => {
            button.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)';
            shadow.style.transform = 'translateX(0)';
        });

    }
}
