import validator  from 'is_js'

const checkEmpty=(val,key)=>{

    if (validator.empty(val.trim())) {
        return `please enter ${key}`
    }
    else{
        return ''
    }
}

const checkMinLength =(val,minLength,key)=>{

    if (val.trim().length < minLength) {
        return `please enter min 6 digit ${key}`
    }
    else{
        return ''
    }
}

export default function (data){
    const {email,password,fullName,age,profile_picture}=data


    if (profile_picture !== undefined) {
        if (profile_picture?.path === undefined) {
            return "please upload profile picture"
        }
    }

    if (fullName !== undefined) {
        let emptyValidationText=checkEmpty(fullName,'full name');
        if (emptyValidationText !== '') {
            return emptyValidationText
        }
        else{
        let minLengthValidation=checkMinLength(fullName,3,'full name');

            if(minLengthValidation !== ''){
                  return minLengthValidation
            }
        }
    }


    if (age !== undefined) {
        let emptyValidationText=checkEmpty(age,'age');
        if (emptyValidationText !== '') {
            return emptyValidationText
        }
        else{
        let minLengthValidation=checkMinLength(age,1,'age');

            if(minLengthValidation !== ''){
                  return minLengthValidation
            }
        }
    }




    if (email !== undefined) {
        let emptyValidationText=checkEmpty(email,'email');
        if (emptyValidationText !== '') {

            return emptyValidationText
        }
        else{
            if(!validator.email(email)){
                  return 'please enter valid email'
            }
        }
    }

    if (password !== undefined) {
        let emptyValidationText=checkEmpty(password,'password');
        if (emptyValidationText !== '') {
            return emptyValidationText
        }
        else{
        let minLengthValidation=checkMinLength(password,6,'password');

            if(minLengthValidation !== ''){
                  return minLengthValidation
            }
        }
    }

}