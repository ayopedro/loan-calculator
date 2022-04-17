//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //hide results
  document.getElementById('results').style.display = 'none';

  //show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Calculate results
function calculateResults(){

//UI Variables
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-repayment');
const totalPayment = document.getElementById('total-repayment');
const totalInterest = document.getElementById('total-interest');

//Calculations
const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(years.value) * 12;

//Compute monthly Payments
const x = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principal * x * calculatedInterest) / (x - 1);

if(isFinite(monthly)){
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

  //show results
  document.getElementById('results').style.display = 'block'

  //Hide LOADER
  document.getElementById('loading').style.display = 'none';
}else{
showError('Please Check Your Numbers');
}


}

//show Error
function showError(error){
  //Hide results
  document.getElementById('results').style.display = 'none'

  //Hide LOADER
  document.getElementById('loading').style.display = 'none';
  //create  div
  const errorDiv = document.createElement('div');
  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //add class
  errorDiv.className = 'alert alert-danger';
  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  //insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 2 seconds
  setTimeout(clearError, 2000);
}

//clear error
function clearError(){
  document.querySelector('.alert').remove();
}
