const form = document.getElementById('login-form')
const email = document.getElementById('email')
const password = document.getElementById('password')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(email.value)
    console.log(password.value)

    const request = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    //attend que le corps de la requête HTTP soit lu et converti en un objet JavaScript puis stocker cet objet dans la variable data
    const data = await request.json()
    console.log(data)
    if (data.token) {
        localStorage.setItem('token', data.token)
        window.location = '/admin.html'
    } else {
        alert('Utilisateur non trouvé')
    }
})