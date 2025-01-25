import {
    Plugin,
    getFrontend,
    getBackend,
} from "siyuan";
import "@/index.scss";
import { setBlockAttrs } from "./api";
import { buttonConfigs, buttonConfigsAsri } from "./style";

export default class BetterCards extends Plugin {
    private isMobile: boolean;
    private blockIconEventBindThis = this.blockIconEvent.bind(this);

    createButton(
        label: string
    ): HTMLButtonElement {
        const button = document.createElement("button");
        button.className = "b3-menu__item";
        button.innerHTML = `
            <span class="b3-menu__label">
                ${this.i18n.button[label]}
            </span>
        `;
        return button;
    }

    async onload() {
        console.log("onload");

        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";

        this.eventBus.on("click-blockicon", this.blockIconEvent.bind(this));
    }

    onLayoutReady() {
        console.log(`frontend: ${getFrontend()}; backend: ${getBackend()}`);
    }

    async onunload() {
        console.log("onunload");
        this.eventBus.off("click-blockicon", this.blockIconEventBindThis);
    }

    uninstall() {
        console.log("uninstall");
    }

    async setStyleAttr(blockId, value) {
        setBlockAttrs(blockId, {
          style: value
        });
    }

    private blockIconEvent({ detail }: any) {
        let subMenus = [];

        buttonConfigs.forEach(({ value, label }) => {
            let button = this.createButton(label);

            button.onclick = () => {
                for (let element of detail.blockElements)
                    this.setStyleAttr(element.getAttribute("data-node-id"), value);
            }

            subMenus.push({
                element: button
            });
        });

        detail.menu.addItem({
            iconHTML: "",
            label: this.i18n.cards,
            submenu: subMenus,
        });

        subMenus = [];
        buttonConfigsAsri.forEach(({ value, label }) => {
            let button = this.createButton(label);

            button.onclick = () => {
                for (let element of detail.blockElements)
                    this.setStyleAttr(element.getAttribute("data-node-id"), value);
            }

            subMenus.push({
                element: button
            });
        });

        detail.menu.addItem({
            iconHTML: "",
            label: this.i18n.cardsAsri,
            submenu: subMenus,
        });
    }
}
