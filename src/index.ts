import {
    Plugin,
    getFrontend,
    getBackend,
} from "siyuan";
import "@/index.scss";
import { setBlockAttrs } from "./api";
import { buttonConfigs } from "./style";

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
        buttonConfigs.forEach(({ config, labelKey }) => {
            const subMenus = [];
            config.forEach(({ value, label }) => {
                if (value === "separator") {
                    subMenus.push({ type: "separator" });
                    return;
                }

                const button = this.createButton(label);
                button.onclick = () => {
                    for (const element of detail.blockElements)
                        this.setStyleAttr(element.getAttribute("data-node-id"), value);
                };
                subMenus.push({ element: button });
            });

            detail.menu.addItem({
                iconHTML: "",
                label: this.i18n[labelKey],
                submenu: subMenus,
            });
        });
    }
}
