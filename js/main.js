
document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("inputText");
    const enteredSpan = document.getElementById("entered");
    const remainedSpan = document.getElementById("remained");
    let targetText = remainedSpan.textContent;
    
    inputField.addEventListener("input", function () {
        const inputText = inputField.value;
        if (targetText.startsWith(inputText)) {
            enteredSpan.textContent = inputText;
            remainedSpan.textContent = targetText.slice(inputText.length);
        }
        if (inputText === targetText) {
            alert("クリアしました！");
            inputField.value = "";
            enteredSpan.textContent = "";
            remainedSpan.textContent = targetText;
        }
    });
});