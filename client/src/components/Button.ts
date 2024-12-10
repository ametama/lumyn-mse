import { $, Component } from "./Component";

export const Button: Component<{ text: string, size: "small" | "medium" | "large", onclick: () => unknown }, "button"> = (props) => {
    const btn = $("button", "button", {
        "small": "button-sm",
        "medium": "button-md",
        "large": "button-lg"
    }[props.size]);
    btn.textContent = props.text;
    btn.onclick = props.onclick.bind(btn);
    return btn;
};
