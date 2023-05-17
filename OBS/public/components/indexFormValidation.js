function validate(){
    var x = document.getElementById("password");
    var y = document.getElementById("re-entry");
    if(x.value.length<8){
        alert("Password must be atleast 8 characters");
        return false;
    }
    if(x.value.search(/[A-Z]/)==-1){
        alert("Password must include a Capital letter");
        return false;
    }
    if(x.value.search(/[a-z]/)==-1){
        alert("Password must include a Small letter");
        return false;
    }
    if(x.value!=y.value){
        alert("Passwords do not match");
        return false;
    }
}

function loginValidate(){
    alert("Invalid Credentials");
}