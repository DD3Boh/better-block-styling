import {
    Plugin,
    getFrontend,
    getBackend,
} from "siyuan";
import "@/index.scss";
import { buttonConfigs } from "./styledefs";
import * as style from "./style";

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
                    detail.blockElements.forEach((element) => {
                        switch (label) {
                            case "insertRefIcons":
                                style.insertRefIcon(element);
                                break;

                            case "refToEmbed":
                                style.refToEmbed(element);
                                break;

                            case "linkToRef":
                                style.linkToRef(element);
                                break;

                            case "slimEmbedBlock":
                                style.slimEmbedBlock(element, value);
                                break;

                            default:
                                style.setStyleAttr(
                                    element.getAttribute("data-node-id"),
                                    value
                                );
                                break;
                        }
                    });
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
