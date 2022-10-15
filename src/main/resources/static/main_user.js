const userShow = document.querySelector('#show')
const url = 'http://localhost:8080/user/api'
let result = ''

const usersTable = (table) => {
    result = `<tr >
                        <td>${table.id}</td>
                        <td>${table.name}</td>
                        <td>${table.surname}</td>
                        <td>${table.email}</td>
                        <td>${table.roles.map(role => role.name)}</td>
                    </tr>`

    userShow.innerHTML = result
}

fetch(url)
    .then(response => response.json())
    .then(data => usersTable(data))
    .catch(error => console.log(error))

const userInfo = document.getElementById('userLogin')
let resultUserInfo = ''

const userInf = (user) => {
    resultUserInfo = ` <span> ${user.email} with roles: 
                                <span>${user.roles.map(role => role.name)} </span></span>
    `
    userInfo.innerHTML = resultUserInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => userInf(data))
    .catch(error => console.log(error))