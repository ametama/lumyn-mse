export const $ = <E extends keyof HTMLElementTagNameMap> (e: E, ...cls: string[]) => {
    const el = document.createElement(e);
    el.classList.add(...cls);
    return el as HTMLElementTagNameMap[E];
};
export type Component<P = undefined, E extends keyof HTMLElementTagNameMap = "div"> = P extends undefined ? () => HTMLElement : (props: P) => HTMLElementTagNameMap[E];
