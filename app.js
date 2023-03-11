document.getElementById('loan-form').addEventListener('submit',function(e){

    // show loading
    document.getElementById('loading').style.display = 'block';
    // hide result
    document.getElementById('result').style.display = 'none';
    setTimeout(calculateResults,2000);
    e.preventDefault();

});

function calculateResults(){
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;
    const monthlyPay = document.getElementById('monthly_pay');
    const totalPay = document.getElementById('total_pay');
    const totalInterest = document.getElementById('total_interest');

    const principal = parseFloat(amount);
    const calculateInterest = parseFloat(interest)/100/12;
    const calculateYearsPay = parseFloat(years)*12;

    // compute monthly payment
    const x = Math.pow(1 + calculateInterest, calculateYearsPay);
    const monthly = (principal*x*calculateInterest)/(x-1);
    if(isFinite(monthly)){
        monthlyPay.value = monthly.toFixed(2);
        totalPay.value = (monthly*calculateYearsPay).toFixed(2);
        totalInterest.value = ((monthly*calculateYearsPay) - principal).toFixed(2);

        // hide loading
        document.getElementById('loading').style.display = 'none';
        // show result
        document.getElementById('result').style.display = 'block';

    }else{
       showError("please check your numbers");
    }
}

function showError(error){
     // show loading
     document.getElementById('loading').style.display = 'none';
     // hide result
     document.getElementById('result').style.display = 'none';

    const errorDiv = document.createElement('div');
    errorDiv.className = "alert alert-danger";

    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv,heading);

    setTimeout(clearMgs,3000);

    function clearMgs(){
        document.querySelector('.alert').remove();
    }
}