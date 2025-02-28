// Catalog button handler
document.querySelectorAll(".catalog-button").forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = "/items";
    });
});

// Sell button handler
document.querySelectorAll(".new-button").forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = "/items/new";
    });
});