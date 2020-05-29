let studentNames = ["James", "Melissa", "Brian"];

for (let i = 0; i < 3; i++) {
    let userInput = prompt("Enter student name: ");
    studentNames.push(userInput);
}

for (let i = 0; i < studentNames.length; i++) {
    console.log(`Name of student ${i+1} is ${studentNames[i]}`);
}