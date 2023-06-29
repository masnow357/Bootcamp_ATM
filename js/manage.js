// This line gets the user data from localStorage
const USER = JSON.parse(localStorage.getItem('user'))

// This fragment of code creates childs of "Consultar monto"; "Ingresar monto" and "Retirar monto".
let balanceNode;
let consignmentNode;
let withdrawlNode;

document.getElementById('getBalance').addEventListener('click', event => {
    clean();
    event.preventDefault();
    balanceNode = document.getElementById('balance')
    .appendChild(document.createElement("p"));

    balanceNode.appendChild(
        document.createTextNode(`Tu saldo es: ${USER.user.balance}`)
        );

})

document.getElementById('getConsignment').addEventListener('click', event => {
    event.preventDefault();
    createConsignmentNode()
})

document.getElementById('getWithdrawl').addEventListener('click', event => {
    event.preventDefault();
    createWithdrawlNode()
})

const createConsignmentNode = (monto=0) => {
    clean();
    consignmentNode = document.getElementById('consignment')
        .insertBefore(
            document.createElement("p"),
            document.getElementById('consignment_form'));

    let message = `El saldo disponible es: ${USER.user.balance}`
    if(monto){
        message = `El saldo ingresado fue de ${monto} y el total actual es: ${USER.user.balance}`
    }

    consignmentNode.appendChild(
        document.createTextNode(message)
        )
}

const createWithdrawlNode = (monto=0) => {
    clean();
    withdrawlNode = document.getElementById('withdrawl')
        .insertBefore(
            document.createElement("p"),
            document.getElementById('withdrawl_form'));
    let message = `El saldo disponible es: ${USER.user.balance}`
    if(monto){
        message = `El saldo ingresado fue de ${monto} y el total actual es: ${USER.user.balance}`
    }
    
    withdrawlNode.appendChild(
        document.createTextNode(message)
        )
}

// This fragment delete the childs of all nodes 

const clean = () => {
    balanceNode && balanceNode.remove()
    consignmentNode && consignmentNode.remove()
    withdrawlNode && withdrawlNode.remove()
}

// Here we made a consignment
const consignmentForm = document.getElementById('consignment_form')
    .addEventListener('submit', event => {
        event.preventDefault();
        if(event.target[0].value[0] === '-' || event.target[0].value === '0') return handleException('No se admiten valores iguales o menores a 0');
        const MONTO = parseInt(event.target[0].value);
        const TOTAL = MONTO + USER.user.balance;
        if(TOTAL > 990) return handleException('El saldo final no puede ser mayor a 990');
        USER.user.balance = TOTAL;
        event.target[0].value = '';
        createConsignmentNode(MONTO);
    })

// Here we made a withdrawl
const withdrawlForm = document.getElementById('withdrawl_form')
    .addEventListener('submit', event => {
        event.preventDefault();
        if(event.target[0].value[0] === '-' || event.target[0].value === '0') return handleException('No se admiten valores iguales o menores a 0');
        const MONTO = parseInt(event.target[0].value);
        const TOTAL = USER.user.balance - MONTO
        if(TOTAL < 10) return handleException('El saldo final no puede ser menor a 10');
        USER.user.balance = TOTAL;
        event.target[0].value = '';
        createWithdrawlNode(MONTO);
    })
