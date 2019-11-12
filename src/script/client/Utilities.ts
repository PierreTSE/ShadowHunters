import * as crelLib from "crel";


export function random(min: number, max: number) {
    if(min === undefined)
        return Math.random();
    if(max === undefined)
        return random(0, min);
    return Math.floor(Math.random() * (max-min)) + min;
}

export function instantiateTemplate(template: HTMLTemplateElement, data: {[selector: string]: string|Element}): DocumentFragment {
    const node = document.importNode(template.content, true);
    for(const selector in data) {
        if(data.hasOwnProperty(selector)) {
            node.querySelector(selector).append(data[selector])
        }
    }

    return node;
}

export const crel = crelLib.proxy;
crelLib.attrMap['style'] = (element, value) => {
    for (const property in value) {
        if(value.hasOwnProperty(property)) {
            element.style[property] = value[property];
        }
    }
};

export function sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}
