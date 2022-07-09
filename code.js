'use strict';

const componentSelectorParents = document.querySelectorAll(".component_selector");

// Массив в котором будут храниться все Компонент Селекторы
const componentSelectors = [];

const selectorFillers = [["Нижний Новгород", "Москва"], ["Екатеринбург", "Бор"], ["Тагил", "Воронеж", "Зеленогорск"]]

class ComponentSelector {

    constructor(parentElem) {
        this.textElem = undefined;
        this.optionsListElem = undefined;
        this.arrowElem = undefined;
        try {
            if (parentElem != undefined) {
                this.parentElem = parentElem;
            } else throw "parentElem is undefined"
        } catch (e) {
            console.error(e);
        }
    }

    init(options) {
        if (this.parentElem != undefined) {
            const parent = this.parentElem;
            const textElem = this.textElem = document.createElement('div');
            const optionsListElem = this.optionsListElem = document.createElement('ul');
            const arrowElem = this.arrowElem = document.createElement('img');

            arrowElem.src = 'arrow.png';

            parent.innerHTML = "";

            parent.addEventListener('click', () => {
                optionsListElem.classList.toggle('on');
            })

            this.#addOptions(options, optionsListElem);

            textElem.classList.add('text');

            parent.append(textElem);
            parent.append(optionsListElem);
            parent.append(arrowElem);

            parent.classList.toggle('on');
        }
    }

    #addOptions(options, parent) {
        try {
            if (options === undefined) throw "Exception error: no options specified";

            for (const optionName of options) {
                let elem = document.createElement('li');
                elem.innerText = optionName;

                elem.addEventListener('click', () => {
                    this.textElem.innerText = elem.innerText;
                })

                parent.append(elem);
            }

        } catch (e) {
            console.error(e);
        }
    }

}

for (const i of componentSelectorParents) {
    componentSelectors.push(new ComponentSelector(i));
}

for (const i in componentSelectors) {
    if (Object.hasOwnProperty.call(componentSelectors, i)) {
        componentSelectors[i].init(selectorFillers[i]);
    }
}

