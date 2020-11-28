/*This class represent expense object*/
class Expenses {
  constructor(name, date, amount){
    this.name = name;
    this.date = date;
    this.amount = amount;
  }
}

/*This class is responsible for UI task*/
class UI {
  static displayExpenses(){
    const expenses = Storage.getExpensesToStorage();
    
    for(let expense of expenses){
      UI.addToExpenseList(expense);
    }
    
    UI.displayMessage();
  }
  
  static addToExpenseList(expense){
    const myTable = document.querySelector('#myTable');
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.date}</td>
        <td>${expense.amount}</td>
        <td>
        <button class="delete btn btn-danger btn-sm">Delete</button>
        </td>
    `;
    
    myTable.appendChild(tr);
  }
  
  static removeFromExpenseList(element){
    element.parentElement.parentElement.remove();
  }
  
  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#amount').value = '';
  }
  
  static displayMessage(){
    const expenses = Storage.getExpensesToStorage();
    
    if(expenses.length == 0){
      let tr = document.createElement('tr');
      tr.className = `message`;
      tr.innerHTML = `
      <td colspan="4">No Records</td>
      `;
      document.querySelector('#myTable').appendChild(tr);
    }else{
      document.querySelector('#myTable').querySelector('.message').remove();
    }
  }
//UI ends here
}

/*This class is where the expense stored*/
class Storage {
  static getExpensesToStorage(){
    let expenses;
    if(localStorage.getItem('expenses') === null) {
      expenses = [];
    } else {
      expenses = JSON.parse(localStorage.getItem('expenses'));
    }

    return expenses;    
  }
  
  
  static addToExpenseStorage(expense){
    const expenses = Storage.getExpensesToStorage();
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));    
  }
  
  static removeFromExpenseStorage(name){
    const expenses = Storage.getExpensesToStorage();
    
    expenses.forEach((expense, index) => {
      if(expense.name == name){
        expenses.splice(index, 1);
      }
    });
    
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
//Storage ends here
}

/*When the page loaded*/
document.addEventListener('DOMContentLoaded', UI.displayExpenses);

/*When the form was submitted*/
document.querySelector('#myForm').addEventListener('submit', e => {
  e.preventDefault();
  //get the values from form
  const name = document.querySelector('#name').value;
  const date = document.querySelector('#date').value;
  const amount = document.querySelector('#amount').value;
  //validate
  if(name === '' || date === '' || amount === ''){
    alert('Please fill in all fields')
  }else{
  //instantiate
  const expense = new Expenses(name, date, amount); 
  //add expense in myTable
  UI.addToExpenseList(expense);
  //add expense in local storage
  Storage.addToExpenseStorage(expense);
  //clear all values in fields
  UI.clearFields()
  //display message
  UI.displayMessage();
  }
});

/*When Remove button was clicked*/
document.querySelector('#myTable').addEventListener('click', e => {
  if(e.target.classList.contains('delete')){
    //remove expense from myTable
    UI.removeFromExpenseList(e.target);
    //remove expense from local Storage
    Storage.removeFromExpenseStorage(e.target.parentElement.parentElement.firstElementChild.textContent);
    //display message
    UI.displayMessage();
  }
});