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
            textContent: `Group Id: ${member.id}</a> `,
        });
        const groupUrl = document.createElement("a");
        const urlLink = document.createTextNode("Click here to see all bills for the group");

        groupUrl.appendChild(urlLink);
        groupUrl.title = "This is Link";
        groupUrl.href = `./bills.html?group_id=${member.id}`;


        groupTitle.className = "groupTitle";
        groupId.className = "groupId";
        groupUrl.className = "groupUrl";

        rowElement.className = "record";

        rowElement.append(
            groupTitle,
            groupId,
            groupUrl,

        );
        elementList.append(rowElement);
    });

    createMembersList.append(elementList);
};

export { populateGroupList };
