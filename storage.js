// form-script

const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/b41160336665488fa337332ff67f45d7/appointmentData')
    .then((response) => {
        for(userObj of response.data){
            showUserOnScreen(userObj);
        }
    })
    .catch(err => {
        myForm.innerHTML = '<h1>Error: Something went wrong!!!!</h1>';
        console.log(err);
    })
})

function onSubmit(e){
    e.preventDefault();
    if(nameInput.value === '' || emailInput.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        let userObj = {
            name : nameInput.value,
            email : emailInput.value
        }
        axios.post('https://crudcrud.com/api/b41160336665488fa337332ff67f45d7/appointmentData', userObj)
        .then((response) => {
            showUserOnScreen(response.data);
        })
        .catch(err => {
            document.body.innerHTML += 'Error: Something went wrong!!!!';
            console.log(err)
        });

        nameInput.value = '';
        emailInput.value = '';
    }
}

function showUserOnScreen(obj){
    const li = document.createElement('li');
    var userDetails = document.createTextNode(`${obj.name} : ${obj.email}`)
    li.appendChild(userDetails);

    // create delete btn element
    var delBtn = document.createElement('button');
    delBtn.className = 'delete';
    var delText = document.createTextNode('Delete');
    delBtn.appendChild(delText);

    // create edit btn element
    var edtBtn = document.createElement('button');
    edtBtn.className = 'edit';
    var edtText = document.createTextNode('Edit');
    edtBtn.appendChild(edtText);

    
    // delete event
    delBtn.onclick = () =>{
        if(confirm('Are you sure ?')){
            userList.removeChild(li);
            axios.delete('https://crudcrud.com/api/b41160336665488fa337332ff67f45d7/appointmentData/'+obj._id);
        }
    }   

    li.appendChild(delBtn);
    li.appendChild(edtBtn);
    userList.appendChild(li);
}