var tempNum1, tempNum2, tempNum3, upNum = 1, downNum = 1;
document.getElementById("tempPicker1").style.display = "none";
document.getElementById("tempPicker2").style.display = "none";

function choosePicker1() {
    let temp = document.forms["f1"]["picker1"].value;
    if (temp == "+" || temp == "-" || temp == "×") {
        document.getElementById("tempPicker1").style.display = "block";
    }
    if (temp == "C" || temp == "P") {
        document.getElementById("tempPicker1").style.display = "none";

        document.getElementById("input1").innerHTML = "n:";
        document.getElementById("input2").innerHTML = "r:";
    }
}

function chooseTempPicker1() {
    let temp = document.forms["f1"]["tempPicker1"].value;

}

function getUpNum() {
    tempNum1 = document.forms["f1"]["n1"].value;
    tempNum2 = document.forms["f1"]["n2"].value;
    switch (document.forms["f1"]["picker1"].value) {
        case "C": {
            tempNum3 = this.combination(tempNum1, tempNum2);
            document.getElementById("fz1").innerHTML += 'C(' + tempNum1 + ',' + tempNum2 + ')';
            upNum *= tempNum3;
        }
        case "P": {
            tempNum3 = this.permutation(tempNum1, tempNum2);
            document.getElementById("fz1").innerHTML += 'P(' + tempNum1 + ',' + tempNum2 + ')';
            upNum *= tempNum3;
            break;
        }
        case "/": {
            tempNum3 = tempNum1 / tempNum2;
            document.getElementById("fz1").innerHTML += '×' + tempNum1 + '/' + tempNum2;
            break;
        }
        case "+": {
        }
    }

    document.getElementById("fz2").innerHTML = upNum;
    getAnswer();
}

function getDownNum() {
    tempNum1 = document.forms["f1"]["n3"].value;
    tempNum2 = document.forms["f1"]["n4"].value;
    if (document.forms["f1"]["picker2"].value == "C") {
        tempNum3 = this.combination(tempNum1, tempNum2);
        document.getElementById("fm1").innerHTML += 'C(' + tempNum1 + ',' + tempNum2 + ')';
    }
    else {
        tempNum3 = this.permutation(tempNum1, tempNum2);
        document.getElementById("fm1").innerHTML += 'P(' + tempNum1 + ',' + tempNum2 + ')';
    }
    downNum *= tempNum3;
    document.getElementById("fm2").innerHTML = downNum;
    getAnswer();
}

function getAnswer() {
    var temp = gcd(upNum, downNum);
    document.getElementById("ans1").innerHTML = upNum / temp + '/' + downNum / temp;
    document.getElementById("ans2").innerHTML = (upNum / downNum).toFixed(6);
}

function clearAllNum() {
    document.getElementById("fz1").innerHTML = document.getElementById("fz2").innerHTML = document.getElementById("fm1").innerHTML = document.getElementById("fm2").innerHTML = document.getElementById("ans1").innerHTML = document.getElementById("ans2").innerHTML = "";
    upNum = downNum = 1;
}

combination: function combination(m, n) {
    return this.factorial(m, n) / this.factorial(n, n);
}
//自定义排列函数(就是数学排列组合里的A)
permutation: function permutation(m, n) {
    return this.factorial(m, n); //就是数学里的Amn,上面是n，下面是m
}

//自定义一个阶乘函数，就是有n个数相乘，从m开始，每个数减1，如factorial(5,4)就是5*(5-1)*(5-2)*(5-3),相乘的数有4个
factorial: function factorial(m, n) {
    var num = 1;
    var count = 0;
    for (var i = m; i > 0; i--) {
        if (count == n) { //当循环次数等于指定的相乘个数时，即跳出for循环
            break;
        }
        num = num * i;
        count++;
    }
    return num;
}

gcd: function gcd(num1, num2) {
    return num2 != 0 ? this.gcd(num2, num1 % num2) : num1;
}