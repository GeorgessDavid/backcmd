var userType = document.getElementById('userType')
var medicData = document.getElementById('medicData')
userType.addEventListener("click", function(){
    if(userType.value == '3'){
        medicData.classList.remove('displayNone')
    }else{
        medicData.classList.add('displayNone')
    }
})
