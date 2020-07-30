const button_yes = document.getElementsByClassName("emergency_fund1")[0]
const button_no = document.getElementsByClassName("emergency_fund")[0]
const question = document.getElementsByClassName("emergency_div")
const debt_types = []
const only_debt_type_value = []
const expense_payments_listed = []
let expense_amount;
let monthly_debt_total;
let monthly_income;
let excess_amount;
let emergency_amount;
let amount_that_can_be_used;
button_yes.addEventListener("click", logResultTrue)
button_no.addEventListener("click", logResultFalse)

function logResultTrue() {
    e_fund = true;
    $(question).remove();
}

function logResultFalse() {
    e_fund = false;
    console.log(e_fund)
    $(question).remove();
    if_false()
}

function if_false() {
    if (e_fund === false) {
        console.log("You have no emergency fund, you need to save $1000 first")
    }

}

// Grab emergency fund amount. 
function emergencyAmount() {
    emergency_amount = document.getElementById("emergency_amount").value;
    //If more than 1k they need to cut all but 1k and use towards debt.
    if (emergency_amount > 1000) {
        excess_amount = emergency_amount - 1000;
        emergency_amount = 1000;
    }
    debt_types["Emergency Fund Amount "] = "$" + emergency_amount;
}
document.getElementById("grab_emergency_amount").onclick = emergencyAmount;


function debtList(debtType, monthly_debt_cost, totalOwed) {
    //Grabs value from each field
    debtType = document.getElementById("debt_type").value;
    monthly_debt_cost = parseFloat(document.getElementById("monthly_debt_cost").value);
    totalOwed = parseFloat(document.getElementById("owed").value);

    //Must be a number w/label error:

    only_debt_type_value.push(monthly_debt_cost);

    //creates array of debt types and organizes from smallest to largest
    debt_types.push({
        [debtType]: monthly_debt_cost,
        AmountOwedTotal: totalOwed
    })

    debt_types.sort((a, b) => {
        if (a.AmountOwedTotal > b.AmountOwedTotal) return 1;
        else if (b.AmountOwedTotal > a.AmountOwedTotal) return -1;
        else return 0;
    })

    console.log(debt_types)
}
document.getElementById("add_new_debt").onclick = debtList;


//List debt items so user can see what they posted:
//WIP
function post_data() {
    // for (key in debt_types) {
    //     if (debt_types.hasOwnProperty(key)){
    //         let value = debt_types[key]
    //         console.log(value)
    //     }
    // //     let li = document.createElement("li");
    // //     let addedDebt = document.createTextNode(debt_types[i])
    // //     li.appendChild(addedDebt)
    // //     document.getElementById("debt_listed").appendChild(li)
    // // }
    // }
    monthly_debt_total = only_debt_type_value.reduce((a, b) => {
        return a + b;
    }, 0);
    console.log("Total spent on debt monthly is $" + monthly_debt_total)


}
document.getElementById("addTotal_postInfo").onclick = post_data;

//Normal Expenses excluding debt:
function expensesArray(expenseType, expenseAmount) {
    //Grabs value from each field
    expenseType = document.getElementById("expense_type").value;
    expenseAmount = parseFloat(document.getElementById("expense_amount").value);

    expense_payments_listed.push(expenseAmount)
    console.log(expense_payments_listed)

    //Must be a number w/label error:

}
//Add expenses:
function addAllExpenses() {
    expense_amount = expense_payments_listed.reduce((a, b) => {
        return a + b;
    }, 0);
    console.log("Total monthly expenses are $" + expense_amount)
}
document.getElementById("addExpenses").onclick = expensesArray;
document.getElementById("CalculateExpenses").onclick = addAllExpenses;


//Grab monthly income
get_monthly_income = () => {
    monthly_income = document.getElementById("net").value;
    console.log(monthly_income)
}
document.getElementById("get_net").onclick = get_monthly_income;

//Estimate how much of their income can be applied to their debt
//So income - expenses - monthly_amount for debt = amount_that_can_be_used
determineAmountCanBeUsed = () => {
    amount_that_can_be_used = monthly_income - expense_amount - monthly_debt_total;
    return amount_that_can_be_used
}

function applyAmountCanBeUsed(determineAmountCanBeUsed) {

    for (i = 0; i < debt_types.length; i++) {
        //which debt is lowest? 0 will always be the lowest in the array. 
        let lowestDebt = debt_types[0]['AmountOwedTotal'];
        //debt_lowest - determineAmountCanBeUsed 
        let isThereMoreLeft = lowestDebt - determineAmountCanBeUsed;
        //is there money left?
        if (isThereMoreLeft < 0) {
            let ArrayforLowest = debt_types.splice(index, 0)
            determineAmountCanBeUsed = Math.abs(isThereMoreLeft)
            lowestDebt = ArrayforLowest[0]['AmountOwedTotal'];
        }
        return ArrayforLowest
    }