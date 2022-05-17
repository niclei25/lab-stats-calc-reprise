function readAllNumbers() : number[] {
    let textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    let lines : string[] = textArea.value.split("\n");
    let numbers : number[] = [];

    //Step 4: update to handle multiple numbers on one line

    for (let i = 0; i < lines.length; i++){
        if (lines[i] === "")
            continue;
        let num = Number(lines[i]);
        if (isNaN(num))
            continue;
        numbers.push(num);
    }
    return numbers;
}

function getMean(nums  : number[]) : number {
    let sum = 0;
    for (const n of nums){
        sum += n;
    }
    return sum / nums.length;
}

function getAboveBelowMean(nums : number[]) : [number, number] {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums){
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}

// PART A : Basic Stats

function getMedian(nums : number[]) : number {
    if (nums.length % 2 === 0) {
        return (nums[nums.length/2 - 1] + nums[nums.length/2]) / 2;
    } else {
        return nums[(nums.length - 1) / 2];
    }
}

function getMinMax(nums : number[]) : [number, number] {
    return [nums[0], nums[nums.length - 1]];
}

function getStdDev(nums : number[]) : number {
    let numsMean : number = getMean(nums);
    let sqDists : number[] = []
    for (let num of nums) {
        sqDists.push((num - numsMean) ** 2)
    }
    return Math.sqrt(getMean(sqDists));
}

let basicStatsAnalyzeButton = document.querySelector("button#analyze") as HTMLButtonElement;
basicStatsAnalyzeButton.addEventListener("click", function () {    
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#mean") as HTMLElement).textContent = `${getMean(numbers)}`;    
    (document.querySelector("#aboveBelow") as HTMLElement).textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    (document.querySelector("#median") as HTMLElement).textContent = `${getMedian(numbers)}`;
    (document.querySelector("#minMax") as HTMLElement).textContent = `${getMinMax(numbers).join(" & ")}`;
    (document.querySelector("#stdDev") as HTMLElement).textContent = `${getStdDev(numbers)}`;
});

// PART B: Advanced Integer Stats

function getLeastCommonMultiple(nums : number[]) : number {
    let max : number = nums[nums.length - 1];
    let result : boolean = true;
    
    for (let lcm : number = max; result = true; lcm += max) {
        for (let num of nums) {
            if (lcm % num !== 0) {
                result = false;
                break;
            }
        }
        if (result === true) {
            return lcm;
        } else {
            result = true;
        }
        
    }
    return NaN;
}

function getAllCommonFactors(nums : number[]) : number[] {
    let min : number = nums[0];
    let result : boolean = true;
    let gcf : number = min
    let acf : number[] = [1]
    
    for (let gcf = min; result = true; gcf += min) {
        for (let num of nums) {
            if (num % gcf !== 0) {
                result = false;
                break;
            }
        }
        if (result) {
            break;
        } else {
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

let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced") as HTMLButtonElement;
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#lcm") as HTMLElement).textContent = `${getLeastCommonMultiple(numbers)}`;
    (document.querySelector("#factors") as HTMLElement).textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
