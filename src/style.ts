import { setBlockAttrs, updateBlock } from "./api";
import { queryDocIcon } from "./icons";


export const setStyleAttr = async (blockId, value) => {
    setBlockAttrs(blockId, {
      style: value
    });
}

export const insertIcon = async (outerElement) => {
    const blockId = outerElement.getAttribute("data-node-id")
    const elements = outerElement.querySelectorAll("span[data-type='block-ref'], span[data-type='a'][data-href^='siyuan://blocks/']");

    for (const element of elements) {
        const targetBlockId = element.attributes["data-id"]?.value
            || element.attributes["data-href"]?.value.replace('siyuan://blocks/', '');
        const icon = await queryDocIcon(targetBlockId);
        const iconHTML = `<span data-type="emoji">${icon} </span>`;
        const prevSibling = element.previousElementSibling;
        let hasIcon = prevSibling?.attributes["data-type"]?.value === "emoji";
        const iconMatches = prevSibling?.innerText.trim() === icon;

        if (!hasIcon)
            await element.insertAdjacentHTML('beforebegin', iconHTML);
        else if (!iconMatches)
            prevSibling.outerHTML = iconHTML;
    }

    await updateBlock("dom", outerElement.outerHTML, blockId);
}

export const refToEmbed = async (outerElement: Element) => {
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

export const linkToRef = async (outerElement: Element) => {
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

export const slimEmbedBlock = async (element: Element, value: string) => {
    const blockId = element.getAttribute("data-node-id");
    if (!blockId) return;

    let isEmbedBlock = element.getAttribute("data-type") === "NodeBlockQueryEmbed";
    if (!isEmbedBlock) return;

    setStyleAttr(blockId, value);
}