export const removeElementFromArray = (array, element) => {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
};

export const countDuplicates = (array) => {
    const counts = {};
    array.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
};