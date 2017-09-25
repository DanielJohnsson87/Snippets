class ToggleHoverState {

    constructor(elementClass) {
        this.elements = document.getElementsByClassName(elementClass);
        [...this.elements].forEach((element) => {
            this.addEventListeners(element);
        })
    }

    addEventListeners(element) {
        element.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                this.prepareElements(this.elements);
                requestAnimationFrame(() => {
                    this.animateElementsIn([element]);
                })
            });
        });


        element.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                this.animateElementsOut([element]);
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        this.restoreElements(this.elements);
                    })
                }, 400);
            });
        });
    }


    prepareElements(elements) {
        [...elements].forEach((element) => {
            element.style.willChange = 'transform';
        });
    }

    restoreElements(elements) {
        [...elements].forEach((element) => {
            element.style.willChange = '';
        });
    }

    animateElementsIn(elements) {
        [...elements].forEach((element) => {
            element.classList.add('hover');
        });
    }
    animateElementsOut(elements) {
        [...elements].forEach((element) => {
            element.classList.remove('hover');
        });
    }
}

export default ToggleHoverState;