// get user input
const userName = prompt("Enter name: ");

// check if lenght of name is greater than 4
if (userName.length >= 4) {
    alert(`${userName} has 4 or more characters.`);
} else {
    alert(`${userName} has less than 4 characters.`);
}