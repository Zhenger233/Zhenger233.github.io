var tempnum1, tempnum2, tempnum3, upnum=1, downnum=1
function getupnum() {
    tempnum1 = document.forms["f1"]["n1"].value;
    tempnum2 = document.forms["f1"]["n2"].value;
    if (document.forms["f1"]["picker1"].value == "C") {
        tempnum3 = this.combination(tempnum1, tempnum2);
        document.getElementById("fz1").innerHTML+='C('+tempnum1+','+tempnum2+')';
    }
    else {
        tempnum3=this.permutation(tempnum1,tempnum2);
        document.getElementById("fz1").innerHTML+='P('+tempnum1+','+tempnum2+')';
    }
    upnum*=tempnum3;
    document.getElementById("fz2").innerHTML=upnum;
    getanswer();
}

function getdownnum() {
    tempnum1 = document.forms["f1"]["n3"].value;
    tempnum2 = document.forms["f1"]["n4"].value;
    if (document.forms["f1"]["picker2"].value == "C") {
        tempnum3 = this.combination(tempnum1, tempnum2);
        document.getElementById("fm1").innerHTML+='C('+tempnum1+','+tempnum2+')';
    }
    else {
        tempnum3=this.permutation(tempnum1,tempnum2);
        document.getElementById("fm1").innerHTML+='P('+tempnum1+','+tempnum2+')';
    }
    downnum*=tempnum3;
    document.getElementById("fm2").innerHTML=downnum;
    getanswer();
}

function getanswer() {
    var temp=gcd(upnum,downnum);
    document.getElementById("ans1").innerHTML=upnum/temp+'/'+downnum/temp;
    document.getElementById("ans2").innerHTML=(upnum/downnum).toFixed(6);
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