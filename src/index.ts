import {
    Plugin,
    getFrontend,
    getBackend,
} from "siyuan";
import "@/index.scss";
import { setBlockAttrs, updateBlock } from "./api";
import { buttonConfigs } from "./style";
import { queryDocIcon } from "./icons";

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

    async insertRefIcon(outerElement) {
        let blockId = outerElement.getAttribute("data-node-id")
        let ref_list = outerElement.querySelectorAll("span[data-type='block-ref']");

        ref_list.forEach(async (element) => {
            let refBlockId = element.attributes["data-id"].value;
            let icon = await queryDocIcon(refBlockId);
            let iconHTML = `<span data-type="emoji">${icon} </span>`;
            let prevSibling = element?.previousElementSibling;

            let elementHasIcon = prevSibling?.attributes["data-type"]?.value === "emoji";

            if (!elementHasIcon)
                await element.insertAdjacentHTML('beforebegin', iconHTML);
            else if (prevSibling?.innerText.trim() !== icon)
                prevSibling.outerHTML = iconHTML;

            await updateBlock("dom", outerElement.outerHTML, blockId);
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
                    detail.blockElements.forEach((element) => {
                        switch (value) {
                            case "insertRefIcons":
                                this.insertRefIcon(element);
                                break;

                            default:
                                this.setStyleAttr(
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
