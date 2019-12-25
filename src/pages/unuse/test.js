let selectedOptionA = null;
let selectedOptionB = null;

const optionsA = ["a", "b", "c"];
let optionsB = [];

// At studentId "123" row, i select "a" from optionsA
selectedOptionA = "a";

// ui options data
if (selectedOptionA === "a") {
    optionsB = [1, 2];
}

if (selectedOptionA === "b") {
    optionsB = [3, 4];
}

// let say optionB is last step, when optionB is selected, save selectedOptionB,
selectedOptionB = 1;


// then push studentId and all the selected options to an array (here i use toBeUpdate)
const toBeUpdate = [
    {
        studentId: "123",
        selected: {optionA: selectedOptionA, optionB: selectedOptionB}
    },
    {
        studentId: "124",
        selected: {optionA: selectedOptionA, optionB: selectedOptionB}
    }
];

// so for the example above,  the result is:
const toBeUpdate = [{
    studentId: "123",
    selected: {optionA: "a", optionB: 1}
}];