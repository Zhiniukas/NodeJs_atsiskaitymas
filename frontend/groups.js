import { populateGroupList } from "./populateGroupList.js";

const accessToken = localStorage.getItem("accessToken");

document.getElementById("ifAuthed").style.display = "none";

try {
    const response = await fetch("http://localhost:5001/groups", {
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

        populateGroupList(result);

    };

} catch (error) {
    console.error(error);
}

