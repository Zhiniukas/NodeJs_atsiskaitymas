const createElementWithParams = (tagName, params) => {
    const element = document.createElement(tagName);

    Object.assign(element, params);

    return element;
};

const populateBillsList = (members) => {
    const createMembersList = document.querySelector("#bills-grid");
    createMembersList.innerHTML = "";
    const listHeader = createElementWithParams("h2", { textContent: "Group list" });
    const idHeader = createElementWithParams("div", { textContent: "Id" });
    const descriptionHeader = createElementWithParams("div", { textContent: "Description" });
    const ammountHeader = createElementWithParams("div", { textContent: "Ammount" });
    const paidByHeader = createElementWithParams("div", { textContent: "Paid By" });

    const elementHeader = document.createElement("div");
    elementHeader.className = "billsHeader";
    elementHeader.append
        (
            listHeader,
            idHeader,
            descriptionHeader,
            ammountHeader,
            paidByHeader
        );

    const elementList = document.createElement("div");
    createMembersList.append(elementList);
    elementList.className = "billsList";

    members.forEach((member) => {
        const rowElement = document.createElement("div");
        const billId = createElementWithParams("div", {
            textContent: member.bill_id,
        });
        const billDescription = createElementWithParams("div", {
            textContent: member.description,
        });
        const bilAmmount = createElementWithParams("div", {
            textContent: member.ammount,
        });
        const bilPaidBy = createElementWithParams("div", {
            textContent: member.full_name,
        });

        // billId.className = "billId";
        // billDescription.className = "b";
        // bilAmmount.className = "groupUrl";

        rowElement.className = "record";

        rowElement.append(
            billId,
            billDescription,
            bilAmmount,
            bilPaidBy
        );

        elementList.append(rowElement);
    });

    createMembersList.append(elementHeader, elementList);
};

export { populateBillsList };
