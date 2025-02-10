import { setBlockAttrs, updateBlock } from "./api";
import { queryDocIcon } from "./icons";


export const setStyleAttr = async (blockId, value) => {
    setBlockAttrs(blockId, {
      style: value
    });
}

export const insertIcon = async (outerElement) => {
    let blockId = outerElement.getAttribute("data-node-id")
    let ref_list = outerElement.querySelectorAll("span[data-type='block-ref']");
    let link_list = outerElement.querySelectorAll("span[data-type='a'][data-href^='siyuan://blocks/']");

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

    link_list.forEach(async (element) => {
        let href = element.attributes["data-href"].value;
        console.log(href);

        let blockIdFromHref = href.replace('siyuan://blocks/', '');
        let icon = await queryDocIcon(blockIdFromHref);
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