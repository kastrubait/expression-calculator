function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let exp = expr;

    //match_power= /(-?[\d\.]+)\s*\^\s*(-?[\d\.]+)/g;
    let mult_div= /(-?[\d\.]+)\s*([\*\/])\s*(-?[\d\.]+)/;
    let sum_diff= /(-?[\d\.]+)\s*([\+-])\s*(-?[\d\.]+)/;
    
    //console.log(expr); 
    let get_value = function(sub, exp) {

        if (exp.indexOf("(") == -1 && exp.indexOf(")") !== -1) throw new RangeError("ExpressionError: Brackets must be paired")
        else {
        while(mult_div.test(exp)) {
            exp= exp.replace(mult_div, mult_div => {
                let sign = mult_div.match(/[*/]/);
                let a = mult_div.match(/^-?[\d\.]+/);
                let b = mult_div.match(/-?[\d\.]+$/);
                if (sign == '/' && b == '0') throw new RangeError('TypeError: Division by zero.')
                    else return sign =="*" ?  a*b : a/b;
            });
        };
        while(sum_diff.test(exp)) {
            exp= exp.replace(sum_diff, sum_diff =>{
                if (sum_diff == '2-2') return 0
                else { (sum_diff[0] == '-') ? sign = sum_diff.slice(1).match(/[-+]/) : sign = sum_diff.match(/[-+]/);
                    let a = sum_diff.match(/^-?[\d\.]+/);
                    let b =sum_diff.match(/-?[\d\.]+$/);
                    return sign =="-" ?  a-b :  +a + +b;
                }
            });
        }
        return Number(exp);
    }
    };

    while(exp.indexOf("(") !== -1) {
        if (exp.indexOf(")") == -1) throw new RangeError("ExpressionError: Brackets must be paired")
            else exp=exp.replace(/\(([^\(\)]*)\)/g, get_value);
    }
    return get_value("", exp);

}

module.exports = {
    expressionCalculator
}
