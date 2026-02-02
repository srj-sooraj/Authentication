document.getElementById('signup').addEventListener("submit",async(e)=>{
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('cpassword').value;

    const res = await fetch('http://localhost:3000/api/signup',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({username,password,cpassword})
    })

    const result = await res.json()
    alert(result.msg)
    if(result.ok){
        window.location.href='./signin.html'
    }
})