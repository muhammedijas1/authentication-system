export const validateEmail = (email) => {
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email){
    return "email required"
  }else if(!emailregex.test(email)){
    return "enter valid email"
  }
  return ""
};

export const validateUsername = (username) =>{
    if(!username){
        return "username required"
    }
    else if(username.length < 3){
        return "minimum 3 characters"
    }
    if(username.length > 20){
        return "maximum 20 characters"
    }

    return "";
}


export const validatePassword = (password)=>{
    if(!password){
        return "password required"
    }
    else if(password.length < 6){
        return "password must above 6 character"
    }
    return ""
}

export const validateFullname = (fullname) =>{
    if(!fullname){
        return "full name required"
    }else if(fullname.length < 2){
        return "fullname must be at least 2 character above"
    }
    return "";
}