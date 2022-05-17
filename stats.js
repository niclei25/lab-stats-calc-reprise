"use strict";
function readAllNumbers() {
    let textArea = document.querySelector("textarea");
    let lines = textArea.value.split("\n");
    let numbers = [];
    //Step 4: update to handle multiple numbers on one line
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === "")
            continue;
        let num = Number(lines[i]);
        if (isNaN(num))
            continue;
        numbers.push(num);
    }
    return numbers;
}
function getMean(nums) {
    let sum = 0;
    for (const n of nums) {
        sum += n;
    }
    return sum / nums.length;
}
function getAboveBelowMean(nums) {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums) {
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}
// PART A : Basic Stats
function getMedian(nums) {
    if (nums.length % 2 === 0) {
        return (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
    }
    else {
        return nums[(nums.length - 1) / 2];
    }
}
function getMinMax(nums) {
    return [nums[0], nums[nums.length - 1]];
}
function getStdDev(nums) {
    let numsMean = getMean(nums);
    let sqDists = [];
    for (let num of nums) {
        sqDists.push((num - numsMean) ** 2);
    }
    return Math.sqrt(getMean(sqDists));
}
let basicStatsAnalyzeButton = document.querySelector("button#analyze");
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#mean").textContent = `${getMean(numbers)}`;
    document.querySelector("#aboveBelow").textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    document.querySelector("#median").textContent = `${getMedian(numbers)}`;
    document.querySelector("#minMax").textContent = `${getMinMax(numbers).join(" & ")}`;
    document.querySelector("#stdDev").textContent = `${getStdDev(numbers)}`;
});
// PART B: Advanced Integer Stats
function getLeastCommonMultiple(nums) {
    let max = nums[nums.length - 1];
    let result = true;
    for (let lcm = max; result = true; lcm += max) {
        for (let num of nums) {
            if (lcm % num !== 0) {
                result = false;
                break;
            }
        }
        if (result === true) {
            return lcm;
        }
        else {
            result = true;
        }
    }
    return NaN;
}
function getAllCommonFactors(nums) {
    let min = nums[0];
    let result = true;
    let gcf = min;
    let acf = [1];
    for (let gcf = min; result = true; gcf += min) {
        for (let num of nums) {
            if (num % gcf !== 0) {
                result = false;
                break;
            }
        }
        if (result === true) {
            break;
        }
        else {
            result = true;
        }
    }
    for (let i = 2; i <= gcf; i++) {
        if (gcf % i == 0) {
            acf.push(i);
        }
    }
    return acf;
}
let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced");
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#lcm").textContent = `${getLeastCommonMultiple(numbers)}`;
    document.querySelector("#factors").textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
