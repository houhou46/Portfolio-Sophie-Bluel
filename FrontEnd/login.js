const form = document.getElementById('login-form')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const request = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    
    const data = await request.json()
    console.log(data)
    if (data.token) {
        localStorage.setItem('token', data.token)
        window.location = '/admin.html'
    } else {
        alert('Utilisateur non trouvé')
    }
})

