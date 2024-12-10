import { $, Component } from "./Component";
import { Course } from "./Course";

export const App: Component = () => {
    const content = $("div");
    content.append(
        Course({
            name: "Hungarian",
            description: "Colloquial Hungarian",
            url: "https://google.com",
            imageSource: "https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2022/01/DEST_HUNGARY_BUDAPEST_CHAIN-BRIDGE_shutterstock-portfolio_162074663.jpg"
        })
    );
    return content;
};
