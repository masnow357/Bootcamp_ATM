const submit = document.getElementById('loginForm')
submit.addEventListener('submit', async (event) => {
    console.log(event.target[0].value, event.target[1].value)
    event.preventDefault()
    const user = new User('johnDoe1', 'pass123')
    try {
        const isValid = await user.validate()
        console.log(isValid)
    } catch (error) {
        handeException(error)
    }
})

const handeException = (exception) => {
    alert(exception)
}

class User{

    constructor(username, password){
        this.username = username
        this.password = password
    }

    fetchUsers = async () => {
        const data = await fetch('utils/users.json')
        return await data.json()
    }

    setUser = async () => {
        try {
            const users = await this.fetchUsers()
            this.user = await users.filter(user => {
                return user.username === this.username
            })[0]
            if (this.user === undefined) {
                throw Error('El usuario no se encuentra en nuestra base de datos')
            }
            return this.user
        } catch (error) {
            throw Error(error)
        }
    }

    getUser = async () => {
        try {
            await this.setUser()
            return this.user
        } catch (error) {
            throw Error(error)
        }
    }

    validate = async() => {
        try {
            await this.getUser()
            return this.user.password === this.password
        } catch (error) {
            throw Error(error)
        }
    }
}
