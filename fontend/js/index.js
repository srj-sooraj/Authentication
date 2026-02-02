async function loadData() {
    let token = localStorage.getItem('Auth')
    const res = await fetch('http://localhost:3000/api/home',{
        headers:{Authorization:`Bearer ${token}`}
    })
    console.log(res);

    const result = await res.json();
    console.log(result.UserDetails);
    if(result.ok){
        console.log('hai');
        
        let str = `
            <h1>Welcome, ${result.user.username}!</h1>
            <h2>${result.UserDetails.fullname || ''}</h2>
            <h3>${result.UserDetails.phone || ''}</h3>
            <h3>${result.UserDetails.email || ''}</h3>
            <img src="http://localhost:3000/api/image/${result.UserDetails.profile}" alt="Profile">
            <button class="btn btn-primary" onclick="logout()">Logout</button>
        `;

        document.getElementById('session').innerHTML = str;
    }else{
        document.getElementById('session').innerHTML = `
            <div class="auth-prompt">
                <p>Sign in to access your dashboard and manage your profile.</p>
                <a href="./pages/signin.html">Sign in →</a>
            </div>
        `;
    }
}
loadData()

async function logout() {
    const res = await fetch('http://localhost:3000/api/signout',{
        method:'POST'
    })
   const result = await res.json();
   alert(result.msg);
   loadData();
}


async function deleteDetails() {
   const token = localStorage.getItem("Auth")

    const res = await fetch("http://localhost:3000/api/deletedetails", {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const result = await res.json()
    console.log(result)

    if (result.ok) {
        localStorage.removeItem("Auth")
        localStorage.removeItem("userDetails")

        alert("Data deleted successfully")


        window.location.href = ""
    } else {
        alert(result.msg)
    }
}
