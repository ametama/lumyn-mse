import { $, Component } from "./Component";

interface LessonItem {
    item: string;
    aspects: { descriptor: string, value: string }[];
}
type LessonItemGroup = LessonItem[]

const MemoLessonCard: Component<LessonItem> = (item) => {
    const card = $("div", "memo-card");
    const name = $("div", "memo-name");
    const infoTable = $("table", "info-table");
    for (const aspect of item.aspects) {
        const tr = $("tr", "memo-tr");
        const descTh = $("th", "memo-desc-th");
        const valTh = $("th", "memo-val-th");
        descTh.textContent = aspect.descriptor;
        valTh.textContent = aspect.value;
        tr.append(descTh, valTh);
        infoTable.append(tr);
    }
    card.append(name, infoTable);
    return card;
};

const MemoLesson: Component<{ items: LessonItem[] }> = ({ items }) => {
    const memo = $("div", "memo-lesson");
    let i = 0;
    let card = MemoLessonCard(items[i]);
    memo.addEventListener("keypress", (ev) => {
        if (ev.key !== "Enter") return;
        ev.preventDefault();
        // Draw next card:
    });
};
