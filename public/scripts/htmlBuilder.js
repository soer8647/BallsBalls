define([], function () {
    return {
        write: function (container, text) {
            container.appendChild(document.createTextNode(text));
        },

        addSpace: function (container, size) {
            let space = document.createElement("div");
            space.style = " min-height: " + size * 10 + "px";
            container.appendChild(space);
        },

        makeInput: function (id, type, value) {
            let input = document.createElement("input");
            input.setAttribute("id", id);
            input.setAttribute("type", type);
            input.setAttribute("value", value);
            return input;
        },

        makeSelect: function (id, values) {
            let container = document.createElement("select");
            container.setAttribute("id", id);
            let newOption;
            for (value in values) {
                newOption = document.createElement("option");
                newOption.value = values[value];
                newOption.text = values[value];
                container.add(newOption);
            }
            return container;
        }
    }
});
