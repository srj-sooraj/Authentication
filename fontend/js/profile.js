async function getDetails() {
    let token = localStorage.getItem('Auth')
    const res = await fetch('http://localhost:3000/api/profile',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await res.json();
    console.log(result);
    if(result.ok){
        document.getElementById('msg').textContent=`${result.user.username}`
    }else{
         document.getElementById('msg').textContent=`${result.msg}`
    }
    
}
getDetails()

document.getElementById('imageinput').addEventListener('change',function(){
    const file = this.files[0]
    const reader = new FileReader()
    reader.onload = function (e){
        console.log(e.target.result);
        console.log(document.getElementById('imagepreview'));
        document.getElementById('imagepreview').src=e.target.result;
        
    }
    reader.readAsDataURL(file)
})

document.getElementById('add-form').addEventListener('submit',async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem('Auth')
    const formData = new FormData(e.target)
    const res = await fetch('http://localhost:3000/api/upload',{
        method:'POST',
        headers:{'Authorization':`Bearer ${token}`},
        body:formData
    })
    const result = await res.json();
})