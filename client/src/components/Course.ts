import { Button } from "./Button";
import { $, Component } from "./Component";

export const Course: Component<{ name: string, description: string, imageSource?: string, url: string }> = (props) => {
    const e = $("div", "course-card");
    const img = $("img", "course-img");
    img.src = props.imageSource ?? "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg";
    const info = $("div", "course-info");
    const name = $("h3", "course-name");
    name.textContent = props.name;
    const desc = $("div", "course-desc");
    desc.textContent = props.description;
    const buttonBox = $("div", "course-button-box");
    const button = Button({
        text: "Enroll",
        size: "small",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onclick: () => {}
    });
    buttonBox.append(button);
    info.append(name, desc, buttonBox);
    e.append(img, info);
    return e;
};
