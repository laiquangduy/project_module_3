let slide_content = document.querySelector('#slide-content')

let signin_form = document.querySelector('#signin-form')

let signin_btn = document.querySelector('#signin-btn')

let darkmode_toggle = document.querySelector('#darkmode-toggle')

let slide_index = 0

slide = () => {
    let slide_items = slide_content.querySelectorAll('img')
    slide_items.forEach(e => e.classList.remove('active'))
    slide_index = slide_index + 1 === slide_items.length ? 0 : slide_index + 1
    slide_items[slide_index].classList.add('active')
}

setInterval(slide, 2000)

// animate input
document.querySelectorAll('.animate-input').forEach(e => {
    let input = e.querySelector('input')
    let button = e.querySelector('button')

    input.onkeyup = () => {
        if (input.value.trim().length > 0) {
            e.classList.add('active')
        } else {
            e.classList.remove('active')
        }

        if (checkSigninInput()) {
            signin_btn.removeAttribute('disabled')
        } else {
            signin_btn.setAttribute('disabled', 'true')
        }
    }

    // show password button
    if (button) {
        button.onclick = () => {
            if (input.getAttribute('type') === 'text') {
                input.setAttribute('type', 'password')
                button.innerHTML = 'Show'
            } else {
                input.setAttribute('type', 'text')
                button.innerHTML = 'Hide'
            }
        }
    }
})

checkSigninInput = () => {
    let inputs = signin_form.querySelectorAll('input')
    return Array.from(inputs).every(input => {
        return input.value.trim().length >= 6
    })
}

// darkmode toggle
darkmode_toggle.onclick = (e) => {
    e.preventDefault()
    let body = document.querySelector('body')
    body.classList.toggle('dark')
    darkmode_toggle.innerHTML = body.classList.contains('dark') ? 'Lightmode' : 'Darkmode'
}

//---------Login---------
let api = "http://127.0.0.1:3000/";
let form = document.getElementById("login-form")
form.addEventListener("submit", function(e){
    e.preventDefault();
    let email1 = form.email.value;
    let password1 = form.password.value;
    // console.log(email, password);
    // validate client - tự làm, coi như đã xong ở client
    // let data = {
    //     email,
    //     password,
    // }
    // console.log(data);
    console.log(email1, password1)
    fetch(api + "auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email1,
            password: password1
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Hello world")
        if(data.status === "success") {
            console.log(data)
            window.location.href = "/";
        }
    })
    .catch((err) => console.log(err))
});



