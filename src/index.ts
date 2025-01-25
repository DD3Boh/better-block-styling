import {
    Plugin,
    getFrontend,
    getBackend,
} from "siyuan";
import "@/index.scss";
import { setBlockAttrs } from "./api";

export const cardStyles = {
    card: [
      "text-align: center",
      "padding-bottom: 10px",
      "font-size: 32px",
      "font-weight: bold",
      "width: 100%",
      "min-height: 5vh",
      "flex: 0 0 auto"
    ].join("; ") + ";",

    cardRed: [
      "background-color: var(--b3-card-error-background)",
      "color: var(--b3-card-error-color)"
    ].join("; ") + ";",

    cardYellow: [
      "background-color: var(--b3-card-warning-background)",
      "color: var(--b3-card-warning-color)"
    ].join("; ") + ";",

    cardGreen: [
      "background-color: var(--b3-card-success-background)",
      "color: var(--b3-card-success-color)"
    ].join("; ") + ";"
};

export default class BetterCards extends Plugin {
    private isMobile: boolean;
    private blockIconEventBindThis = this.blockIconEvent.bind(this);

    buttonConfigs = [
        {
            value: cardStyles.card + cardStyles.cardGreen,
            label: "green"
        },
        {
            value: cardStyles.card + cardStyles.cardRed,
            label: "red"
        },
        {
            value: cardStyles.card + cardStyles.cardYellow,
            label: "yellow"
        },
    ];

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

        this.buttonConfigs.forEach(({ value, label }) => {
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
    }
}
