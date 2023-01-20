const createElementWithParams = (tagName, params) => {
    const element = document.createElement(tagName);

    Object.assign(element, params);

    return element;
};

const populateGroupList = (members) => {
    const createMembersList = document.querySelector("#groups-grid");
    createMembersList.innerHTML = "";
    const elementList = document.createElement("div");
    createMembersList.append(elementList);

    elementList.className = "groupList";

    members.forEach((member) => {
        const rowElement = document.createElement("div");
        const groupTitle = createElementWithParams("div", {
            textContent: member.name,
        });
        const groupId = createElementWithParams("div", {
            textContent: `Group Id: <a href="./bills.html?group_id=${member.id}">${member.id}</a> `,
        });


        groupTitle.className = "groupTitle";
        groupId.className = "groupId";

        rowElement.className = "record";

        rowElement.append(
            groupTitle,
            groupId,

        );
        elementList.append(rowElement);
    });

    createMembersList.append(elementList);
};

export { populateGroupList };
