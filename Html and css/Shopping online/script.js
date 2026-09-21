const checkboxes =
    document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(box => {
    box.addEventListener("change", updateCount);
});

function updateCount() {

    const checked =
        document.querySelectorAll(
            'input[type="checkbox"]:checked').length;

    document.getElementById("count").textContent =
        "Selected Items: " + checked;
}

function sendList() {
    let items = [];
    document.querySelectorAll('input[type="checkbox"]:checked')
        .forEach(box => { items.push(box.value); });

    if (items.length === 0) {
        alert("Please select at least one item.");
        return;
    }

    const body = "My Grocery List:%0D%0A%0D%0A" + items.join("%0D%0A");

    window.location.href =
        "mailto:shoponline@gmail.com" +
        "?subject=Grocery List" +
        "&body=" + body;
}