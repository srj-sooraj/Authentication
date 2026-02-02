async function getDetails() {
    let token = localStorage.getItem('Auth')
    const res = await fetch('http://localhost:3000/api/getdetails',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await res.json();
    const userDetails = result.userDetails
    console.log(result);
    if(result.ok){
        document.getElementById('fullname').value =userDetails.fullname;
        document.getElementById('phone').value =userDetails.phone;
        document.getElementById('email').value = userDetails.email;
        document.getElementById('imagepreview').src = userDetails.profile
            ? `http://localhost:3000/api/image/${userDetails.profile}`
            : '';



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


document.getElementById('edit-form').addEventListener('submit',async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem('Auth')
    const formData = new FormData(e.target)
    const res = await fetch('http://localhost:3000/api/editdetails',{
        method:'PUT',
        headers:{'Authorization':`Bearer ${token}`},
        body:formData
    })
    const result = await res.json();
})

