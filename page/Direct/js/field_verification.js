//
//==========================================================================================================================================
//validating the email as the user is inputing it 
function loginLoading() {
    
    localStorage.username = "+"+document.getElementById("username").value;
    localStorage.password = document.getElementById("password").value;  
    
    window.location.href = "Loading.html";
    
    login();
        
    
}
//==========================================================================================================================================
//validating the email as the user is inputing it 
function validateEmail() {
    //creating varibles from the textfields and trimming the spaces out
    var email = (document.getElementById("email").value).replace(/ /g,'');
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        //set the value to the trimmed one / eliminates spaces 
        document.getElementById("emailDiv").className = "col-sm-8";
        return (true);
    }
    
    
    alert("Veuillez saisir une adresse mail suivant le format suivant: \n\n  Test@gmail.com ");
    document.getElementById("email").value = "";
    
    //remove focus
    document.getElementById("email").blur();
    return false;
}
//==========================================================================================================================================
//validating the email as the user is inputing it 
function validateEmailConfirm() {
        //creating varibles from the textfields and trimming the spaces out
    var email = (document.getElementById("emailconfirm").value).replace(/ /g,'');
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        //set the value to the trimmed one / eliminates spaces 
        return (true);
    }
    
    
    alert("Veuillez saisir une adresse mail suivant le format suivant: \n\n  Test@gmail.com ");
    document.getElementById("emailconfirm").value = "";
    //remove focus
    document.getElementById("emailconfirm").blur();
    return false;
}
 //==========================================================================================================================================
//validate the telephone as the user is inputing it 
function paymentMethodLate(){
   if(document.getElementById("paySelection").value == "OM"){
       window.location.href = "payOrange_Late.html";
       
   }else if(document.getElementById("paySelection").value == "MC"){
       
       window.location.href = "paymobicash_Late.html";
   }
}
 //==========================================================================================================================================
function pinVerificationLate(){
    
    
       document.getElementById("payButton").style.display = "block";
    
    if(document.getElementById("paySelection").value == "MC"){
        //sending the mobicash request
        mobicashOuvertureLate();
        
       document.getElementById("telephoneButton").disabled = true;
        document.getElementById("pinTitle").style.display = "none";
       document.getElementById("telephoneTitle").style.display = "none";
       document.getElementById("telephoneButton").style.display = "none";
       document.getElementById("numeroTitle").style.display = "none";   
        document.getElementById("resendNumber").style.display = "block";
       document.getElementById("payButton").disabled = false;
    }
}
//==========================================================================================================================================
//validate the telephone as the user is inputing it 
function validateTelephonePay(){
    //creating varibles from the textfields and trimming the spaces out
    var telephone = (document.getElementById("telephone").value).replace(/ /g,'');
    
    if ((telephone.startsWith("226") == true && telephone.length == 11 ))
    {
        localStorage.payTelephone = telephone.substring(3);;
        //console.log("2");
        if(document.getElementById("paySelection").value=="OM"){
            document.getElementById("payButton").disabled = false;
        }else if(document.getElementById("paySelection").value=="MC"){
            document.getElementById("telephoneButton").disabled = false;
        }
        
        return (true);
        
    }else if((telephone.startsWith("226") == false   && telephone.length == 8 )){
        
        localStorage.payTelephone = telephone;
        
        //console.log("1");
        //set the value to the trimmed one / eliminates spaces 
        telephone = "226"+ telephone;
        document.getElementById("telephone").value=telephone;
        
        if(document.getElementById("paySelection").value=="OM"){
            document.getElementById("payButton").disabled = false;
        }else if(document.getElementById("paySelection").value="MC"){
            document.getElementById("telephoneButton").disabled = false;
        }
        return true;
        
    }else{
       
        if(document.getElementById("paySelection").value=="OM"){
            document.getElementById("payButton").disabled = false;
        }else if(document.getElementById("paySelection").value=="MC"){
            document.getElementById("telephoneButton").disabled = false;
        }
        
        //setting the textfield as red if there's an error
        document.getElementById("messageErreur").innerHTML = "Entrez un numéro dans les formats suivants: \n 22670707070 \n ou \n 70707070 ";
        jQuery(document).ready(function ($) {
            $('#errorMessages').modal('show');
        });
        return (false);
    }
}
//==========================================================================================================================================
//validate the telephone as the user is inputing it 
function validateTelephone(){
    //creating varibles from the textfields and trimming the spaces out
    var telephone = (document.getElementById("telephone").value).replace(/ /g,'');
    
    if ((telephone.startsWith("226") == true && telephone.length == 11 ))
    {
        //set the value to the trimmed one / eliminates spaces 
        return (true);
    }else if((telephone.startsWith("226") == false   && telephone.length == 8 )){
        //set the value to the trimmed one / eliminates spaces 
        telephone = "226"+ telephone;
        document.getElementById("telephone").value=telephone;
        return true;
    }
    
    document.getElementById("telephone").value="226";
    //remove focus
    document.getElementById("telephone").blur();
    alert("Entrez un numéro dans les formats suivants: \n 22670707070 \n ou \n 70707070 ");
   return (false);
}
//==========================================================================================================================================
//validate the telephone as the user is inputing it 
function validateTelephoneReset(){
    //creating varibles from the textfields and trimming the spaces out
    var telephone = (document.getElementById("telephone").value).replace(/ /g,'');
    
    if ((telephone.startsWith("226") == true && telephone.length == 11 ))
    {
        //set the value to the trimmed one / eliminates spaces 
        requestPwdCode("+"+telephone);
        return false;
    }else if((telephone.startsWith("226") == false   && telephone.length == 8 )){
        requestPwdCode("+226"+telephone);
        return false;
    }else if ((telephone.startsWith("+226") == true && telephone.length == 12 ))
    {
        //set the value to the trimmed one / eliminates spaces 
        requestPwdCode(telephone);
        return false;
    }
    
    document.getElementById("telephone").value="+226";
    //remove focus
    document.getElementById("telephone").blur();
    alert("Entrez un numéro dans les formats suivants: \n +22670707070 \n 22670707070 \n ou \n 70707070 ");
   return (false);
}
//==========================================================================================================================================
//validate the telephone as the user is inputing it 
function validateTelephoneConfirm(){
    //creating varibles from the textfields and trimming the spaces out
    var telephone = (document.getElementById("telephone_confirm").value).replace(/ /g,'');
    
    if ((telephone.startsWith("226") == true && telephone.length == 11 ))
    {
        //set the value to the trimmed one / eliminates spaces 
        return (true);
    }else if((telephone.startsWith("226") == false   && telephone.length == 8 )){
        //set the value to the trimmed one / eliminates spaces 
        telephone = "226"+ telephone;
        document.getElementById("telephone_confirm").value=telephone;
        return true;
    }
    
    document.getElementById("telephone_confirm").value="226";
    //remove focus
    document.getElementById("telephone_confirm").blur();
    //setting the textfield as red if there's an error
    alert("Entrez un numéro dans les formats suivants: \n 22670707070 \n ou \n 70707070 ");
   return (false);
}
//==========================================================================================================================================
function validateCNIB(){
    //creating varibles from the textfields and trimming the spaces out
    var cnib = (document.getElementById("cnibnumber").value).replace(/ /g,'');
    var cnibconfirm = (document.getElementById("cnibnumber_confirm").value).replace(/ /g,'');
    
    //setting the value to lowercase
    cnib = cnib.toLowerCase();
    cnibconfirm = cnibconfirm.toLowerCase();
     
    //verify that the cnib starts with b and it's 9 character long 
    if (cnib.startsWith("b") == true && (cnib.length == 7 || cnib.length == 8 || cnib.length == 9 ) )
    {
        //verify both textfield have the same values
        if(cnib==cnibconfirm){
            //setting the textfield back to normal 
            document.getElementById("cnib").className = "col-sm-8";
            document.getElementById("cnibconfirm").className = "col-sm-8";
            return true;
        }
    }
    //setting the textfield as red if there's an error
    document.getElementById("cnib").className = document.getElementById("cnib").className + " has-error";  // this adds the error class
    document.getElementById("cnibconfirm").className = document.getElementById("cnibconfirm").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validateNom(){
    //creating varibles from the textfields and trimming the spaces out
    var nom = (document.getElementById("lastname").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (nom != "")
    {
        //setting the textfield back to normal 
        document.getElementById("nom").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("nom").className = document.getElementById("nom").className + " has-error";  // this adds the error class
   return "false";
    
}
//==========================================================================================================================================
function validatePrenom(){
    //creating varibles from the textfields and trimming the spaces out
     var prenom = (document.getElementById("firstname").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (prenom != "")
    {
        //setting the textfield back to normal 
        document.getElementById("prenom").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("prenom").className = document.getElementById("prenom").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validateMaiden(){
    //creating varibles from the textfields and trimming the spaces out
     var maiden = (document.getElementById("maidenname").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (maiden != "")
    {
        //setting the textfield back to normal 
        document.getElementById("marier").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("marier").className = document.getElementById("marier").className + " has-error";  // this adds the error class
   return (false);
}
//==========================================================================================================================================
function validateMinistere(){
    //creating varibles from the textfields and trimming the spaces out
     var ministere = (document.getElementById("ministere").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (ministere != "")
    {
        //setting the textfield back to normal 
        document.getElementById("ministry").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("ministry").className = document.getElementById("ministry").className + " has-error";  // this adds the error class
   return (false);
}
//==========================================================================================================================================
function validateDateNaissance(){
    //creating varibles from the textfields and trimming the spaces out
     var dateofbirth = (document.getElementById("dateofbirth").value);
     compareDate(dateofbirth);
     //verify that the cnib starts with b and it's 9 character long 
    if (dateofbirth != "")
    {
        //setting the textfield back to normal 
        document.getElementById("naissance").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("naissance").className = document.getElementById("naissance").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validateLieuNaissance(){
     //creating varibles from the textfields and trimming the spaces out
     var lieu = (document.getElementById("address").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (lieu != "")
    {
        //setting the textfield back to normal 
        document.getElementById("lieu").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("lieu").className = document.getElementById("lieu").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validateAdresse(){
     //creating varibles from the textfields and trimming the spaces out
     var adresse = (document.getElementById("address").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (adresse != "")
    {
        //setting the textfield back to normal 
        document.getElementById("adresse").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("adresse").className = document.getElementById("adresse").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validateCorps(){
     //creating varibles from the textfields and trimming the spaces out
     var corp = (document.getElementById("corps").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (corp != "")
    {
        //setting the textfield back to normal 
        document.getElementById("corp").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("corp").className = document.getElementById("corp").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validateDateDelivrance(){
     //creating varibles from the textfields and trimming the spaces out
     var cnibdate = (document.getElementById("cnibdateissue").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (cnibdate != "")
    {
        //setting the textfield back to normal 
        document.getElementById("cnibdate").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("cnibdate").className = document.getElementById("cnibdate").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validateDateEcheance(){
    //creating varibles from the textfields and trimming the spaces out
     var cnibvalide = (document.getElementById("cnibvaliduntil").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (cnibvalide != "")
    {
        //setting the textfield back to normal 
        document.getElementById("cnibvalide").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("cnibvalide").className = document.getElementById("cnibvalide").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validatePaysDelivrance(){
     //creating varibles from the textfields and trimming the spaces out
     var pays = (document.getElementById("cnibplaceofissue").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (pays != "")
    {
        //setting the textfield back to normal 
        document.getElementById("cnibpays").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("cnibpays").className = document.getElementById("cnibpays").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validateMatricule(){
     //creating varibles from the textfields and trimming the spaces out
     var matriculeDiv = (document.getElementById("matricule").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (matriculeDiv != "")
    {
        //setting the textfield back to normal 
        document.getElementById("matriculeDiv").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("matriculeDiv").className = document.getElementById("matriculeDiv").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
function validatePassword(){
        //creating varibles from the textfields and trimming the spaces out
    var pass = (document.getElementById("new_pass").value);
    var pass_confirm = (document.getElementById("new_pass_confirm").value);
    
    
    //verify that both field have the same values
    if ((pass == pass_confirm) && pass != "")
    {
        //setting the textfield back to normal 
        document.getElementById("pass").className = "col-sm-8";
        document.getElementById("pass_confirm").className = "col-sm-8";
        return (true);
    }
    //setting the textfield as red if there's an error
    document.getElementById("pass").className = document.getElementById("pass").className + " has-error";  // this adds the error class
    document.getElementById("pass_confirm").className = document.getElementById("pass_confirm").className + " has-error";  // this adds the error class
   return "false";
}
//==========================================================================================================================================
//show the maiden field if sex == F
function showMaiden(){
    //get the role selected
    var sexe = (document.getElementById("sex").value).toLowerCase();
    //verify wich role is selected
    if(sexe == "f"){
        //show maiden field
        document.getElementById("maidenname").disabled = false;
        
    }else{
        //disable maiden field
        document.getElementById("maidenname").disabled = true;
        document.getElementById("maidenname").value = "";
    }
    
}
//==========================================================================================================================================
//validating the values once the button submit is hit
function showFonctionnaire(){
    //get the role selected
    var role = (document.getElementById("role").value).toLocaleLowerCase();
    
    
        localStorage.roleProfession = document.getElementById("role").value;
    
    //console.log("role: "+ document.getElementById("role").value);
    //console.log("role2: "+ localStorage.getItem("role"));
    //verify wich role is selected
    if(role == "professionnel"){
        
        //enable fields used for the fonctionnaire
        document.getElementById("matricule").disabled = false;
        document.getElementById("corps").disabled = false;
        document.getElementById("ministere").disabled = false;
        
    }else{
        
        //disable fields for the fonctionnaire
        document.getElementById("matricule").disabled = true;
        document.getElementById("corps").disabled = true;
        document.getElementById("ministere").disabled = true;
        
        document.getElementById("matricule").value = "";
        document.getElementById("corps").value = "";
        document.getElementById("ministere").value = "";
        
        
    }
    
}
//==========================================================================================================================================
//validating the values once the button submit is hit
function validateAll(){
    
    //creating variables
    //get the role selected
    var count="Veuillez revoir les champs suivants: \n";
    var message ="";
    
    //validate all the fields
    if(validateBirthDay() < 18){
        count += "\n -Verifier la date de naissance! \n"
    } 
    
    /*if(validateCNIBDate() != 10){
        count += "\n -Verifier les dates de la CNIB! \n"
    } */
        if((document.getElementById("telephone_confirm").value != document.getElementById("telephone").value)){
            message += "- Les numéros de téléphone ne concordent pas!\n";
        }
    
    if(document.getElementById("telephone").value == "" || document.getElementById("telephone").value == "226"){
            message += "-Le champ du téléphone est vide !\n";
        }
    if(document.getElementById("telephone_confirm").value == "" || document.getElementById("telephone_confirm").value == "226"){
            message += "-Le champ de confirmation du téléphone est vide !\n";
        }
    
    
     if(document.getElementById("emailconfirm").value != document.getElementById("email").value){
       message += "- Les adresses emails ne concordent pas!\n";
         
     }
    
    if(document.getElementById("email").value == ""){
            message += "-Le champ du mail est vide !\n";
        }
    if(document.getElementById("emailconfirm").value == ""){
            message += "-Le champ de confirmation du mail est vide !\n";
        }
    
    if((document.getElementById("cnibnumber").value != document.getElementById("cnibnumber_confirm").value)){
            message += "- Les numéros de la CNIB ne concordent pas!\n";
        }
    if(document.getElementById("cnibnumber").value == ""){
            message += "-Le champ de la CNIB est vide !\n";
        }
    if(document.getElementById("cnibnumber_confirm").value == ""){
            message += "-Le champ de confirmation de la CNIB est vide !\n";
        }
    
    
    if(validatePaysDelivrance()== "false"){
        count+= "- Le Pays de délivrance de CNIB \n";
    }  
    
    var p1 =document.getElementById("new_pass_confirm").value;
    var p2 =document.getElementById("new_pass").value;
    if((p1.length <8 || p2.length < 8) ){
        count+= "- La confirmation du mot de passe doit avoir un minimum de 8 caractères! \n";
    }
     if((p1 != p2)){
        count+= "- Les mots de passe ne concordent pas! \n";
    }
    
     if(count != "Veuillez revoir les champs suivants: \n"){
        
         count += message;
         if(message != ""){
            alert(count);
        }else
            alert(count);
    
        return false;
         
    }else if(message != ""){
            alert(message);
            return false;
        }
        
        
        
        localStorage.ministere = "";
        localStorage.corps = "";
        localStorage.matricule = "";
        localStorage.firstname = document.getElementById("firstname").value;
        localStorage.lastname = document.getElementById("lastname").value;
        localStorage.telephone = document.getElementById("telephone").value;
        localStorage.telephone_confirm = document.getElementById("telephone_confirm").value;
        localStorage.dateofbirth = document.getElementById("dateofbirth").value;
        localStorage.address = document.getElementById("address").value;
        localStorage.sex = document.getElementById("sex").value;
        localStorage.cnibnumber = document.getElementById("cnibnumber").value;
        localStorage.cnibnumber_confirm = document.getElementById("cnibnumber_confirm").value;
        localStorage.cnibplaceofissue = document.getElementById("cnibplaceofissue").value;
        localStorage.cnibdateissue = document.getElementById("cnibdateissue").value;
        localStorage.cnibvaliduntil = document.getElementById("cnibvaliduntil").value;
        localStorage.password = document.getElementById("new_pass").value;
        localStorage.password_confirm = document.getElementById("new_pass_confirm").value;
    
    
        window.location.href = "validate_SignIn.html"
    
}
//==========================================================================================================================================
function validateNomDocument(){
    //creating varibles from the textfields and trimming the spaces out
     var nom = (document.getElementById("nomDocument").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (nom != "")
    {
        //setting the textfield back to normal 
        document.getElementById("nomDocumentDiv").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("nomDocumentDiv").className = document.getElementById("nomDocumentDiv").className + " has-error";  // this adds the error class
   return (false);
}
//==========================================================================================================================================
function validateReferenceDocument(){
    //creating varibles from the textfields and trimming the spaces out
     var numeroDocumentDiv = (document.getElementById("referenceDocument").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (numeroDocumentDiv != "")
    {
        //setting the textfield back to normal 
        document.getElementById("numeroDocumentDiv").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("numeroDocumentDiv").className = document.getElementById("numeroDocumentDiv").className + " has-error";  // this adds the error class
   return (false);
}
//==========================================================================================================================================
function validateTypeDocument(){
    //creating varibles from the textfields and trimming the spaces out
     var typeDocumentsDiv = (document.getElementById("typeDocument").value);
    
     //verify that the cnib starts with b and it's 9 character long 
    if (typeDocumentsDiv != "")
    {
        //setting the textfield back to normal 
        document.getElementById("typeDocumentsDiv").className = "col-sm-8";
        return (true);
        
    }
    //setting the textfield as red if there's an error
    document.getElementById("typeDocumentsDiv").className = document.getElementById("typeDocumentsDiv").className + " has-error";  // this adds the error class
   return (false);
}
//==========================================================================================================================================
//validate the telephone as the OTP
function validateOTPTelephone(){
    //creating varibles from the textfields and trimming the spaces out
    var telephone = document.getElementById("otptelephone").value;
    
    if ((telephone.startsWith("226") == true && telephone.length == 11 ))
    {
        //set the value to the trimmed one / eliminates spaces 
        document.getElementById("request-otp").value = telephone;
        localStorage.OTPTelephone = "+" + telephone;
        return (true);
    }else if((telephone.startsWith("226") == false   && telephone.length == 8 )){
        //set the value to the trimmed one / eliminates spaces 
        document.getElementById("telephone").value= "226"+ telephone;
        localStorage.OTPTelephone = "+226"+ telephone;
        return true;
    }
    
    document.getElementById("messageErreur").innerHTML = "Entrez un numéro commençant par 226";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
    });
   return (false);
}
//==========================================================================================================================================
function accountCreated(){
    
    document.getElementById("messageErreur").innerHTML = "Vous êtes connecté.";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
    });
}
//==========================================================================================================================================
//validate the telephone as the user is inputing it 
function validateTelephoneSignIn(){
    //creating varibles from the textfields and trimming the spaces out
    var telephone = (document.getElementById("username").value).replace(/ /g,'');
    
    if ((telephone.startsWith("226") == true && telephone.length == 11 ))
    {
        return true;
    }else if((telephone.startsWith("226") == false   && telephone.length == 8 )){
        //set the value to the trimmed one / eliminates spaces 
        telephone = "226"+ telephone;
        document.getElementById("username").value=telephone;
        return true;
    }
    //setting the textfield as red if there's an error
    document.getElementById("usernameDiv").className = document.getElementById("usernameDiv").className + " has-error";  // this adds the error class
        
    document.getElementById("messageErreur").innerHTML = "Entrez un numéro dans les formats suivants:\n 22670707070 \n ou \n 70707070";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
    });
    
   return (false);
}
//==========================================================================================================================================
//validate the telephone as the user is inputing it 
function modalImage(id){
   var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById(id);
var modalImg = document.getElementById("img1");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}
}
//==========================================================================================================================================
//validate the telephone as the user is inputing it 
function help(){
    
    document.getElementById("messageErreur").innerHTML = "Veuillez contacter le centre d'aide aux numéros suivants:\n (226)01 16 05 05 \n (226)07 83 45 45 \n (226)01 16 12 12";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
    });
}
//==========================================================================================================================================
//validate the telephone as the user is inputing it 
function paymentMethod(){
   if(document.getElementById("paySelection").value == "OM"){
       window.location.href = "payOrange.html";
       
   }else if(document.getElementById("paySelection").value == "MC"){
       
       window.location.href = "paymobicash.html";
   }else if(document.getElementById("paySelection").value == "Coris"){
       
       window.location.href = "payCoris.html";
   }
}
//==========================================================================================================================================
function paymentOnload() {
    
    setUser();
    
   
  document.getElementById("payCode").disabled = true;
    
    //create the div loop-item-title
        var payTitle = document.createElement("H3");
        payTitle.className = "search-main-title";
    
    var payPTitle = document.createElement("p");
        payPTitle.className = "search-top-title";
    
    var extraTab = document.createElement("br");
      
    payTitle.appendChild(document.createTextNode("Postuler au Concours: " + localStorage.getItem("displayName")));
  
    document.getElementById("payTitleDiv").appendChild(extraTab);
    document.getElementById("payTitleDiv").appendChild(payTitle);
    document.getElementById("payTitleDiv").appendChild(payPTitle);
    
    
    //alert("Orange est momentanément indisponible. Veuillez s'il vous plait utiliser Mobicash pour les paiements. Merci.");
    
  
}
//==========================================================================================================================================
function paymentOnloadCoris() {
    
    setUser();
    
   
  document.getElementById("payCode").disabled = true;
  document.getElementById("payButton").disabled = true;
    
    //create the div loop-item-title
        var payTitle = document.createElement("H3");
        payTitle.className = "search-main-title";
    
    var payPTitle = document.createElement("p");
        payPTitle.className = "search-top-title";
    
    var extraTab = document.createElement("br");
      
    payTitle.appendChild(document.createTextNode("Postuler au Concours: " + localStorage.getItem("displayName")));
  
    document.getElementById("payTitleDiv").appendChild(extraTab);
    document.getElementById("payTitleDiv").appendChild(payTitle);
    document.getElementById("payTitleDiv").appendChild(payPTitle);
    
    
    //alert("Orange est momentanément indisponible. Veuillez s'il vous plait utiliser Mobicash pour les paiements. Merci.");
    
  
}
//==========================================================================================================================================
function pinVerification(){
    
    
       document.getElementById("payButton").style.display = "block";
    
    if(document.getElementById("paySelection").value == "MC"){
        //sending the mobicash request
        mobicashOuverture();
        
       document.getElementById("telephoneButton").disabled = true;
        document.getElementById("pinTitle").style.display = "none";
       document.getElementById("telephoneTitle").style.display = "none";
       document.getElementById("telephoneButton").style.display = "none";
       document.getElementById("numeroTitle").style.display = "none";   
        document.getElementById("resendNumber").style.display = "block";
       document.getElementById("payButton").disabled = false;
    }
}
//==========================================================================================================================================
function validateAge(){
    
    var enteredDate = document.getElementById('dateofbirth').value;
  // Below one is the single line logic to calculate the no. of years...
  var years = new Date(new Date() - new Date(enteredDate)).getFullYear() - 1970;
  ////console.log(years);
    
 if(years < 37){
     
     if(document.getElementById('role').value == "Direct"){
         document.getElementById("messageErreur").innerHTML = "Vous devez être âgé de 18 ans minimum et de 37 ans maximum au 31 décembre de l’année en cours.";
     }else  if(document.getElementById('role').value == "Professionnel"){
         document.getElementById("messageErreur").innerHTML = "Vous devez être âgé de 18 ans minimum et de 47 ans maximum au 31 décembre de l’année en cours.";
     }
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
    });
 }

    
}
//==========================================================================================================================================
function validateAgeCandidat(){
    
    var enteredDate = document.getElementById('dateofbirth').value;
    
    //console.log("new date 4 "+enteredDate);
    
    
    var dAge = enteredDate.substring(0, 2);
    var mAge = enteredDate.substring(3, 5);
    var YAge = enteredDate.substring(6);
    
    //reverting the french date to english
    enteredDate = mAge+"-"+dAge+"-"+YAge;
  // Below one is the single line logic to calculate the no. of years...
  var years =Math.abs(new Date().getFullYear() -new Date(enteredDate).getFullYear() );
 // //console.log("new date 1 "+new Date());
 //   //console.log("new date 2 "+new Date(enteredDate));
  //  //console.log("new date 3 "+new Date(new Date() - new Date(enteredDate)) );
    
   // //console.log("new date 4 "+enteredDate);
    
    
    
 if(new Date(enteredDate) == "Invalid Date"){
     
     document.getElementById("messageErreur").innerHTML = "La date entré est invalide.";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
        document.getElementById('dateofbirth').value = "";
    });
 }else if(((years > 37 || years < 18) && (document.getElementById('role').value == "Direct")) ){
     
    document.getElementById("messageErreur").innerHTML = "Vous devez être âgé de 18 ans minimum et de 37 ans maximum au 31 décembre de l’année en cours.";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
        document.getElementById('dateofbirth').value = "";
    });
 }else if((years > 47 || years < 18) && (document.getElementById('role').value == "Professionnel")){
     
    document.getElementById("messageErreur").innerHTML = "Vous devez être âgé de 18 ans minimum et de 47 ans maximum au 31 décembre de l’année en cours.";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
        document.getElementById('dateofbirth').value = "";
    });
 }   ////console.log(years);
}
//==========================================================================================================================================
function validateCNIBDate2(){
    
    var enteredDate = document.getElementById('cnibdateissue').value;
    var enteredDate2 = document.getElementById('cnibvaliduntil').value;
    
   // //console.log("new date 1 "+enteredDate);
  //  //console.log("new date 2 "+enteredDate2);
    
    var issueD = enteredDate.substring(0, 2);
    var issueM = enteredDate.substring(3, 5);
    var issueY = enteredDate.substring(6);
    
    var endD = enteredDate2.substring(0, 2);
    var endM = enteredDate2.substring(3, 5);
    var endY = enteredDate2.substring(6);
    
    //reverting the french date to english
    enteredDate = issueM+"-"+issueD+"-"+issueY;
    
    //reverting the french date to english
    enteredDate2 = endM+"-"+endD+"-"+endY;
    
  // Below one is the single line logic to calculate the no. of years...
  var years =Math.abs(new Date(enteredDate).getFullYear() -new Date(enteredDate2).getFullYear() );
    
    if(years  <= 0) {
    document.getElementById("messageErreur").innerHTML = "Vérifiez les dates de CNIB, les dates fournies sont trop proches.";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
        document.getElementById('dateofbirth').value = "";
    });
 }  
   // //console.log("new date 3 "+enteredDate);
   // //console.log("new date 4 "+enteredDate2);
   // //console.log(years);
}
//==========================================================================================================================================
function closeModal(){
    
             jQuery(document).ready(function ($) {
        $('#errorMessages').modal('hide');
    });
}
//==========================================================================================================================================
function validateDocuments(){
    
    if(document.getElementById("").value == "CNIB" || document.getElementById("").value == "Attestation" || document.getElementById("").value == "Passeport" || document.getElementById("").value == "Diplome"){
        
       document.getElementById("nReference").style.display = "block";
        
       document.getElementById("dDelivrance").style.display = "block";
        
       document.getElementById("dEcheance").style.display = "block";
    }
}
//==========================================================================================================================================
function importDocuments(){
    
    setUser();
    
    document.getElementById("nReference").style.display = "none";
        
    document.getElementById("dDelivrance").style.display = "none";
        
    document.getElementById("dEcheance").style.display = "none";
        
    document.getElementById("pDelivrance").style.display = "none";
    
}
//==========================================================================================================================================
function switchDocuments(){
    
    if(document.getElementById("typeDocument").value == "CNIB" || document.getElementById("typeDocument").value == "Attestation" || document.getElementById("typeDocument").value == "Passeport"){
        
       document.getElementById("nReference").style.display = "block";
        
       document.getElementById("dDelivrance").style.display = "block";
        
       document.getElementById("dEcheance").style.display = "block";
        
      document.getElementById("pDelivrance").style.display = "block";
        
    }else if( document.getElementById("typeDocument").value == "Diplome"){
        
       document.getElementById("nReference").style.display = "block";
        
       document.getElementById("dDelivrance").style.display = "block";
        
       document.getElementById("dEcheance").style.display = "none";
        
      document.getElementById("pDelivrance").style.display = "block";
        
    }else{
        document.getElementById("nReference").style.display = "none";
        
       document.getElementById("dDelivrance").style.display = "none";
        
       document.getElementById("dEcheance").style.display = "none";
        
        document.getElementById("pDelivrance").style.display = "block";
    }
}
//==========================================================================================================================================
function printPageArea(){
    var doc = new jsPDF();
doc.text(10, 10, 'Hello world!');
doc.save('hello-world.pdf');
}
//==========================================================================================================================================
function redirect() {
        window.location = "https://econcours.gov.bf";
}
//==========================================================================================================================================
function redirectConcoursDirect() {
        window.location = "concours.html";
}
//==========================================================================================================================================
function validateAgePolice() {
    var age = document.getElementById("agePolice").value;
    if(age == 25 ){
        alert("Notez: Le candidat est tenu d'avoir 25 au 31 Décembre de l'année courante.");
    }
}
//==========================================================================================================================================
function validateTaillePolice() {
    var taille = document.getElementById("taillePolice").value;
    var sex = localStorage.getItem("sex");
    if(sex == 'M' && taille < 170){
        alert("Il est impossible de postuler a ce concours, il faut avoir au moins 170cm.");
    }else{
        
        //storing the height of the candidate
        localStorage.taille = taille;
    }
}
//==========================================================================================================================================
function validateCNIBDate() {
    var date1 = new Date((document.getElementById("cnibvaliduntil").value).replace(/-/g, '/'));
    var date2 = new Date((document.getElementById("cnibdateissue").value).replace(/-/g, '/'));
    console.log(date1 + " " + date2 + " " + diff_years(date1,date2));
    return diff_years(date1,date2);
}
//==========================================================================================================================================
function diff_years(dt2, dt1){

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));
   
 }
//==========================================================================================================================================
function validateBirthDay(){

    var date2 = new Date((document.getElementById("dateofbirth").value).replace(/-/g, '/'));
    var date1 = new Date();
    
    if(diff_years(date1,date2)<18) 
        alert("la date de naissance doit etre superieur a 18 ans");
   
 }
//==========================================================================================================================================
function validatePasswordSign() {
    var pwd = document.getElementById("new_pass").value;
    if(pwd.length<8){
        alert("Le mot de passe doit avoir un minimum de 8 caractères!");
        return false;
    }else{}
}
//==========================================================================================================================================
function validatePasswordSignConfirm() {
    var pwd = document.getElementById("new_pass_confirm").value;
    if(pwd.length<8){
        alert("La confirmation du mot de passe doit avoir un minimum de 8 caractères!");
        return false;
    }else{}
}
//==========================================================================================================================================
