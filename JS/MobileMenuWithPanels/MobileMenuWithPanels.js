class MobileMenuWithPanels {
    constructor() {
        this.menuName = 'site-header__menu-mobile';
        this.panelClass = 'mobile-menu__panel';
        this.menuOpenClass = this.menuName + '--open';
        this.panelOpenClass = this.panelClass + '--open';

        this.menuElement = document.getElementsByClassName(this.menuName)[0];
        this.state = {};
        this.state.menuOpen = false;
        this.state.panelsOpen = [0];
        this.panels = this.menuElement.getElementsByClassName(this.panelClass);

        this.addEventListeners();

    }

    addEventListeners() {
        let panelTriggers = this.menuElement.querySelectorAll('[data-open-panel]'),
            panelBackTriggers = this.menuElement.querySelectorAll('[data-panel-go-back'),
            menuOpenCloseTriggers = document.querySelectorAll('[data-toggle-menu]');

        [...panelTriggers].forEach((node) => {
            node.addEventListener('click', (e) => {
                let panelId = e.target.getAttribute('data-open-panel');
                e.preventDefault();
                this.openPanel(panelId);
            })
        });

        [...panelBackTriggers].forEach((node) => {
            node.addEventListener('click', (e) => {
                e.preventDefault();
                this.goBack();
            })
        });


        [...menuOpenCloseTriggers].forEach((node) => {
            node.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMenu();
            })
        });

    }

    toggleMenu() {
        this.state.menuOpen = !this.state.menuOpen;
        this.render();
    }

    openPanel(id) {
        id = parseInt(id);
        this.state.panelsOpen.push(id);
        this.render();
    }

    goBack() {
        if (this.state.panelsOpen.length <= 0) {
            return;
        }
        this.state.panelsOpen.pop();
        this.render();
    }

    render() {

        if (this.state.menuOpen) {
            this.menuElement.classList.add(this.menuOpenClass);
        } else {
            this.menuElement.classList.remove(this.menuOpenClass);
            this.state.panelsOpen = [0];
        }

        if (this.state.panelsOpen.length > 0) {
            this.state.panelsOpen.forEach((currentId, index) => {
                [...this.panels].forEach((panelNode) => {
                    let panelId = parseInt(panelNode.getAttribute('data-panel-id'));

                    if (panelId === currentId) {
                        panelNode.classList.add(this.panelOpenClass);
                        panelNode.style.zIndex = index+1;

                    } else if (this.state.panelsOpen.indexOf(panelId) < 0) {
                        panelNode.classList.remove(this.panelOpenClass);
                        panelNode.style.zIndex = 0;
                    }

                })
            })
        }
    }


}
export default MobileMenuWithPanels

