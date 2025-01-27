import { getDocInfo } from "./api";

export const queryDocIcon = async (block_id: string) => {
    let data = await getDocInfo(block_id);
    if (!data) return null;

    let iconCode = data.icon;

    if (iconCode === "") return data.subFileCount > 0 ? '📑' : '📄';

    return String.fromCodePoint(...iconCode.split('-').map(p => parseInt(p, 16)));
}
