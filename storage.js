// form-script

const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/appointmentData')
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
        if(document.querySelector('.btn').value === 'Update'){
            const userId = document.querySelector('#userId').value;
            axios
              .put('http://localhost:3000/appointmentData/'+userId, userObj)
              .then((response) => {
                showUserOnScreen(response.data);
              })
              .catch((err) => {
                document.body.innerHTML += "Error: Something went wrong!!!!";
                console.log(err);
              });

        }
        else{
            axios.post('http://localhost:3000/appointmentData', userObj)
            .then((response) => {
                showUserOnScreen(response.data);
            })
            .catch(err => {
                document.body.innerHTML += 'Error: Something went wrong!!!!';
                console.log(err)
            });
        }

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
            axios.delete('http://localhost:3000/appointmentData/'+obj.id);
        }
    }   

    // edit event
    edtBtn.onclick = () =>{
        userList.removeChild(li);
        nameInput.value = obj.name;
        emailInput.value = obj.email;
        const idElem = document.createElement('input');
        idElem.type = 'hidden';
        idElem.id = 'userId';
        idElem.value = obj.id;
        myForm.children[4].value = 'Update';
        myForm.appendChild(idElem);
    }

    li.appendChild(delBtn);
    li.appendChild(edtBtn);
    userList.appendChild(li);
}