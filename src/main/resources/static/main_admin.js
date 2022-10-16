const userShow = document.getElementById('showUs')
const urlCurrentUs = 'http://localhost:8080/admin/api/user'
let resultCurrentUs = ''
const userTbl = document.getElementById('leftBarUser')

userTbl.addEventListener('click', (ev) => {
    ev.preventDefault()
    const currentUserTable = (tableUs) => {
        resultCurrentUs = `<tr id = ${tableUs.id} >
                        <td>${tableUs.id}</td>
                        <td>${tableUs.name}</td>
                        <td>${tableUs.surname}</td>
                        <td>${tableUs.email}</td>
                        <td>${tableUs.roles.map(role => role.name)}</td>
                    </tr>`

        userShow.innerHTML = resultCurrentUs
    }

    fetch(urlCurrentUs)
        .then(response => response.json())
        .then(data => currentUserTable(data))
        .catch(error => console.log(error))

})

// Вывод юзеров в таблицу
const usersList = document.querySelector('#usersTable')
const url = 'http://localhost:8080/admin/api'
let result = ''

const usersTable = (table) => {
    table.forEach(table => {
        result += `<tr id = ${table.id} >
                        <td>${table.id}</td>
                        <td>${table.name}</td>
                        <td>${table.surname}</td>
                        <td>${table.email}</td>
                        <td>${table.roles.map(role => role.name)}</td>
                        <td class="text-center"><a class="buttonEdit btn btn-primary" id="edit" data-toggle="modal" data-target="#modal-edit"> Edit </a></td>
                        <td class="text-center"><a class="buttonDelete btn btn-danger" id="delete" data-toggle="modal" data-target="#modal-delete"> Delete </a></td>
                    </tr>`
    })
    usersList.innerHTML = result

}

fetch(url)
    .then(response => response.json())
    .then(data => usersTable(data))
    .catch(error => console.log(error))

//  Добавление юзера
const addUserForm = document.querySelector('.add-user-form')
const nameValue = document.getElementById('name')
const surnameValue = document.getElementById('surname')
const emailValue = document.getElementById('email')
const passwordValue = document.getElementById('password')
const rolesValue = document.getElementById('roles')

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const roleAdd = getData2()

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue.value,
            surname: surnameValue.value,
            email: emailValue.value,
            password: passwordValue.value,
            roles: roleAdd
        })
    })
        .then(res => res.json())
        .then(data => {
            newRow(data)
            nameValue.value = ''
            surnameValue.value = ''
            emailValue.value = ''
            passwordValue.value = ''
            console.log(rolesValue)
            const itemForm2 = document.getElementById('itemForm2'); // getting the parent container of all the checkbox inputs
            const checkBoxes2 = itemForm2.querySelectorAll('input[type="checkbox"]');
            checkBoxes2.forEach(item => { // loop all the checkbox item
                item.checked = false

            })
        })
    const home = document.getElementById("home-tab")
    const tab = new bootstrap.Tab(home)
    tab.show()

    const addNewTab = document.getElementById("addNew")
    addNewTab.classList.remove('active')

})

const newRow = (tableUs) => {
    resultCurrentUs = `<tr id = ${tableUs.id} >
                        <td>${tableUs.id}</td>
                        <td>${tableUs.name}</td>
                        <td>${tableUs.surname}</td>
                        <td>${tableUs.email}</td>
                        <td>${tableUs.roles.map(role => role.name)}</td>
                        <td class="text-center"><a class="buttonEdit btn btn-primary" id="edit" data-toggle="modal" data-target="#modal-edit"> Edit </a></td>
                        <td class="text-center"><a class="buttonDelete btn btn-danger" id="delete" data-toggle="modal" data-target="#modal-delete"> Delete </a></td>
                    </tr>`

    usersList.innerHTML += (resultCurrentUs)
}

//        EDIT method
const nameEdit = document.getElementById('name1')
const surnameEdit = document.getElementById('surname1')
const emailEdit = document.getElementById('email1')
const passwordEdit = document.getElementById('password1')
const rolesEdit = document.getElementById('roles1')
const idEdit = document.getElementById('id1')
const modalEdit = new bootstrap.Modal(document.getElementById('modal-edit'))
const editForm = document.getElementById('editForm')
//                EDIT
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

let idForm = 0
on(document, 'click', '.buttonEdit', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nameForm = fila.children[1].innerHTML
    const surnameForm = fila.children[2].innerHTML
    const emailForm = fila.children[3].innerHTML
    const rolesForm = fila.children[4].innerHTML
    const passwordForm = fila.children[5].innerHTML
    idEdit.value = idForm
    nameEdit.value = nameForm
    surnameEdit.value = surnameForm
    emailEdit.value = emailForm
    rolesEdit.value = getData()
    // passwordEdit.value = passwordForm / пароль теперь не выводится
    opcion = 'edit'
    modalEdit.show()
    console.log(rolesEdit.getElementsByClassName('item')[0])
    rolesForm.split(',').forEach((item) => {
        const div1 = rolesEdit.getElementsByClassName('item')[0];
        const div2 = rolesEdit.getElementsByClassName('item')[1];

        if (item === 'admin') {
            div1.getElementsByTagName('input')[0].setAttribute('checked', '');
        } else if (!rolesForm.split(',')[1]) {
            div1.getElementsByTagName('input')[0].removeAttribute('checked');
        }
        if (item === 'user') {
            div2.getElementsByTagName('input')[0].setAttribute('checked', '');
        } else if (!rolesForm.split(',')[1]) {
            div2.getElementsByTagName('input')[0].removeAttribute('checked');
        }
    });
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    modalEdit.hide()
    document.querySelector('.modal-backdrop').remove()
    const roleEdit22 = getData()
    if (opcion == 'edit') {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: idEdit.value,
                name: nameEdit.value,
                surname: surnameEdit.value,
                email: emailEdit.value,
                password: passwordEdit.value,
                roles: roleEdit22
            })
        })
            .then(res => res.json())
            .then(data => {
                    const row = document.getElementById(data.id)

                    row.innerHTML = `<tr id = ${data.id} >
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.surname}</td>
                        <td>${data.email}</td>
                        <td>${data.roles.map(role => role.name)}</td>
                        <td class="text-center"><a class="buttonEdit btn btn-primary" id="edit" data-toggle="modal" data-target="#modal-edit"> Edit </a></td>
                        <td class="text-center"><a class="buttonDelete btn btn-danger" id="delete" data-toggle="modal" data-target="#modal-delete"> Delete </a></td>
                    </tr>`
                }
            )

    }

})
//       DELETE
const on1 = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
const idDelete = document.getElementById('id2')
const nameDelete = document.getElementById('name2')
const surnameDelete = document.getElementById('surname2')
const emailDelete = document.getElementById('email2')
const passwordDelete = document.getElementById('password2')
const rolesDelete = document.getElementById('roles2')
const modalDelete = new bootstrap.Modal(document.getElementById('modal-delete'))
const deleteForm = document.getElementById('deleteForm')

let idFormDelete = 0
on1(document, 'click', '.buttonDelete', e => {
    const fila = e.target.parentNode.parentNode
    idFormDelete = fila.children[0].innerHTML
    const nameFormDelete = fila.children[1].innerHTML
    const surnameFormDelete = fila.children[2].innerHTML
    const emailFormDelete = fila.children[3].innerHTML
    const rolesFormDelete = fila.children[4].innerHTML
    const passwordFormDelete = fila.children[5].innerHTML
    idDelete.value = idFormDelete
    nameDelete.value = nameFormDelete
    surnameDelete.value = surnameFormDelete
    emailDelete.value = emailFormDelete
    rolesDelete.value = getData()
    // passwordEdit.value = passwordForm / пароль теперь не выводится
    opcion = 'delete'
    modalDelete.show()
    // console.log( rolesFormDelete.getElementsByClassName('item')[0])
    rolesFormDelete.split(',').forEach((item) => {
        const div1 = rolesDelete.getElementsByClassName('item')[0];
        const div2 = rolesDelete.getElementsByClassName('item')[1];
        if (item === 'admin') {
            div1.getElementsByTagName('input')[0].setAttribute('checked', '');
        } else if (!rolesFormDelete.split(',')[1]) {
            div1.getElementsByTagName('input')[0].removeAttribute('checked');
        }
        if (item === 'user') {
            div2.getElementsByTagName('input')[0].setAttribute('checked', '');
        } else if (!rolesFormDelete.split(',')[1]) {
            div2.getElementsByTagName('input')[0].removeAttribute('checked');
        }
    });
})
deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    modalDelete.hide()
    if (opcion == 'delete') {
        fetch(url + "/" + idFormDelete, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            // .then(() => deleteForm.innerHTML= 'success')
            .then(res => res.text())
            .then(data => {
                const row2 = document.getElementById(idFormDelete)
                console.log(row2)
                row2.remove()
            })
    }
    document.querySelector('.modal-backdrop').remove()
})
//          GET ROLES EDIT
const itemForm = document.getElementById('itemForm'); // getting the parent container of all the checkbox inputs
const checkBoxes = itemForm.querySelectorAll('input[type="checkbox"]');

function getData() { // this function will get called when the save button is clicked
    let result2 = [];
    checkBoxes.forEach(item => { // loop all the checkbox item
        if (item.checked) {  //if the check box is checked
            let data = {    // create an object
                id: item.id,
                name: item.value,
                authority: item.value
            }
            console.log(data)
            result2.push(data); //stored the objects to result array
        }
    })
    return result2;
}

//          GET ROLES ADD

const itemForm2 = document.getElementById('itemForm2'); // getting the parent container of all the checkbox inputs
const checkBoxes2 = itemForm2.querySelectorAll('input[type="checkbox"]');

function getData2() { // this function will get called when the save button is clicked
    let result2 = [];
    let idI = getData();
    checkBoxes2.forEach(item => { // loop all the checkbox item
        if (item.checked) {  //if the check box is checked
            let data = {    // create an object
                id: item.name,
                name: item.value,
                authority: item.value
            }
            console.log(data)
            result2.push(data); //stored the objects to result array
        }
    })
    return result2;
}

// получение юзера в верхней панели
const userInfo = document.getElementById('userLogin')
let resultUserInfo = ''

const userInf = (user) => {
    resultUserInfo = ` <span> ${user.email} with roles: 
                                <span>${user.roles.map(role => role.name)} </span></span>
    `
    userInfo.innerHTML = resultUserInfo
}
fetch(urlCurrentUs)
    .then(response => response.json())
    .then(data => userInf(data))
    .catch(error => console.log(error))

