import { populateBillsList } from "./populateBillsList.js";

const accessToken = localStorage.getItem("accessToken");

const params = (new URL(document.location)).searchParams;
const group_id = parseInt(params.get('group_id'));

document.getElementById("ifAuthed").style.display = "none";

try {
    const response = await fetch(`http://localhost:5001/bills/${group_id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    })
    const result = await response.json();
    if (!response.ok || response.status >= 400) {
        alert(result?.error || response.statusText)

    } else {

        document.getElementById("ifAuthed").style.display = "inline";
        document.getElementById("ifNotAuthed").style.display = "none";

        populateBillsList(result);

    };

} catch (error) {
    console.error(error);
}


const addNewBill = document.querySelector("form#addBillForm")
addNewBill.addEventListener("submit", async (event) => {
    event.preventDefault();
    const billDescription = document.querySelector("#billDescription").value.trim();
    const billAmmount = document.querySelector("#billAmmount").value.trim();

    try {
        const response = await fetch("http://localhost:5001/bills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ description: billDescription, ammount: billAmmount })

        })
        const result = await response.json();
        if (!response.ok || response.status >= 400) {
            return alert(result?.error || response.statusText)
        } else {
            return alert("You successfully added new bill")
        };

    } catch (error) {
        return console.error(error);
    }
})

