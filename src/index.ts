import {
    Plugin,
    getFrontend,
    getBackend,
} from "siyuan";
import "@/index.scss";
import { setBlockAttrs, updateBlock } from "./api";
import { buttonConfigs } from "./styledefs";
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

    async refToEmbed(outerElement: Element) {
        let blockId = outerElement.getAttribute("data-node-id")
        let element = outerElement.querySelector("span[data-type='block-ref']");
        let refBlockId = element?.attributes["data-id"]?.value;

        if (!refBlockId) return;

        let html = `
            <div data-content="select * from blocks where id='${refBlockId}'"
            data-node-id="${blockId}"
            data-type="NodeBlockQueryEmbed"/>
        `
        updateBlock("dom", html, blockId);
    }

    async linkToRef(outerElement: Element) {
        const blockId = outerElement.getAttribute("data-node-id");
        if (!blockId) return;

        const linkElements = outerElement.querySelectorAll('span[data-type="a"][data-href]');

        if (linkElements.length === 0) return;

        linkElements.forEach(linkElement => {
            const href = linkElement.getAttribute("data-href");
            if (!href || !href.startsWith('siyuan://blocks/')) return;

            const blockIdFromHref = href.replace('siyuan://blocks/', '');

            const refSpan = document.createElement('span');
            refSpan.setAttribute('data-type', 'block-ref');
            refSpan.setAttribute('data-id', blockIdFromHref);
            refSpan.innerHTML = linkElement.innerHTML;

            linkElement.replaceWith(refSpan);
        });

        await updateBlock("dom", outerElement.outerHTML, blockId);
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

                            case "refToEmbed":
                                this.refToEmbed(element);
                                break;

                            case "linkToRef":
                                this.linkToRef(element);
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
