


export default function Validation (values){
    const errors = {}
    const password_pattern = /(?=.*[^A-Za-z]).{8}/;
    const email_pattern = /\S+@\S+\.\S+/;
  
  
    if (values.email === "") {
      errors.email = "Email/Username is Required";
    }
    if (!email_pattern.test(values.email)){
      errors.email = "Email is Invalid";
    }
    else  if (values.username === "") {
      errors.username = "Username is Required";
    }
    /**check exist */
  
  
    if (values.password === "") {
      errors.password = "Confirmed password is Required";
    }
  
    if (values.confirmpassword === "") {
      errors.confirmpassword = "Confirmed password is Required";
    }
    
    if(values.confirmpassword != values.password) {
      errors.confirmpassword = "Confirmed password doesn't match"
    }

    if(Object.keys(values).length > 3) {
      if(!isNaN(values.phone) && values.phone.length !=10){
        errors.phone = "Phone should be valid"
      }
      if(values.phone === ""){
        errors.phone = "Phone is Required";
      }
    }
  
    return errors
    
  }