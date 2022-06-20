//global variables
var concoursPro = [];
var concours = [];
var nomConcours = [];
var nomMinistere = [];
var nomCycle = [];
var nomAcademique = [];
var descriptionConcours = [];
var typeConcours = [];
var dateConcours = [];
var decretConcours = [];
var tempConcoursSave = [];
var dropdownMinistere = "";
var dropdownEtude = "";
var dropdownCycle = "";
var srcRecto;
var srcVerso;
var ministryConcours;
const ministryLength = 60;
var allConcours =[];
var myConcoursID = [];
var myConcoursPaid = [];
var isRecipiceGood = false;

var myConcoursExam = [];
var myExams = "";
var SERVER_URL2 = 'https://burkinaproxy3.herokuapp.com/https://test.fofoafrica.net:4443/api/v1';
//==========================================================================================================================================
// Below function Executes on click of login button.
function login(){
    //api url for login verification
    var url = SERVER_URL2+ '/auth/login';
    
// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    //data.telephone= "+"+document.getElementById("username").value;
    //data.password = document.getElementById("password").value;
    
    
    data.telephone= localStorage.getItem("username");
    data.password = localStorage.getItem("password");
    
    
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
        Origin:'https://econcours.gov.bf',

'Access-Control-Request-Method': 'POST',

'Access-Control-Request-Headers': 'X-Requested-With'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    
    //try catch to get the error sent by the api
    try{
        //setting the session variables
        if (data.code == "200"){ 
            localStorage.userid = data.data.id;
            localStorage.candidat_id = data.data.user_id;
            localStorage.candidatecode = data.data.candidatecode;
            localStorage.firstname = data.data.firstname;
            localStorage.lastname = data.data.lastname;
            localStorage.maidenname = data.data.maidenname;
            localStorage.telephone = data.data.telephone;
            localStorage.dateofbirth = data.data.dateofbirth;
            localStorage.address = data.data.address;
            localStorage.profession = data.data.profession;
            localStorage.sex = data.data.sex;
            localStorage.role = data.role;
            localStorage.cnibnumber = data.data.cnibnumber;
            localStorage.cnibplaceofissue = data.data.cnibplaceofissue;
            localStorage.cnibdateissue = data.data.cnibdateissue;
            localStorage.cnibvaliduntil = data.data.cnibvaliduntil;
            localStorage.title = data.data.title;
            localStorage.access_token = data.access_token;
            
            
            if(localStorage.getItem("profession")=="Direct")  
                window.location = "Candidate_Profile/Concours.html";
            else if(localStorage.getItem("profession")=="Professionnel")
                window.location = "Candidate_Profile/Concours.html";
            
            //returning true 
            return true;
            //verifying if the phone number is not a correct one 
    }else if(data.code == "402"){
        
            alert("Mot de passe invalide");
            window.location.href = "Sign_in.html"; 
            //returning false
            return (false);
    }else if(data.errors.Telephone == "This telephone doesn't match with any user in our Data base"){
        
        //setting the textfield as red if there's an error
        document.getElementById("usernameDiv").className = document.getElementById("usernameDiv").className + " has-error"; 
         window.location.href = "Sign_in.html";
         alert("Aucun compte n'est affilié à ce numéro!");
        return (false);
    }
    }catch(error){
   
            alert("Compte inexistant");
            window.location.href = "Sign_in.html"; 
            //returning false
            return (false);
        
    }
  });
    //loading the list of concours
    getCandidateConcours();
}
//==========================================================================================================================================
// populates user profile.
function loadProfile(){
    
    //setting the user title with his last name at the top once he logs in his account 
    setUser();
    
    //setting the values in the textfield for the users
    document.getElementById("firstname").value = localStorage.getItem("firstname");
    document.getElementById("lastname").value = localStorage.getItem("lastname");
    document.getElementById("telephone").value = localStorage.getItem("telephone");
    document.getElementById("dateofbirth").value = localStorage.getItem("dateofbirth");
    document.getElementById("address").value = localStorage.getItem("address");
    document.getElementById("sex").value = localStorage.getItem("sex");
    document.getElementById("cnibnumber").value = localStorage.getItem("cnibnumber");
    document.getElementById("cnibplaceofissue").value = localStorage.getItem("cnibplaceofissue");
    document.getElementById("cnibdateissue").value = localStorage.getItem("cnibdateissue");
    document.getElementById("cnibvaliduntil").value = localStorage.getItem("cnibvaliduntil");
    
    document.getElementById("candidateID").value = localStorage.getItem("candidatecode");
    
    
         //setting the type of concours he can apply to 
         localStorage.typeConcours =  "Direct";
    
    //verifying the person has a maiden name
    if(localStorage.getItem("sex") == 'F'){
        
         //enabling the textfields for updates
         document.getElementById("maidenname").disabled = false;
    }
    if(document.getElementById("sex").value == "M"){
             localStorage.maidenname = "";
         }
         
  
        document.getElementById("maidenname").value = localStorage.getItem("maidenname") ;
}
//==========================================================================================================================================
// populates user profile.
function loadProfileRecipice(){
    
    //setting the user title with his last name at the top once he logs in his account 
    setUser();
    
    //setting the values in the textfield for the users
    document.getElementById("firstname").value = localStorage.getItem("firstname");
    document.getElementById("lastname").value = localStorage.getItem("lastname");
    document.getElementById("telephone").value = localStorage.getItem("telephone");
    document.getElementById("dateofbirth").value = localStorage.getItem("dateofbirth");
    document.getElementById("address").value = localStorage.getItem("address");
    document.getElementById("sex").value = localStorage.getItem("sex");
    document.getElementById("cnibnumber").value = localStorage.getItem("cnibnumber");
    document.getElementById("cnibplaceofissue").value = localStorage.getItem("cnibplaceofissue");
    document.getElementById("cnibdateissue").value = localStorage.getItem("cnibdateissue");
    document.getElementById("cnibvaliduntil").value = localStorage.getItem("cnibvaliduntil");
    
    document.getElementById("candidateID").value = localStorage.getItem("candidatecode");
    
    
         //setting the type of concours he can apply to 
         localStorage.typeConcours =  "Direct";
    
    //verifying the person has a maiden name
    if(localStorage.getItem("sex") == 'F'){
        
         //enabling the textfields for updates
         document.getElementById("maidenname").disabled = false;
    }
    if(document.getElementById("sex").value == "M"){
             localStorage.maidenname = "";
         }
         
  
        document.getElementById("maidenname").value = localStorage.getItem("maidenname") ;
    createRecepice();
}
//==========================================================================================================================================
// Below function to change user password .
function changePassword(){
    //api url for login verification
    var url = SERVER_URL2+'/password/edit';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.telephone= document.getElementById("telephone").value;
    data.password= document.getElementById("old_pass").value;
    data.new_password = document.getElementById("new_pass").value;
    data.password_confirm = document.getElementById("new_pass_confirm").value;
   
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    
     if(data.code == 200){
         alert("Mot de passe changé!");
     }else{
         alert("Erreur, assurez-vous que les mots de passes concordent!");
     }
  });

}
//==========================================================================================================================================
// Below function to create a new account.
function signUp(){
    //api url for login verification
    var url = SERVER_URL2+'/auth/signup';
    //user credentials
    var user = {login: false};
    
    try{

        // Login  method implementation:
        async function postData(data ={}) {
    
        //setting the value to fetch the api
        data.firstname = (localStorage.getItem("firstname"));
        data.lastname = (localStorage.getItem("lastname"));
        data.telephone = "+"+localStorage.getItem("telephone");
        data.dateofbirth = localStorage.getItem("dateofbirth");
        data.address= localStorage.getItem("address");
        data.matricule = "-";
        data.sex= localStorage.getItem("sex");
        //setting the role to CND all the time
        data.role= "CND";
        data.cnibnumber = localStorage.getItem("cnibnumber");
        data.password = localStorage.getItem("password");
        data.password_confirm = localStorage.getItem("password_confirm");
        data.cnibplaceofissue= localStorage.getItem("cnibplaceofissue");
        data.cnibdateissue= localStorage.getItem("cnibdateissue");
        data.cnibvaliduntil = localStorage.getItem("cnibvaliduntil");
        //setting the profession to direct or professionnal
        data.profession = "Direct";
        data.ministere = "-";
        data.corps = "-";



        if(localStorage.getItem("maidenname") == "" || localStorage.getItem("maidenname") == null)
            data.maidenname = "-";
        else
            data.maidenname = localStorage.getItem("maidenname");


      //fetching values to api for verification
      const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data) 
      });
      //response from the api
      return response.json(); 
    }
    //get data from api after successful login
    postData({ change: true })
      .then(data => {

        //console.log(data);
         if(data.code==201){
             //sending a message if the account has been successfully created 
             alert("Votre compte est créé, veuillez poursuivre avec la connexion!");
             //redirecting to the otp page for confirmation
            window.location.href = "Sign_In.html";  

         }else if(data.errors.Phone == "The telephone is already used"){
             //sending a message if the account has been successfully created 
             alert("Le numéro de téléphone existe déjà, éssayer de vous connecter.");
             //redirecting to the otp page for confirmation
            window.location.href = "Sign_In.html";  
        }else if(data.errors.Email == "The email is already used"){
             //sending a message if the account has been successfully created 
             alert("Le email existe déjà, éssayer de vous connecter.");
             //redirecting to the otp page for confirmation
            window.location.href = "Sign_In.html";  
        }else{
            
        alert("La création du compte à échoué, veuillez reesayer svp. ");
        window.location.href = "enregistrement.html";
        }
    });
    }catch(error){
        alert("La création du compte à échoué, veuillez reesayer svp. ");
        window.location.href = "enregistrement.html";
    }

}
//==========================================================================================================================================
// function to update a user profile 
function updateProfile(){
    
   //api url for login verification
    var url = SERVER_URL2+ '/candidat/update';
    //user credentials
    var user = {login: false};
    //store token
    var token;
    //number of attemps
    
    //storing user password and username
    user.firstname = document.getElementById("firstname").value;
    user.lastname = document.getElementById("lastname").value;
    user.telephone = document.getElementById("telephone").value;
    user.dateofbirth = document.getElementById("dateofbirth").value;
    user.address = document.getElementById("address").value;
    user.profession = document.getElementById("role").value;
    user.sex = document.getElementById("sex").value;
    //user.profilepicture = "test";
    user.role = document.getElementById("role").value;
    //user.password = document.getElementById("new_pass").value;
    user.password_confirm = document.getElementById("new_pass_confirm").value;
    user.cnibplaceofissue = document.getElementById("cnibplaceofissue").value;
    user.cnibdateissue = document.getElementById("cnibdateissue").value;
    user.cnibvaliduntil = document.getElementById("cnibvaliduntil").value;
    user.maidenname = document.getElementById("maidenname").value;
   // user.ministere = document.getElementById("ministere").value;
   // user.corps = document.getElementById("corps").value;
    

    

// Login  method implementation:
async function postData(data ={}) {
    //setting verification data variables
    data.candidat_id= localStorage.getItem("userid");
    data.firstname = user.firstname;
    data.lastname= user.lastname;
    data.telephone = user.telephone;
    data.dateofbirth = user.dateofbirth;
    data.address= user.address;
    data.profession = user.profession;
    data.sex= user.sex;
    data.role= document.getElementById("role").value;
    //data.profilepicture= user.profilepicture;
    data.role= user.role;
    data.cnibnumber = user.cnibnumber;
   // data.password = user.password;
   // data.password_confirm = user.password_confirm;
    data.profilepicture = "null";
    data.cnibplaceofissue= user.cnibplaceofissue;
    data.cnibdateissue= user.cnibdateissue;
    data.cnibvaliduntil = user.cnibvaliduntil;
    data.maidenname = user.maidenname;
   // data.ministere = user.ministere;
  //  data.corps= user.corps;
    
        
    
    
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(response);
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    //console.log(data);
     if(data.code==201){
             
         alert("Profil mise à jour!");
             
             localStorage.firstname = data.data.firstname;
            localStorage.lastname = data.data.lastname;
            localStorage.maidenname = data.data.maidenname;
            localStorage.telephone = data.data.telephone;
            localStorage.dateofbirth = data.data.dateofbirth;
            localStorage.address = data.data.address;
            localStorage.profession = data.data.profession;
            localStorage.sex = data.data.sex;
            localStorage.role = data.role;
            localStorage.cnibnumber = data.data.cnibnumber;
            localStorage.cnibplaceofissue = data.data.cnibplaceofissue;
            localStorage.cnibdateissue = data.data.cnibdateissue;
            localStorage.cnibvaliduntil = data.data.cnibvaliduntil;
         
    if(document.getElementById("sex").value == "M"){
             localStorage.maidenname = "";
         }
         
             window.location.href = "Profil_Candidat.html";
    
     }else{
           
         alert("Erreur, Reessayer!");
     }
  });
}
//==========================================================================================================================================
//Load Concours
// Below function Executes on click of login button.
function loadAllConcours(){
    
    //setting the user
    setUser();
    
   /* if(localStorage.getItem("profession") == "Direct"){
        
        
        document.getElementById("cycle").style.display = "none";
        document.getElementById("etude").style.display = "block";
        loadConcoursDirect();
        
    }else if(localStorage.getItem("profession") == "Professionnel"){
        
        
        document.getElementById("cycle").style.display = "block";
        document.getElementById("etude").style.display = "none";
        loadConcoursPro();
    
    }*/
    
        document.getElementById("cycle").style.display = "none";
        document.getElementById("etude").style.display = "block";
        loadConcoursPro();
}
//==========================================================================================================================================
function loadConcoursPro(){
    
    if(localStorage.getItem("profession")=="Direct"){
    setUser();
    //api url for login verification
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';
    
    concours = [];
    nomConcours = [];
    nomMinistere = [];
    nomCycle = [];
    nomAcademique = [];
    decretConcours = [];
    
    var count = 0;
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    //----- JS CREATE HTML ELEMENT -----//
    concours.length = 0;
    nomMinistere.length = 0;
    var i;
    for (i = 0; i < data.data.length; i++) {
        
         //creating the tags
        //=====================================================================
        //create article div
        var article = document.createElement("article");
        article.className = "noo_job hentry";
        article.id = data.data[i].id;
        //=====================================================================
        //create the div loop-item-wrap
        var divLoopWrap = document.createElement("div");
        divLoopWrap.className = "loop-item-wrap";
        //=====================================================================
        //create the div loop-item-content
        var divLoopContent = document.createElement("div");
        divLoopContent.className = "loop-item-content";
    
        //create the div loop-item-title
        var divLooptitle = document.createElement("H2");
        divLooptitle.className = "loop-item-title";
    
        //create the div title
        var titleTag = document.createElement("a");
        //=====================================================================
        //create the div content-meta
        var contentMeta = document.createElement("p");
        contentMeta.className = "content-meta";
        //=====================================================================
        //ministry name
        var ministry = document.createElement("span");
        ministry.className = "job-company";
        var ministryText = document.createElement("a");
        var ministryIcon = document.createElement("i");
        ministryIcon.className = "fa fa-map-marker";
        //=====================================================================
        //date of concours
        var date = document.createElement("span");
        //=====================================================================
        //date of concours
        var time = document.createElement("time");
        time.className = "entry-date";
        //=====================================================================
        //date of concours
        var divSee = document.createElement("div");
        divSee.className = "show-view-more";
        //=====================================================================
        //button see more 
        var seeMore = document.createElement("a");
        seeMore.className = "btn btn-primary";
        seeMore.href = "Concours_Informations.html";
        seeMore.id = i;
        seeMore.type = "reset";
        seeMore.setAttribute("onclick","saveConcoursInfo("+data.data[i].id+")");
        //=====================================================================
        //button see more 
        var iconDate = document.createElement("i");
        iconDate.setAttribute("class","fa fa-calendar");
        //=====================================================================
        //ministry name
        var niveauEtude = document.createElement("span");
        niveauEtude.className = "job-company";
        var niveauEtudeText = document.createElement("a");
        var niveauEtudeIcon = document.createElement("i");
        niveauEtudeIcon.className = "fa fa-graduation-cap";
        //=====================================================================
        //ministry name
        var niveauCycle = document.createElement("span");
        niveauCycle.className = "job-company";
        var niveauCycleText = document.createElement("a");
        var niveauCycleIcon = document.createElement("i");
        niveauCycleIcon.className = "fa fa-repeat";
        //=====================================================================
        var spaceConcours = document.createElement("br");
        //creating image 
       // var imageFeatured = document.createElement("item-featured");
        //var aImgage = document.createElement("a");
       // var image = document.createElement("img");
        //image.width = "50";
        //image.height = "50";
        //image.src = "../images/BF.png";
        //setting the div ids 
        //=====================================================================
        
        //=====================================================================
        //adding the values concours values
        //=====================================================================
        //conocours name tree
        titleTag.appendChild(document.createTextNode(data.data[i].displayname));
        divLooptitle.appendChild(titleTag);
        
        //minstry name tree
        ministryText.appendChild(document.createTextNode("MEA"));
        ministry.appendChild(ministryIcon);
        ministry.appendChild(ministryText);
        
        
        
            niveauEtudeText.appendChild(document.createTextNode("LICENCE"));
        
        niveauEtude.appendChild(niveauEtudeIcon);
        niveauEtude.appendChild(niveauEtudeText);
        
        //cycle level
        niveauCycleText.appendChild(document.createTextNode("CYCLE A"));
        niveauCycle.appendChild(niveauCycleIcon);
        niveauCycle.appendChild(niveauCycleText);
        
        //date tree 
        time.appendChild(iconDate);
        //time.appendChild(document.createTextNode(data.data[i].date));
        time.appendChild(document.createTextNode("Fermeture le 26-02-2021"));
        date.appendChild(time);
        
        //button tree
        seeMore.appendChild(document.createTextNode("Voir"));
        divSee.appendChild(seeMore);
        
        contentMeta.appendChild(ministry);
        contentMeta.appendChild(niveauEtude);
        contentMeta.appendChild(niveauCycle);
        contentMeta.appendChild(date);
        
        divLoopContent.appendChild(divLooptitle);
        divLoopContent.appendChild(contentMeta);
      
        divLoopWrap.appendChild(divLoopContent);
        divLoopWrap.appendChild(divSee);
        
        article.appendChild(divLoopWrap);
        
        nomConcours.push(data.data[i].displayname);
        nomMinistere.push(data.data[i].ministere);
        //nomAcademique.push(data.data[i].degree);
        nomAcademique.push("À venir");
        //nomCycle.push(data.data[i].cycle);
        nomCycle.push("Cycle A");
        descriptionConcours.push(data.data[i].description);
        //typeConcours.push("Cycle A");
        typeConcours.push(data.data[i].type);
        dateConcours.push(data.data[i].date);
        
          
        decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/ING_GEN_RUR_COMPL_MEA_2021.pdf");
        
        
        
        //adding concours to array
        concours.push(article);
        
            concoursPro.push(data.data[i].id);
        
        if(data.data[i].id ==421){
            
            count++;
            //console.log(count);
        //console.log("I: "+ i +" Data ID:" +data.data[i].id + " : "+ concoursPro[i]+ " : "+ concoursPro.length) ;
        document.getElementById("wrap-concours").appendChild(article); 
        //=====================================================================
        
        }
        }
            console.log(count);
});
        //=====================================================================
        //create the div loop-item-wrap
        var concoursH3Title = document.createElement("h3");
        concoursH3Title.appendChild(document.createTextNode("Liste des concours directs: 1 concours"));
        //concoursH3Title.appendChild(document.createTextNode("Liste des concours sur mesures nouvelles: 15 concours"));
        //=====================================================================
        
        document.getElementById("concoursDivTitle").appendChild(concoursH3Title); 
    }
}
//==========================================================================================================================================
//Load Concours
// Below function Executes on click of login button.
function loadConcoursDirect(){
    
    setUser();
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';
    
    //console.log(localStorage.getItem("typeConcours"));
    concours = [];
    nomConcours = [];
    nomMinistere = [];
    nomCycle = [];
    nomAcademique = [];
    //console.log("Concours Direct");
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    //----- JS CREATE HTML ELEMENT -----//
    var i;
    var count = 0;
    concours.length = 0;
    for (i = 0; i < data.data.length; i++) {
        if(((data.data[i].type).toLowerCase()).search("direct")>=0){
        //creating the tags
        //=====================================================================
        //create article div
        var article = document.createElement("article");
        article.className = "noo_job hentry";
        article.id = count;
        //=====================================================================
        //create the div loop-item-wrap
        var divLoopWrap = document.createElement("div");
        divLoopWrap.className = "loop-item-wrap";
        //=====================================================================
        //create the div loop-item-content
        var divLoopContent = document.createElement("div");
        divLoopContent.className = "loop-item-content";
    
        //create the div loop-item-title
        var divLooptitle = document.createElement("H2");
        divLooptitle.className = "loop-item-title";
    
        //create the div title
        var titleTag = document.createElement("a");
        //=====================================================================
        //create the div content-meta
        var contentMeta = document.createElement("p");
        contentMeta.className = "content-meta";
        //=====================================================================
        //ministry name
        var ministry = document.createElement("span");
        ministry.className = "job-company";
        var ministryText = document.createElement("a");
        var ministryIcon = document.createElement("i");
        ministryIcon.className = "fa fa-map-marker";
        //=====================================================================
        //date of concours
        var date = document.createElement("span");
        //=====================================================================
        //date of concours
        var time = document.createElement("time");
        time.className = "entry-date";
        //=====================================================================
        //date of concours
        var divSee = document.createElement("div");
        divSee.className = "show-view-more";
        //=====================================================================
        //button see more 
        var seeMore = document.createElement("a");
        seeMore.className = "btn btn-primary";
        seeMore.href = "Concours_Informations.html";
        seeMore.id = i;
        seeMore.type = "reset";
        seeMore.setAttribute("onclick","saveConcoursInfo("+count+")");
        //=====================================================================
        //button see more 
        var iconDate = document.createElement("i");
        iconDate.setAttribute("class","fa fa-calendar");
        //=====================================================================
        //ministry name
        var niveauEtude = document.createElement("span");
        niveauEtude.className = "job-company";
        var niveauEtudeText = document.createElement("a");
        var niveauEtudeIcon = document.createElement("i");
        niveauEtudeIcon.className = "fa fa-graduation-cap";
        //=====================================================================
        //ministry name
        var niveauCycle = document.createElement("span");
        niveauCycle.className = "job-company";
        var niveauCycleText = document.createElement("a");
        var niveauCycleIcon = document.createElement("i");
        niveauCycleIcon.className = "fa fa-repeat";
        //=====================================================================
        var spaceConcours = document.createElement("br");
        //creating image 
       // var imageFeatured = document.createElement("item-featured");
        //var aImgage = document.createElement("a");
       // var image = document.createElement("img");
        //image.width = "50";
        //image.height = "50";
        //image.src = "../images/BF.png";
        //setting the div ids 
        //=====================================================================
        
        //=====================================================================
        //adding the values concours values
        //=====================================================================
        //conocours name tree
        titleTag.appendChild(document.createTextNode(data.data[i].displayname));
        divLooptitle.appendChild(titleTag);
        
        //minstry name tree
        ministryText.appendChild(document.createTextNode(data.data[i].ministereacronyme));
        ministry.appendChild(ministryIcon);
        ministry.appendChild(ministryText);
        
        //study level
        if(data.data[i].degree === " ")
            niveauEtudeText.appendChild(document.createTextNode("MULTIPLES"));
        else
        niveauEtudeText.appendChild(document.createTextNode(data.data[i].degree));
        niveauEtude.appendChild(niveauEtudeIcon);
        niveauEtude.appendChild(niveauEtudeText);
        
        //cycle level
        niveauCycleText.appendChild(document.createTextNode(data.data[i].cycle));
        niveauCycle.appendChild(niveauCycleIcon);
        niveauCycle.appendChild(niveauCycleText);
        
        //date tree 
        time.appendChild(iconDate);
        //time.appendChild(document.createTextNode(data.data[i].date));
        time.appendChild(document.createTextNode("Fermeture le 07-10-2021"));
        date.appendChild(time);
        
        //button tree
        seeMore.appendChild(document.createTextNode("Voir"));
        divSee.appendChild(seeMore);
        
        contentMeta.appendChild(ministry);
        contentMeta.appendChild(niveauEtude);
        contentMeta.appendChild(niveauCycle);
        contentMeta.appendChild(date);
        
        divLoopContent.appendChild(divLooptitle);
        divLoopContent.appendChild(contentMeta);
      
        divLoopWrap.appendChild(divLoopContent);
        divLoopWrap.appendChild(divSee);
        
        article.appendChild(divLoopWrap);
        
        nomConcours.push(data.data[i].displayname);
        nomMinistere.push(data.data[i].ministere);
        nomAcademique.push(data.data[i].degree);
        nomCycle.push(data.data[i].cycle);
        descriptionConcours.push(data.data[i].description);
        typeConcours.push(data.data[i].type);
        dateConcours.push(data.data[i].date);
        
        
        //adding concours to array
        //concours.push(article);
        //*****desactiver pour les concours directs soit visibles*****//
        //document.getElementById("wrap-concours").appendChild(article);  
        //=====================================================================
        count++;
            //console.log(count);
    }
    }
});
        //=====================================================================
        //create the div loop-item-wrap
        var concoursH3Title = document.createElement("h3");
        concoursH3Title.appendChild(document.createTextNode("Les concours directs ne sont pas encore en vigueur"));
       // concoursH3Title.appendChild(document.createTextNode("Liste des concours directs: 80 concours"));
        //=====================================================================
        
        document.getElementById("concoursDivTitle").appendChild(concoursH3Title); 
}
//==========================================================================================================================================
function loadConcoursProAcceuil(){
    
   
    //api url for login verification
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';
    
    concours = [];
    nomConcours = [];
    nomMinistere = [];
    nomCycle = [];
    nomAcademique = [];
    decretConcours = [];
    
    var count = 0;
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    //----- JS CREATE HTML ELEMENT -----//
    concours.length = 0;
    nomMinistere.length = 0;
    var i;
    for (i = 0; i < data.data.length; i++) {
        //creating the tags
        //=====================================================================
        //create article div
        var article = document.createElement("article");
        article.className = "noo_job hentry";
        article.id = count;
        //=====================================================================
        //create the div loop-item-wrap
        var divLoopWrap = document.createElement("div");
        divLoopWrap.className = "loop-item-wrap";
        //=====================================================================
        //create the div loop-item-content
        var divLoopContent = document.createElement("div");
        divLoopContent.className = "loop-item-content";
    
        //create the div loop-item-title
        var divLooptitle = document.createElement("H2");
        divLooptitle.className = "loop-item-title";
    
        //create the div title
        var titleTag = document.createElement("a");
        //=====================================================================
        //create the div content-meta
        var contentMeta = document.createElement("p");
        contentMeta.className = "content-meta";
        //=====================================================================
        //ministry name
        var ministry = document.createElement("span");
        ministry.className = "job-company";
        var ministryText = document.createElement("a");
        var ministryIcon = document.createElement("i");
        ministryIcon.className = "fa fa-map-marker";
        //=====================================================================
        //date of concours
        var date = document.createElement("span");
        //=====================================================================
        //date of concours
        var time = document.createElement("time");
        time.className = "entry-date";
        //=====================================================================
        //date of concours
        var divSee = document.createElement("div");
        divSee.className = "show-view-more";
        //=====================================================================
        //button see more 
        var seeMore = document.createElement("a");
        seeMore.className = "btn btn-primary";
        seeMore.href = "Concours_Informations.html";
        seeMore.id = i;
        seeMore.type = "reset";
        seeMore.setAttribute("onclick","saveConcoursInfo("+i+")");
        //=====================================================================
        //button see more 
        var iconDate = document.createElement("i");
        iconDate.setAttribute("class","fa fa-calendar");
        //=====================================================================
        //ministry name
        var niveauEtude = document.createElement("span");
        niveauEtude.className = "job-company";
        var niveauEtudeText = document.createElement("a");
        var niveauEtudeIcon = document.createElement("i");
        niveauEtudeIcon.className = "fa fa-graduation-cap";
        //=====================================================================
        //ministry name
        var niveauCycle = document.createElement("span");
        niveauCycle.className = "job-company";
        var niveauCycleText = document.createElement("a");
        var niveauCycleIcon = document.createElement("i");
        niveauCycleIcon.className = "fa fa-repeat";
        //=====================================================================
        var spaceConcours = document.createElement("br");
        //creating image 
       // var imageFeatured = document.createElement("item-featured");
        //var aImgage = document.createElement("a");
       // var image = document.createElement("img");
        //image.width = "50";
        //image.height = "50";
        //image.src = "../images/BF.png";
        //setting the div ids 
        //=====================================================================
        
        //=====================================================================
        //adding the values concours values
        //=====================================================================
        //conocours name tree
        titleTag.appendChild(document.createTextNode(data.data[i].displayname));
        divLooptitle.appendChild(titleTag);
        
        //minstry name tree
        ministryText.appendChild(document.createTextNode("À Venir"));
        ministry.appendChild(ministryIcon);
        ministry.appendChild(ministryText);
        
        //study level
        if(data.data[i].degree === " ")
            niveauEtudeText.appendChild(document.createTextNode("MULTIPLES"));
        else
        niveauEtudeText.appendChild(document.createTextNode("À Venir"));
       // niveauEtude.appendChild(niveauEtudeIcon);
        //niveauEtude.appendChild(niveauEtudeText);
        
        //cycle level
        niveauCycleText.appendChild(document.createTextNode("Cycle A"));
        niveauCycle.appendChild(niveauCycleIcon);
        niveauCycle.appendChild(niveauCycleText);
        
        //date tree 
        time.appendChild(iconDate);
        //time.appendChild(document.createTextNode(data.data[i].date));
        time.appendChild(document.createTextNode("Fermeture le 21-01-2021"));
        date.appendChild(time);
        
        //button tree
        seeMore.appendChild(document.createTextNode("Voir"));
        divSee.appendChild(seeMore);
        
        contentMeta.appendChild(ministry);
        contentMeta.appendChild(niveauEtude);
        contentMeta.appendChild(niveauCycle);
        contentMeta.appendChild(date);
        
        divLoopContent.appendChild(divLooptitle);
        divLoopContent.appendChild(contentMeta);
      
        divLoopWrap.appendChild(divLoopContent);
        divLoopWrap.appendChild(divSee);
        
        article.appendChild(divLoopWrap);
        
        nomConcours.push(data.data[i].displayname);
        nomMinistere.push(data.data[i].ministere);
        //nomAcademique.push(data.data[i].degree);
        nomAcademique.push("À venir");
        //nomCycle.push(data.data[i].cycle);
        nomCycle.push("Cycle A");
        descriptionConcours.push(data.data[i].description);
        //typeConcours.push("Cycle A");
        typeConcours.push(data.data[i].type);
        dateConcours.push(data.data[i].date);
        
          
        decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/ING_GEN_RUR_COMPL_MEA_2021.pdf");
        
        
        
        //adding concours to array
        concours.push(article);
        
            concoursPro.push(data.data[i].id);
        
        if(data.data[i].type =="Concours Pro" || data.data[i].type =="PROFESSIONNEL"){
            
            count++;
            console.log(count);
        //console.log("I: "+ i +" Data ID:" +data.data[i].id + " : "+ concoursPro[i]+ " : "+ concoursPro.length) ;
        document.getElementById("wrap-concours").appendChild(article); 
        //=====================================================================
        
        }
        }
            console.log(count);
});
        //=====================================================================
        //create the div loop-item-wrap
        var concoursH3Title = document.createElement("h3");
        concoursH3Title.appendChild(document.createTextNode("Liste des concours Professionnels: 163 concours"));
        //concoursH3Title.appendChild(document.createTextNode("Liste des concours sur mesures nouvelles: 15 concours"));
        //=====================================================================
        
        document.getElementById("concoursDivTitle").appendChild(concoursH3Title); 
    
}
//==========================================================================================================================================
//Load Concours
// Below function Executes on click of login button.
function loadConcoursDirectAcceuil(){
    
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';

    concours = [];
    nomConcours = [];
    nomMinistere = [];
    nomCycle = [];
    nomAcademique = [];
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    //----- JS CREATE HTML ELEMENT -----//
    var i;
    var count = 0;
    concours.length = 0;
    
    for (i = 0; i < data.data.length; i++) {
        if(((data.data[i].type).toLowerCase()).search("direct")>=0){
            
        //creating the tags
        //=====================================================================
        //create article div
        var article = document.createElement("article");
        article.className = "noo_job hentry";
        article.id = count;
        //=====================================================================
        //create the div loop-item-wrap
        var divLoopWrap = document.createElement("div");
        divLoopWrap.className = "loop-item-wrap";
        //=====================================================================
        //create the div loop-item-content
        var divLoopContent = document.createElement("div");
        divLoopContent.className = "loop-item-content";
    
        //create the div loop-item-title
        var divLooptitle = document.createElement("H2");
        divLooptitle.className = "loop-item-title";
    
        //create the div title
        var titleTag = document.createElement("a");
        //=====================================================================
        //create the div content-meta
        var contentMeta = document.createElement("p");
        contentMeta.className = "content-meta";
        //=====================================================================
        //ministry name
        var ministry = document.createElement("span");
        ministry.className = "job-company";
        var ministryText = document.createElement("a");
        var ministryIcon = document.createElement("i");
        ministryIcon.className = "fa fa-map-marker";
        //=====================================================================
        //date of concours
        var date = document.createElement("span");
        //=====================================================================
        //date of concours
        var time = document.createElement("time");
        time.className = "entry-date";
        //=====================================================================
        //date of concours
        var divSee = document.createElement("div");
        divSee.className = "show-view-more";
        //=====================================================================
        //button see more 
        var seeMore = document.createElement("a");
        seeMore.className = "btn btn-primary";
        seeMore.href = "Concours_Informations.html";
        seeMore.id = i;
        seeMore.type = "reset";
        seeMore.setAttribute("onclick","saveConcoursInfo("+count+")");
        //=====================================================================
        //button see more 
        var iconDate = document.createElement("i");
        iconDate.setAttribute("class","fa fa-calendar");
        //=====================================================================
        //ministry name
        var niveauEtude = document.createElement("span");
        niveauEtude.className = "job-company";
        var niveauEtudeText = document.createElement("a");
        var niveauEtudeIcon = document.createElement("i");
        niveauEtudeIcon.className = "fa fa-graduation-cap";
        //=====================================================================
        //ministry name
        var niveauCycle = document.createElement("span");
        niveauCycle.className = "job-company";
        var niveauCycleText = document.createElement("a");
        var niveauCycleIcon = document.createElement("i");
        niveauCycleIcon.className = "fa fa-repeat";
        //=====================================================================
        var spaceConcours = document.createElement("br");
        //creating image 
       // var imageFeatured = document.createElement("item-featured");
        //var aImgage = document.createElement("a");
       // var image = document.createElement("img");
        //image.width = "50";
        //image.height = "50";
        //image.src = "../images/BF.png";
        //setting the div ids 
        //=====================================================================
        
        //=====================================================================
        //adding the values concours values
        //=====================================================================
        //conocours name tree
        titleTag.appendChild(document.createTextNode(data.data[i].displayname));
        divLooptitle.appendChild(titleTag);
        
        //minstry name tree
        ministryText.appendChild(document.createTextNode(data.data[i].ministereacronyme));
        ministry.appendChild(ministryIcon);
        ministry.appendChild(ministryText);
        
        //study level
        if(data.data[i].degree === " ")
            niveauEtudeText.appendChild(document.createTextNode("DIVERS"));
        else
        niveauEtudeText.appendChild(document.createTextNode(data.data[i].degree));
        niveauEtude.appendChild(niveauEtudeIcon);
        niveauEtude.appendChild(niveauEtudeText);
        
        //cycle level
        niveauCycleText.appendChild(document.createTextNode(data.data[i].cycle));
        niveauCycle.appendChild(niveauCycleIcon);
        niveauCycle.appendChild(niveauCycleText);
        
        //date tree 
        time.appendChild(iconDate);
        //time.appendChild(document.createTextNode(data.data[i].date));
        time.appendChild(document.createTextNode("Fermeture le 07-10-2021"));
        date.appendChild(time);
        
        //button tree
        seeMore.appendChild(document.createTextNode("Voir"));
        divSee.appendChild(seeMore);
        
        contentMeta.appendChild(ministry);
        contentMeta.appendChild(niveauEtude);
        contentMeta.appendChild(niveauCycle);
        contentMeta.appendChild(date);
        
        divLoopContent.appendChild(divLooptitle);
        divLoopContent.appendChild(contentMeta);
      
        divLoopWrap.appendChild(divLoopContent);
        divLoopWrap.appendChild(divSee);
        
        article.appendChild(divLoopWrap);
        
        nomConcours.push(data.data[i].displayname);
        nomMinistere.push(data.data[i].ministere);
        nomAcademique.push(data.data[i].degree);
        nomCycle.push(data.data[i].cycle);
        descriptionConcours.push(data.data[i].description);
        typeConcours.push(data.data[i].type);
        dateConcours.push(data.data[i].date);
        
        
        //adding concours to array
        concours.push(article);
        
        document.getElementById("wrap-concours").appendChild(article); 
        //=====================================================================
        count++;
    }
    }
    //console.log(count);
});
        
        //localStorage.setItem("quentinTarantino", JSON.stringify(movies));
}
//==========================================================================================================================================
//Load Concours
// Below function Executes on click of login button.
function loadAllConcoursAcceuil(){
   
    
    document.getElementById("wrap-concours").innerHTML="";
    
    if(document.getElementById("search-type").value == "Directs"){
        
        document.getElementById("concoursTitlesConcours").textContent="Liste des concours directs: 83 concours";
        document.getElementById("cycle").style.display = "none";
        document.getElementById("etude").style.display = "block";
        loadConcoursDirectAcceuil();
        
    }else if(document.getElementById("search-type").value == "Professionnels"){
        
        document.getElementById("concoursTitlesConcours").textContent="Liste des concours professionnels: 210 concours";
        document.getElementById("cycle").style.display = "block";
        document.getElementById("etude").style.display = "none";
        loadConcoursProAcceuil();
        
        
    }else{
        
        
        document.getElementById("concoursTitlesConcours").textContent="Liste des concours: 291 concours";
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';

    concours = [];
    nomConcours = [];
    nomMinistere = [];
    nomCycle = [];
    nomAcademique = [];
    decretConcours = [];
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    //----- JS CREATE HTML ELEMENT -----//
    concours.length = 0;
    var i;
    for (i = 0; i < data.data.length; i++) {
        //creating the tags
        //=====================================================================
        //create article div
        var article = document.createElement("article");
        article.className = "noo_job hentry";
        article.id = i;
        //=====================================================================
        //create the div loop-item-wrap
        var divLoopWrap = document.createElement("div");
        divLoopWrap.className = "loop-item-wrap";
        //=====================================================================
        //create the div loop-item-content
        var divLoopContent = document.createElement("div");
        divLoopContent.className = "loop-item-content";
    
        //create the div loop-item-title
        var divLooptitle = document.createElement("H2");
        divLooptitle.className = "loop-item-title";
    
        //create the div title
        var titleTag = document.createElement("a");
        //=====================================================================
        //create the div content-meta
        var contentMeta = document.createElement("p");
        contentMeta.className = "content-meta";
        //=====================================================================
        //ministry name
        var ministry = document.createElement("span");
        ministry.className = "job-company";
        var ministryText = document.createElement("a");
        var ministryIcon = document.createElement("i");
        ministryIcon.className = "fa fa-map-marker";
        //=====================================================================
        //date of concours
        var date = document.createElement("span");
        //=====================================================================
        //date of concours
        var time = document.createElement("time");
        time.className = "entry-date";
        //=====================================================================
        //date of concours
        var divSee = document.createElement("div");
        divSee.className = "show-view-more";
        //=====================================================================
        //button see more 
        var seeMore = document.createElement("a");
        seeMore.className = "btn btn-primary";
        seeMore.href = "Concours_Informations.html";
        seeMore.id = i;
        seeMore.type = "reset";
        seeMore.setAttribute("onclick","saveConcoursInfo("+i+")");
        //=====================================================================
        //button see more 
        var iconDate = document.createElement("i");
        iconDate.setAttribute("class","fa fa-calendar");
        //=====================================================================
        //ministry name
        var niveauEtude = document.createElement("span");
        niveauEtude.className = "job-company";
        var niveauEtudeText = document.createElement("a");
        var niveauEtudeIcon = document.createElement("i");
        niveauEtudeIcon.className = "fa fa-graduation-cap";
        //=====================================================================
        //ministry name
        var niveauCycle = document.createElement("span");
        niveauCycle.className = "job-company";
        var niveauCycleText = document.createElement("a");
        var niveauCycleIcon = document.createElement("i");
        niveauCycleIcon.className = "fa fa-repeat";
        //=====================================================================
        var spaceConcours = document.createElement("br");
        //creating image 
       // var imageFeatured = document.createElement("item-featured");
        //var aImgage = document.createElement("a");
       // var image = document.createElement("img");
        //image.width = "50";
        //image.height = "50";
        //image.src = "../images/BF.png";
        //setting the div ids 
        //=====================================================================
        
        //=====================================================================
        //adding the values concours values
        //=====================================================================
        //conocours name tree
        titleTag.appendChild(document.createTextNode(data.data[i].displayname));
        divLooptitle.appendChild(titleTag);
        
        //minstry name tree
        ministryText.appendChild(document.createTextNode(data.data[i].ministereacronyme));
        ministry.appendChild(ministryIcon);
        ministry.appendChild(ministryText);
        
        //study level
        if(data.data[i].degree === " ")
            niveauEtudeText.appendChild(document.createTextNode("MULTIPLES"));
        else
        niveauEtudeText.appendChild(document.createTextNode(data.data[i].degree));
        niveauEtude.appendChild(niveauEtudeIcon);
        niveauEtude.appendChild(niveauEtudeText);
        
        //cycle level
        niveauCycleText.appendChild(document.createTextNode(data.data[i].cycle));
        niveauCycle.appendChild(niveauCycleIcon);
        niveauCycle.appendChild(niveauCycleText);
        
        //date tree 
        time.appendChild(iconDate);
        //time.appendChild(document.createTextNode(data.data[i].date));
        time.appendChild(document.createTextNode("Fermeture le 07-10-2021"));
        date.appendChild(time);
        
        //button tree
        seeMore.appendChild(document.createTextNode("Voir"));
        divSee.appendChild(seeMore);
        
        contentMeta.appendChild(ministry);
        contentMeta.appendChild(niveauEtude);
        contentMeta.appendChild(niveauCycle);
        contentMeta.appendChild(date);
        
        divLoopContent.appendChild(divLooptitle);
        divLoopContent.appendChild(contentMeta);
      
        divLoopWrap.appendChild(divLoopContent);
        divLoopWrap.appendChild(divSee);
        
        article.appendChild(divLoopWrap);
        
        nomConcours.push(data.data[i].displayname);
        nomMinistere.push(data.data[i].ministere);
        nomAcademique.push(data.data[i].degree);
        nomCycle.push(data.data[i].cycle);
        descriptionConcours.push(data.data[i].description);
        typeConcours.push(data.data[i].type);
        dateConcours.push(data.data[i].date);
        decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/"+data.data[i].reference+".pdf");
        
        
        //adding concours to array
        concours.push(article);
        
        document.getElementById("wrap-concours").appendChild(article); 
        //=====================================================================
        ////console.log(concours.length);
    }
});
    }
}
//==========================================================================================================================================
function saveConcoursInfo(id){    
    id=id-1;
    localStorage.displayName = nomConcours[id];
    localStorage.ministereConcours = nomMinistere[id];
    localStorage.type = typeConcours[id];
    localStorage.description = descriptionConcours[id];
    localStorage.date = dateConcours[id];
    localStorage.concoursID = id+1;
    localStorage.degree = nomAcademique[id];
    localStorage.cycle = nomCycle[id];
   // localStorage.decretPDF = decretConcours[id];
   localStorage.decretPDF = "https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/ING_GEN_RUR_COMPL_MEA_2021.pdf";
    
}
//==========================================================================================================================================
function loadConcoursInfo(){
    
    //setting the user 
    setUser();
    
    //setting the variable paylater to false if he comes on a concours
    localStorage.payLater = "false";
    
    //creating the tags
    //=====================================================================    
    var pageHeading = document.createElement("div");
    pageHeading.className = "page-heading-info";
    
    var pageTitle = document.createElement("h1");
    pageTitle.className = "page-title";
    
    var pageSubHeading = document.createElement("div");
    pageSubHeading.className = "page-sub-heading-info";
    
    var contentMeta = document.createElement("p");
    contentMeta.className = "content-meta";
    
    var date = document.createElement("span");
    
    var time = document.createElement("time");
    time.className = "entry-date";
    time.setAttribute("datetime","2015-08-10T09:46:53+00:00");
    
    var iconTime = document.createElement("i");
    iconTime.className = "fa fa-calendar";
    
    var print = document.createElement("span");
    
    var printtext = document.createElement("a");
    printtext.href = "#";
    
    var printIcon = document.createElement("i");
    printIcon.classname = "fa fa-print";
    printtext.addEventListener("click", function() {window.open(localStorage.getItem("decretPDF"), '_blank');});
    
    var colone = document.createElement("div");
    colone.className = "noo-main col-md-8";
    
    var job = document.createElement("div");
    job.className = "job-desc";
    
    var communique = document.createElement("h3");
    
    var comuniqueText = document.createElement("P");
    
    var description = document.createElement("h3");
    
    var descriptionText = document.createElement("P");
    
    var howApply = document.createElement("h3");
    
    var howApplyDescription = document.createElement("P");
    
    var pretRequit = document.createElement("h3");
    
    var pretRequitOL = document.createElement("ol");
    
    var pretRequitli = document.createElement("P");
    
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "job-action";
    //buttonDiv.href = "Center.html"; 
    
    
    var buttonText3 = document.createElement("a");
    buttonText3.className = "btn btn-success";
    buttonText3.setAttribute("onclick","payLater()");
    
    var buttonText2 = document.createElement("a");
    buttonText2.className = "btn btn-primary";
    buttonText2.href = "concours.html"
    
    var buttonText = document.createElement("a");
    buttonText.className = "btn btn-danger";
    buttonText.setAttribute("onclick","applyType()");
    //buttonText.href = "Center.html";
    
    
    var ministryDiv = document.createElement("span");
    var ministryText = document.createElement("a");
    var ministryIcon = document.createElement("i");
    ministryIcon.className = "fa fa-map-marker";
    
    
    //ministry name
    var niveauEtude = document.createElement("span");
    niveauEtude.className = "job-company";
    var niveauEtudeText = document.createElement("a");
    var niveauEtudeIcon = document.createElement("i");
    niveauEtudeIcon.className = "fa fa-graduation-cap";
    //=====================================================================
    //ministry name
    var niveauCycle = document.createElement("span");
    niveauCycle.className = "job-company";
    var niveauCycleText = document.createElement("a");
    var niveauCycleIcon = document.createElement("i");
    niveauCycleIcon.className = "fa fa-repeat";
    //=====================================================================
    
    //study level
    //niveauEtudeText.appendChild(document.createTextNode(localStorage.getItem("degree")));
    niveauEtudeText.appendChild(document.createTextNode("LICENCE"));
    niveauEtude.appendChild(niveauEtudeIcon);
    niveauEtude.appendChild(niveauEtudeText);
        
    //cycle level
    //niveauCycleText.appendChild(document.createTextNode(localStorage.getItem("cycle")));
    niveauCycleText.appendChild(document.createTextNode("CYCLE A"));
    niveauCycle.appendChild(niveauCycleIcon);
    niveauCycle.appendChild(niveauCycleText);
    
    
   // ministryText.appendChild(document.createTextNode(localStorage.getItem("ministereConcours")));
    ministryText.appendChild(document.createTextNode("MEA"));
    ministryDiv.appendChild(ministryIcon);
    ministryDiv.appendChild(ministryText);
    
    //creating tag tree
    //pageTitle.appendChild(document.createTextNode(localStorage.getItem("displayName")));
    pageTitle.appendChild(document.createTextNode("Ingénieur du Génie Rural"));
    pageHeading.appendChild(pageTitle);
    
    time.appendChild(iconTime);
    time.appendChild(document.createTextNode("Fermeture le 26-02-2021"));
    date.appendChild(time);
    
    
    printIcon.appendChild(document.createTextNode("Imprimer"));
    printtext.appendChild(printIcon);
    print.appendChild(printtext);
    
    contentMeta.appendChild(ministryDiv);
    contentMeta.appendChild(niveauEtude);
    contentMeta.appendChild(niveauCycle);
    contentMeta.appendChild(date);
    contentMeta.appendChild(print);
    
    pageSubHeading.appendChild(contentMeta);
    
    buttonText.appendChild(document.createTextNode("INSCRIPTION ET PAYEMENT"));
   // buttonText3.appendChild(document.createTextNode("INSCRIPTION ET PAYEMENT ULTÉRIEUR"));
    
    buttonText3.style.color = "white";
    buttonText.style.color = "white";
    
    buttonDiv.appendChild(buttonText);
  //  buttonDiv.appendChild(buttonText3);
    
    
    colone.appendChild(job);
    colone.appendChild(buttonDiv);
    
    document.getElementById("row").appendChild(pageHeading);
    document.getElementById("row").appendChild(pageSubHeading);
    document.getElementById("apply").appendChild(colone);
    

}
//==========================================================================================================================================
function loadConcoursInfoAcceuil(){
    
    //creating the tags
    //=====================================================================    
    var pageHeading = document.createElement("div");
    pageHeading.className = "page-heading-info";
    
    var pageTitle = document.createElement("h1");
    pageTitle.className = "page-title";
    
    var pageSubHeading = document.createElement("div");
    pageSubHeading.className = "page-sub-heading-info";
    
    var contentMeta = document.createElement("p");
    contentMeta.className = "content-meta";
    
    var date = document.createElement("span");
    
    var time = document.createElement("time");
    time.className = "entry-date";
    time.setAttribute("datetime","2015-08-10T09:46:53+00:00");
    
    var iconTime = document.createElement("i");
    iconTime.className = "fa fa-calendar";
    
    var print = document.createElement("span");
    
    var printtext = document.createElement("a");
    printtext.href = "#";
    
    var printIcon = document.createElement("i");
    printIcon.classname = "fa fa-print";
    printtext.addEventListener("click", function() {window.open(localStorage.getItem("decretPDF"), '_blank');});
    
    var colone = document.createElement("div");
    colone.className = "noo-main col-md-8";
    
    var job = document.createElement("div");
    job.className = "job-desc";
    
    var communique = document.createElement("h3");
    
    var comuniqueText = document.createElement("P");
    
    var description = document.createElement("h3");
    
    var descriptionText = document.createElement("P");
    
    var howApply = document.createElement("h3");
    
    var howApplyDescription = document.createElement("P");
    
    var pretRequit = document.createElement("h3");
    
    var pretRequitOL = document.createElement("ol");
    
    var pretRequitli = document.createElement("P");
    
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "job-action";
    
    var buttonText = document.createElement("a");
    buttonText.className = "btn btn-primary";
    buttonText.setAttribute("onclick","errorMessageConcours()");
    
    var buttonText2 = document.createElement("a");
    buttonText2.className = "btn btn-primary";
    buttonText2.href = "concours.html"
    
    var ministryDiv = document.createElement("span");
    var ministryText = document.createElement("a");
    var ministryIcon = document.createElement("i");
    ministryIcon.className = "fa fa-map-marker";
    
    
    //ministry name
    var niveauEtude = document.createElement("span");
    niveauEtude.className = "job-company";
    var niveauEtudeText = document.createElement("a");
    var niveauEtudeIcon = document.createElement("i");
    niveauEtudeIcon.className = "fa fa-graduation-cap";
    //=====================================================================
    //ministry name
    var niveauCycle = document.createElement("span");
    niveauCycle.className = "job-company";
    var niveauCycleText = document.createElement("a");
    var niveauCycleIcon = document.createElement("i");
    niveauCycleIcon.className = "fa fa-repeat";
    //=====================================================================
    
    //study level
    //niveauEtudeText.appendChild(document.createTextNode(localStorage.getItem("degree")));
    niveauEtudeText.appendChild(document.createTextNode("LICENCE"));
    niveauEtude.appendChild(niveauEtudeIcon);
    niveauEtude.appendChild(niveauEtudeText);
        
    //cycle level
    //niveauCycleText.appendChild(document.createTextNode(localStorage.getItem("cycle")));
    niveauCycleText.appendChild(document.createTextNode("CYCLE A"));
    niveauCycle.appendChild(niveauCycleIcon);
    niveauCycle.appendChild(niveauCycleText);
    
    
   // ministryText.appendChild(document.createTextNode(localStorage.getItem("ministereConcours")));
    ministryText.appendChild(document.createTextNode("MEA"));
    ministryDiv.appendChild(ministryIcon);
    ministryDiv.appendChild(ministryText);
    
    //creating tag tree
    //pageTitle.appendChild(document.createTextNode(localStorage.getItem("displayName")));
    pageTitle.appendChild(document.createTextNode("Ingénieur du Génie Rural"));
    pageHeading.appendChild(pageTitle);
    
    time.appendChild(iconTime);
    time.appendChild(document.createTextNode("Fermeture le 26-02-2021"));
    date.appendChild(time);
    
    
    printIcon.appendChild(document.createTextNode("Imprimer"));
    printtext.appendChild(printIcon);
    print.appendChild(printtext);
    
    contentMeta.appendChild(ministryDiv);
    contentMeta.appendChild(niveauEtude);
    contentMeta.appendChild(niveauCycle);
    contentMeta.appendChild(date);
    contentMeta.appendChild(print);
    
    pageSubHeading.appendChild(contentMeta);
    
    
    //embeds a PDF and makes it fill the browser window
   // PDFObject.embed(localStorage.getItem("decretPDF"),job);
    
    buttonText.appendChild(document.createTextNode("POSTULER"));
    buttonText2.appendChild(document.createTextNode("RETOUR"));
    
    buttonDiv.appendChild(buttonText2);
    buttonDiv.appendChild(buttonText);
    
    colone.appendChild(job);
    colone.appendChild(buttonDiv);
    
    document.getElementById("row").appendChild(pageHeading);
    document.getElementById("row").appendChild(pageSubHeading);
    document.getElementById("apply").appendChild(colone);
 //console.log("pdf: "+localStorage.getItem("decretPDF") );
}
//==========================================================================================================================================
function loadMinistere(){
    var listMinistry = [];
    
    listMinistry.push("Administration Territoriale, de la Décentralisation et de la Cohésion Sociale (MATD-CS)");
    listMinistry.push("Affaires Étrangères et de la Coopération (MAEC)");
    listMinistry.push("Agriculture et des Aménagements Hydro-Agricoles (MAAHA)");
    listMinistry.push("Autorité Supérieure de Contrôle d'État et de lutte contre la Corruption (ASCE/LC)");
    listMinistry.push("Commerce, de l'industrie et de l'Artisanat (MCIA)");
    listMinistry.push("Communication et des Relations avec le Parlement (MCRP)");
    listMinistry.push("Culture, des Arts et du Tourisme (MCAT)");
    listMinistry.push("Développement de l'Économie Numérique et des Postes (MDENP)");
    listMinistry.push("Droits Humains et de la Promotion Civique (MJDHPC)");
    listMinistry.push("Eau et de l'Assainissement (MEA)");
    listMinistry.push("Économie, des Finances et du Développement (MINEFID)");
    listMinistry.push("Éducation Nationale, de l'Alphabétisation et de la Promotion des Langues Nationales (MENA-PLN)");
    listMinistry.push("Environnement, de l'Économie Verte et du Changement Climatique (MEEVCC)");
    listMinistry.push("Femme, de la Solidarité Nationale, de la Famille et de l'Action Humanitaire");
    listMinistry.push("Fonction Publique, du Travail et de la Protection Sociale (MFPTPS)");
    listMinistry.push("Infrastructures (MI)");
    listMinistry.push("Mines et Carrières (MMC)");
    listMinistry.push("Jeunesse et de la Promotion de l'entrepreunariat des Jeunes (MJPEJ)");
    listMinistry.push("Justice (MJ)");
    listMinistry.push("Ressources Animales et Halieutiques (MRAH)");
    listMinistry.push("Santé(MS)");
    listMinistry.push("Sports et des Loisirs (MSL)");
    listMinistry.push("Urbanisme et de l'Habitat (MUH)");
}
//==========================================================================================================================================
function validateOTP(){
    
    //api url for login verification
    var url = SERVER_URL2+ '/econcours/otp/erify';
    
    //getting the code from page
    var code = document.getElementById("numCle").value;
 try{
     // Login  method implementation:
     async function postData(data ={}) {
         //setting the data to validate the code 
         data.telephone =  localStorage.getItem("otpTelephone");
         data.code = code;
         ////console.log(data.telephone);
         ////console.log(data.code)
         //fetching values to api for verification
         const response = await fetch(url, {
             method: 'POST', 
             mode: 'cors', 
             cache: 'no-cache',
             credentials: 'same-origin', 
             headers: {
                'Content-Type': 'application/json'
             },
             redirect: 'follow', 
             referrerPolicy: 'no-referrer', 
             body: JSON.stringify(data) 
         });
         //response from the api
         return response.json(); 
     }
     //get data from api after successful login
     postData({ login: true })
    .then(data => {////console.log(data);
                   if(data.result.length ==64){
         alert("Vérification réussie! Vous serez redirigé vers la page de connexion.");
                       window.location.href = "Sign_in.html";
                   }
                  });
 }catch(error){
     
         alert("Impossible d'envoyer à ce numéro, veuillez essayer plus tard ou changer de numéro.");
}

}
//==========================================================================================================================================
function sendOTP(){
    
    //api url for login verification
    var url = SERVER_URL2+ '/econcours/getotp';
    
    //setting telephone value 
    var telephone = document.getElementById("otptelephone").value;
    
    //verify if the telephone start with 226 and is eleven charactersd
    if(telephone.startsWith("226") && telephone.length == 11){
        //adding + to telephone number 
        telephone = "+"+telephone;
        //showing the the verification field if the phone is a good one 
        $('#sign-in').hide();
        $('#verify-otp').show();
    }
    //verify if there's 8 character and the telephone does't start with 226
    else if(telephone.length == 8 && telephone.startsWith(226) == false){
        //adding +226 to the phone number
        telephone = "+226"+telephone;
        //showing the the verification field if the phone is a good one 
        $('#sign-in').hide();
        $('#verify-otp').show();
    }else {
        document.getElementById("messageErreur").innerHTML = "Numéro de téléphone invalide";
        jQuery(document).ready(function ($) {
            $('#errorMessages').modal('show');
        });
        return false;
    }
    ////console.log("otp telephone: "+ telephone);
    //storing phone number
    localStorage.otpTelephone = telephone;
    // Login  method implementation:
    async function postData(data ={}) {
       
        //set telephone values 
        data.telephone =  telephone;
        //storing telephone value for the verification
        localStorage.otpTelephone = data.telephone;
        
        //fetching values to api for verification
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data) 
        });
        
        return response.json(); 
    }
//get data from api after successful login
postData({ login: true })
  .then(data => {
    if(data.code == 200){
        alert("La clé a été envoyée");
    }else if(data.code == 404){
        alert("Aucun candidat n'existe avec ce numéro");
    }
  });

}
//==========================================================================================================================================
function resendOTP(){
    
    //api url for login verification
    var url = SERVER_URL2+ '/econcours/getotp';
    
    // Login  method implementation:
    async function postData(data ={}) {
       
        //set telephone values 
        data.telephone =  localStorage.otpTelephone;
        
        //fetching values to api for verification
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data) 
        });
        
        return response.json(); 
    }
//get data from api after successful login
postData({ login: true })
  .then(data => {
    document.getElementById("messageErreur").innerHTML = "La clé a été envoyée de nouveau";
    jQuery(document).ready(function ($) {
        $('#errorMessages').modal('show');
    });
  });

}
//==========================================================================================================================================
function selectPay(){
    
    //setting telephone value 
    var telephone = document.getElementById("telephone").value;
    
    //verify if the telephone start with 226 and is eleven charactersd
    if(telephone.startsWith("226") && telephone.length == 11){
        //adding + to telephone number 
        telephone = "+"+telephone;
        //showing the the verification field if the phone is a good one 
        $('#phone-payment').hide();
        $('#payment').show();
    }
    //verify if there's 8 character and the telephone does't start with 226
    else if(telephone.length == 8 && telephone.startsWith(226) == false){
        //adding +226 to the phone number
        telephone = "+226"+telephone;
        //showing the the verification field if the phone is a good one 
        $('#phone-payment').hide();
        $('#payment').show();
    }else {
        
        document.getElementById("messageErreur").innerHTML = "Numéro de téléphone invalide";
        jQuery(document).ready(function ($) {
            $('#errorMessages').modal('show');
        });
        return false;
    }
    //storing phone number
    localStorage.payTelephone = telephone.substring(3);
}
//==========================================================================================================================================
//otp function
function loadOTP(){
    
    $('#verify-otp').hide();
}
//==========================================================================================================================================
function loadVerifyOTP(){
    $('#sign-in').show();
  $('#verify-otp').hide();
}
//==========================================================================================================================================
//otp function
function loadPay(){
    
    $('#payment').hide();
}
//==========================================================================================================================================
function loadVerifyPay(){
    setUser();
    $('#phone-payment').show();
  $('#payment').hide();
}
//==========================================================================================================================================
function setUser(){
    var title;
    
     if(localStorage.getItem("access_token")== null){
        alert("Connectez-vous à votre compte");
        
        window.location.href = "../sign_in.html";
    }
    try{
        if(document.getElementById("profil").textContent == "Mon Compte"){
            return false;
        }
    }catch(exception){}
    
    if(localStorage.getItem("sex")== "M")
        title = "M. " + localStorage.getItem("lastname");
    else
        title = "Mme " + localStorage.getItem("lastname");
    
    if(title == "Mme null" || title == "Mr null")
        title = "Mon Compte";
        
    ////console.log(localStorage.getItem("lastname"))
    //document.getElementById("profil").document.createTextNode(title + localStorage.getItem("firstname"));
    document.getElementById("profil").textContent = title;
    document.getElementById("mobileUser").textContent = title;
   
   
    
}
//==========================================================================================================================================
function deconnexion(){
    localStorage.clear();
    window.location.href = "../Acceuil.html";
}
//==========================================================================================================================================
//otp function
function verifierDocument(){
    
    localStorage.referenceDocument = document.getElementById("referenceDocument").value;
    localStorage.typeDocuments = document.getElementById("typeDocument").value;
    localStorage.dateDelivranceDocuments = document.getElementById("dateDelivranceDocument").value;
    localStorage.dateEcheanceDocuments = document.getElementById("dateEcheanceDocument").value;
    
    
    ////console.log(localStorage.getItem("photoRecto"));
    ////console.log(localStorage.getItem("photoVerso"));
    saveDocument();

     window.location.href = "verification_document.html"; // Redirecting to verification page
    
}
//==========================================================================================================================================
// populates user profile.
function loadDocumentPreview(){
    
    var referenceD = document.createElement("span");
    referenceD.textContent = "Numéro de référence:";
    
    var typeD = document.createElement("span");
    typeD.textContent = "Type de document:";
    
    var dateDelivranceD = document.createElement("span");
    dateDelivranceD.textContent = "Date de délivrance:";
    
    var dateEcheanceD = document.createElement("span");
    dateEcheanceD.textContent = "Date d'échéance:";
    
    var documentW = document.createElement("span");
    documentW.textContent = "Document Importé:";
    
    var photoR = document.createElement("span");
    photoR.textContent = "Photo Recto:";
    
    var photoV = document.createElement("span");
    photoV.textContent = "Photo Verso:";
    
    ////console.log(localStorage.getItem("photoVerso"));
    
    document.getElementById("referenceDocument").textContent = localStorage.getItem("referenceDocument");
    document.getElementById("typeDocument").textContent = localStorage.getItem("typeDocuments");
    document.getElementById("dateDelivranceDocument").textContent = localStorage.getItem("dateDelivranceDocuments");
    document.getElementById("dateEcheanceDocument").textContent = localStorage.getItem("dateEcheanceDocuments");
    
    
    if(localStorage.getItem("photoRecto") != "")
        document.getElementById("photoRecto").textContent = "1";
    else
        document.getElementById("photoRecto").textContent = "0";
    
    if(localStorage.getItem("photoVerso") != "")
        document.getElementById("photoVerso").textContent = "1";
    else
        document.getElementById("photoVerso").textContent = "0";
    
    
    /*document.getElementById("documentWord").textContent = localStorage.getItem("documentWord");
    document.getElementById("photoRecto").textContent = localStorage.getItem("photoRecto");
    document.getElementById("photoVerso").textContent = localStorage.getItem("photoVerso");*/
    
    document.getElementById("typeDocument").appendChild(typeD);
    document.getElementById("referenceDocument").appendChild(referenceD);
    document.getElementById("dateDelivranceDocument").appendChild(dateDelivranceD);
    document.getElementById("dateEcheanceDocument").appendChild(dateEcheanceD);
    document.getElementById("photoRecto").appendChild(photoR);
    document.getElementById("photoVerso").appendChild(photoV);
    
    
    ////console.log("photo recto: "+localStorage.getItem("photoRecto"));
    ////console.log("photo verso: "+localStorage.getItem("photoVerso"));
  
}
//==========================================================================================================================================
// populates user profile.
function saveDocument(){
    
   //api url for login verification
    var url = SERVER_URL2+'/documentid/add';
    
    const formData = new FormData();
    
    formData.append('user_id',localStorage.getItem("userid"));
    formData.append('type', document.getElementById("typeDocument").value);
    formData.append('photorecto', document.getElementById("photoRecto").files[0]);
    formData.append('photoverso', document.getElementById("photoVerso").files[0]);
    formData.append('placeofissue',document.getElementById("placeofissue").value);
    formData.append('iscurrent','1');
    
    if(document.getElementById("photoRecto").files[0] == null || document.getElementById("photoVerso").files[0] == null || document.getElementById("placeofissue").value == "" ){
          
        alert("Veuillez remplir les champs recto/verso ainsi que le pays de délivrance.");
        return false;
    }
    
    if(document.getElementById("typeDocument").value == "CNIB" || document.getElementById("typeDocument").value == "Attestation" || document.getElementById("typeDocument").value == "Passeport"){ 
        
         if(document.getElementById("referenceDocument").value == "" || document.getElementById("dateDelivranceDocument").value == "" || document.getElementById("dateEcheanceDocument").value == "" ){
          
             
             alert("Veuillez remplir tous les champs.");
             return false;
         }
        formData.append('reference', document.getElementById("referenceDocument").value);
        formData.append('dateissue', document.getElementById("dateDelivranceDocument").value);
        formData.append('validuntil', document.getElementById("dateEcheanceDocument").value);
        
        
        
    }else if( document.getElementById("typeDocument").value == "Diplome"){
        
        if(document.getElementById("referenceDocument").value == "" || document.getElementById("dateDelivranceDocument").value == "" ){
          
             alert("Veuillez remplir tous les champs.");
             return false;
         }
        
        formData.append('reference', document.getElementById("referenceDocument").value);
        formData.append('dateissue', document.getElementById("dateDelivranceDocument").value);
        formData.append('validuntil', "-");
        
    }else{
        
        formData.append('reference', "-");
        formData.append('dateissue', "-");
        formData.append('validuntil', "-");
        
    }
    
    
    

fetch(url, {
  method: 'POST',
  body: formData,
})
.then(response => response.json())
.then(result => {
    alert("Votre document à été importé!");
  window.location.href = "Candidat_Documents.html"; 
})
.catch(error => {
  //console.error('Error:', error);
});
}
//==========================================================================================================================================
// populates user profile.
function payConcoursLater(){
    
    setUser();
     //api url for login verification
    var url = SERVER_URL2+'/candidat/pay/delay';

// Login  method implementation:
async function postData(data ={}) {
    ////console.log("userid: "+ localStorage.getItem("userid"));
    //setting verification data variables
    
    
    var phone = localStorage.getItem("payTelephone");
    var otp = localStorage.getItem('payCode');
    
    data.payTelephone = phone;
    data.payCode = otp;
    data.exam_id = (localStorage.getItem("concoursID"));
    data.candidat_id = localStorage.getItem("userid");
    data.provider = 1;
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    //console.log(data);
    if(data.code == 405){
        alert("Vous avez déjà postulé à ce concours!");
        window.location.href = "Candidat_Concours.html";
    }else if(data.code == 201){
        alert("Merci d'avoir postulé!");
        window.location.href = "Candidat_Concours.html"; 
    }else if(data.code == 402){
        alert("Ajout à l'examen a échoué");
    }
  });
  
}
//==========================================================================================================================================
// populates user profile.
function applyConcoursLater(){
    
    setUser();
     //api url for login verification
    var url = SERVER_URL2+'/admin/candidate/exam/add';

// Login  method implementation:
async function postData(data ={}) {
    ////console.log("userid: "+ localStorage.getItem("userid"));
    //setting verification data variables
    
    
    var phone = "XXXXXXXX";
    var otp = "XXXXXXXX";
    
    data.payTelephone = phone;
    data.payCode = otp;
    data.exam_id = (localStorage.getItem("concoursID"));
    data.candidat_id = localStorage.getItem("userid");
    data.centre =  localStorage.getItem("compositionCenter");
    data.souscentre = localStorage.getItem("subCenters");
    data.provider = 1;
    
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
    ////console.log(data);
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
   // //console.log(data);
    if(data.code == 405){
        alert("Vous avez déjà postulé à ce concours!");
        window.location.href = "Candidat_Concours.html";
    }else if(data.code == 201){
        alert("Merci d'avoir postulé!");
        window.location.href = "Candidat_Concours.html"; 
    }else if(data.code == 402){
        alert("Ajout à l'examen a échoué");
    }
  });
  
}
//==========================================================================================================================================
function subcenter(){
    var data = JSON.stringify({
  "centre": localStorage.getItem("compositionCenter"),
  "souscentre": localStorage.getItem("subCenters")
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    ////console.log(this.responseText);
  }
});

xhr.open("POST", SERVER_URL2+ "/candidats/center/subcenter");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("servicename", "INITPAID");
xhr.setRequestHeader("type", "MPREQ");
xhr.setRequestHeader("merchant-id", "MERCD22694000");
xhr.setRequestHeader("token", localStorage.getItem("access_token"));

xhr.send(data);
}
//==========================================================================================================================================
function loadCandidatConcours(){
    
    setUser();
    //api url for login verification
    var url = SERVER_URL2+'/candidat/myexams';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.candidat_id= localStorage.getItem("userid");
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    var myID = localStorage.getItem("userid");
    
    var exam = [];
    var i;
    
    for(i=0;i<data.data.exams.length;i++){
        ////console.log(data.data.exams[i].exam );
        exam = data.data.exams[i];
    
    myConcoursExam.push(exam);
        
        
     //creating the tags
    //=====================================================================   
    var tr = document.createElement("tr");
    
    var td = document.createElement("td");
    td.className = "w-25";
    
    var loopItemContent = document.createElement("div");
    loopItemContent.className = "loop-item-content";
    
    var loopItemWrap = document.createElement("div");
    loopItemWrap.className = "loop-item-wrap";
    
    var divA = document.createElement("a");
    divA.appendChild(document.createTextNode(exam.exam.displayname));
    
    var h3 = document.createElement("h3");
    h3.className = "loop-item-title";
    
    var tdHidden = document.createElement("td");
    tdHidden.className = "hidden-xs hidden-sm w-15";
    
    var span = document.createElement("span");
    
    var classI = document.createElement("i");
    classI.className = "fa fa-calendar";
    
    var em = document.createElement("em");
    //em.appendChild(document.createTextNode("  " + exam.date));
    em.appendChild(document.createTextNode("Fermeture le 07-10-2021"));
    
    var tdCenter = document.createElement("td");
    tdCenter.className = "text-center";
        
        
    var concoursCenter = document.createElement("td");
    concoursCenter.className = "text-center";
    
    var spanCenter = document.createElement("span");
        
        
    var emCenter = document.createElement("em");
    //em.appendChild(document.createTextNode("  " + exam.date));
    emCenter.appendChild(document.createTextNode(exam.souscentre));
        
        
    var spanTypesConcours = document.createElement("span");
        
    var emTypesConcours = document.createElement("em");
    //em.appendChild(document.createTextNode("  " + exam.date));
    emTypesConcours.appendChild(document.createTextNode(exam.exam.type));
        
        
    var tdCenterButton = document.createElement("td");
    tdCenterButton.className = "text-center";
        
    var tdCenterChoice = document.createElement("td");
    tdCenterButton.className = "text-center";
        
        
    var tdTypesConcours = document.createElement("td");
    tdTypesConcours.className = "text-center";
    
    var spanApp = document.createElement("span");
        
            
    var payLaterButton = document.createElement("reset");
    payLaterButton.type = "reset";
    payLaterButton.className = "btn btn-danger";
    //putting this in comment to prevent the call of the pay function
   // payLaterButton.setAttribute("onclick","findConcours("+exam.exam.id+")");
    payLaterButton.setAttribute("onclick","concoursClosed()");
        
        
        
        
    var tdModifyCenter = document.createElement("td");
    tdModifyCenter.className = "text-center";
    
    var spanModifyCenter = document.createElement("span");
        
    var tdModifyConcours = document.createElement("td");
    tdModifyConcours.className = "text-center";
    
    var spanModifyConcours = document.createElement("span");
        
    var modifyCenter = document.createElement("reset");
    modifyCenter.type = "reset";
    modifyCenter.className = "btn btn-info";
        
    //putting this in comment to prevent the call of the pay function
    //modifyCenter.setAttribute("onclick","redirectModifyCenter("+exam.exam.id+")");
    modifyCenter.setAttribute("onclick","concoursClosed()");
        
    
    var modifyConcours = document.createElement("reset");
    modifyConcours.type = "reset";
    modifyConcours.className = "btn btn-info";
    //putting this in comment to prevent the call of the pay function
    //modifyConcours.setAttribute("onclick","redirectModifyConcours("+exam.exam.id+")");
    modifyConcours.setAttribute("onclick","concoursClosed()");
    
        
        //alert message
      //message to let the candidate know the pay function isn't working  
    //payLaterButton.setAttribute("onclick","alertMessage()");
    if(exam.payTelephone === "XXXXXXXX"){
        spanApp.appendChild(document.createTextNode("Non payé"));
        spanApp.className = "job-application-status job-application-status-expired";
        
        
        
    payLaterButton.className = "btn btn-danger";
    payLaterButton.appendChild(document.createTextNode("Procéder au paiement"));
        
             payLaterButton.disabled = false;
        
    tdCenterButton.appendChild(payLaterButton);
    }else{
        spanApp.appendChild(document.createTextNode("Payé"));
        spanApp.className = "job-application-status job-application-status-active";
        
    payLaterButton.className = "btn btn-success";
    payLaterButton.appendChild(document.createTextNode(""));
        
             payLaterButton.disabled = true;
    }
        
    spanCenter.appendChild(emCenter);
    tdCenterChoice.appendChild(spanCenter);
        
        
    spanTypesConcours.appendChild(emTypesConcours);
    tdTypesConcours.appendChild(spanTypesConcours)
        
    modifyConcours.appendChild(document.createTextNode("Modifier le concours"));
    modifyCenter.appendChild(document.createTextNode("Modifier le centre"));
    
    spanModifyCenter.appendChild(modifyCenter);
    spanModifyConcours.appendChild(modifyConcours);
    
    tdModifyConcours.appendChild(spanModifyConcours);
        
    tdModifyCenter.appendChild(spanModifyCenter);
        
        
    tdCenter.appendChild(spanApp);
    
        
    span.appendChild(classI);
    span.appendChild(em);
    tdHidden.appendChild(span);
    
    h3.appendChild(divA);
    loopItemContent.appendChild(h3);
    loopItemWrap.appendChild(loopItemContent);
    td.appendChild(loopItemWrap);
    
    tr.appendChild(td);
    tr.appendChild(tdTypesConcours);
    tr.appendChild(tdModifyConcours);
    tr.appendChild(tdCenterChoice);
    tr.appendChild(tdModifyCenter);
    tr.appendChild(tdHidden);
    tr.appendChild(tdCenter);
    tr.appendChild(tdCenterButton);
   // tr.appendChild(tdModifyConcours);
        
        
    //saving the candidate id and paid 
    myConcoursID.push(exam.exam.id);
    myConcoursPaid.push(exam.payTelephone);    
    
    document.getElementById("table").appendChild(tr);
    }
  });
}
//==========================================================================================================================================
function getCandidateConcours(){
    
    //api url for login verification
    var url = SERVER_URL2+'/candidat/myexams';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.candidat_id= localStorage.getItem("userid");
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    var myID = localStorage.getItem("userid");
    
    var exam = [];
    var i;
    
    for(i=0;i<data.data.exams.length;i++){
        ////console.log(data.data.exams[i].exam );
        exam = data.data.exams[i];
        
        if(exam.payTelephone === "XXXXXXXX"){
            
        myExams +="\n"+(i+1)+" Nom: "+ data.data.exams[i].exam.displayname + "| Non payé";
            
        console.log(i+": "+myExams);
    }else{
        
        myExams +="\n"+(i+1)+" Nom: "+ data.data.exams[i].exam.displayname + "| Payé";
        console.log(i+": "+myExams);
    }
    }
  });
    
}
//==========================================================================================================================================
function loadCandidatDocuments(){
    
    setUser();
    
    //api url for login verification
    var url = SERVER_URL2+ '/documentid/byuser';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.user_id= localStorage.getItem("userid");
    ////console.log(data.user_id);
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    
        
    var i;
    var loadCandidateDocument = [];
    for(i=0; i<data.data.length;i++){
        
    //storing the documents
     loadCandidateDocument[i] = data.data[i];   
      
        ////console.log(loadCandidateDocument[i]);  
     //creating the tags
    //=====================================================================    
    var tr = document.createElement("tr");
    
    var td = document.createElement("td");
    td.className = "title-col";
    
    var titleA = document.createElement("a");
    titleA.className = "title-col";
    
    var strong = document.createElement("strong");
    strong.appendChild(document.createTextNode(data.data[i].type));
    titleA.appendChild(strong);
    td.appendChild(titleA);
        
    var photoR = document.createElement("td");
    photoR.className = "text-center viewable-col";
    
    var photoRM = document.createElement("img");
    photoRM.src = data.data[i].photorecto;
    photoRM.width = "50";
    photoRM.height = "50";
    photoR.appendChild(photoRM);
          
    var photoV = document.createElement("td");
    photoV.className = "text-center viewable-col";
    
    var photoVM = document.createElement("img");
    photoVM.src = data.data[i].photoverso;
    photoVM.width = "50";
    photoVM.height = "50";
    photoV.appendChild(photoVM);
        
    var tdHidden = document.createElement("td");
    tdHidden.className = "text-center viewable-col";
    
    var em = document.createElement("em");
    em.appendChild(document.createTextNode(data.data[i].reference));
    tdHidden.appendChild(em);
    
    
    var tdXS = document.createElement("td");
    tdXS.className = "hidden-sm location-col";
    
    var span = document.createElement("span");
    
    var hiddenI = document.createElement("i");
    hiddenI.className = "fa fa-calendar";
    
    var emCalendar = document.createElement("em");
    emCalendar.appendChild(document.createTextNode("    "+data.data[i].dateissue));
    span.appendChild(hiddenI);
    span.appendChild(emCalendar);
    tdXS.appendChild(span);
    
    
     var tdXS2 = document.createElement("td");
    tdXS2.className = "hidden-sm location-col";
    
    var span2 = document.createElement("span");
    
    var hiddenI2 = document.createElement("i");
    hiddenI2.className = "fa fa-calendar";
    
    var emCalendar2 = document.createElement("em");
    emCalendar2.appendChild(document.createTextNode("    "+data.data[i].validuntil));
    span2.appendChild(hiddenI2);
    span2.appendChild(emCalendar2);
    tdXS2.appendChild(span2);
    
    var member = document.createElement("td");
    member.className = "member-manage-actions text-center";
        
        var memberA = document.createElement("a");
    memberA.className = "member-manage-action action-delete";
    memberA.title = "Supprimer";
    memberA.id = data.data[i].id;
    memberA.setAttribute("onclick","deleteCandidatDocuments("+data.data[i].id+");");

        
        
    var memberI = document.createElement("i");   
    memberI.className = "fa fa-trash-o";
    memberA.appendChild(memberI);  

        
    member.appendChild(memberA);
    
    jQuery(member).find('a').attr('data-toggle', 'tooltip');
        
    tr.appendChild(td);
    tr.appendChild(photoR);
    tr.appendChild(photoV);
    tr.appendChild(tdHidden);
    tr.appendChild(tdXS);
    tr.appendChild(tdXS2);
    tr.appendChild(member);
   
    document.getElementById("table").appendChild(tr);
    }
    
    localStorage.setItem("loadCandidateDocument", JSON.stringify(loadCandidateDocument));
    
  });
    
}
//==========================================================================================================================================
function deleteCandidatDocuments(id){
    
    setUser();
    
    var r = confirm("Voulez-vous supprimer le document?");
    if (r == true) {
    
    //api url for login verification
    var url = SERVER_URL2 + '/documentid/delete';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.doc_id= id;
    ////console.log(data.doc_id);
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
        if(data.success == true){
            alert("Document Supprimé!");
            loadCandidatDocuments();
            location.reload();
        }else{
            alert("Une erreur s'est produite, réessayer plus tard.");
        }
  });
}
}
//==========================================================================================================================================
function showImageRecto() {
    const preview = document.getElementById("target");
  const file = document.getElementById("photoRecto").files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
//==========================================================================================================================================
function showImageVerso() {
    const preview = document.getElementById("target2");
  const file = document.getElementById("photoVerso").files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
//==========================================================================================================================================
function setOTPTelephone(){
    loadOTP();
    document.getElementById("otptelephone").value = localStorage.getItem("telephone");
}
//==========================================================================================================================================
function searchConcours(){
    
    var query = (document.getElementById("search").value).toLocaleLowerCase();
    var i;
    var curentNomConcours;
    var currentNomMinistere;
    var tempSave = [];
    tempConcoursSave.length =0;
    document.getElementById("wrap-concours").innerHTML="";
    
    
        console.log(nomConcours.length);
        console.log(concours.length);
    for (i = 0; i < concours.length; i++) {
                curentNomConcours = nomConcours[i].toLowerCase();
                if(((nomConcours[i].toLowerCase().search(""+query)>=0) ) && (nomAcademique[i] == "BEPC") && (typeConcours[i]=="DIRECT") ){
                    document.getElementById("wrap-concours").appendChild(concours[i]);
                    tempConcoursSave.push(i);
                }
            }
    //console.log("temp1: "+ tempConcoursSave.length);
}
//==========================================================================================================================================
function searchConcoursMinistere(){
    var query = (document.getElementById("search-category").value).toLocaleLowerCase();
    var i;
    var curentNomConcours;
    var currentNomMinistere;
    var tempSave = [];
    
    
      if(document.getElementById("search-category").selectedIndex == 0)
          return false;
    else
        document.getElementById("wrap-concours").innerHTML="";
        
      for (i = 0; i < tempConcoursSave.length; i++) {
                currentNomMinistere = nomMinistere[tempConcoursSave[i]].toLowerCase();
          console.log(currentNomMinistere);
                if(currentNomMinistere.search(""+query)>=0){
                    document.getElementById("wrap-concours").appendChild(concours[tempConcoursSave[i]]);
                
                    tempSave.push(tempConcoursSave[i]);
            }
        }
        tempConcoursSave.length = 0;                  // Clear contents
        tempConcoursSave.push.apply(tempConcoursSave, tempSave);  // Append new contents
   
    //console.log("temp2: "+ tempConcoursSave.length);
}
//==========================================================================================================================================
function searchConcoursAcademic(){
    var query = (document.getElementById("search-academic").value).toLocaleLowerCase();
    var i;
    var curentNomAcademic;
    var tempSave = [];
    ////console.log(""+query);

    if(document.getElementById("search-academic").selectedIndex == 0)
          return false;
    else
        document.getElementById("wrap-concours").innerHTML="";
    
     for (i = 0; i < tempConcoursSave.length; i++) {
            
            curentNomAcademic = nomAcademique[tempConcoursSave[i]].toLowerCase();
            if(curentNomAcademic.search(""+query)>=0){
                
                    document.getElementById("wrap-concours").appendChild(concours[tempConcoursSave[i]]);
            }
        }   
        tempConcoursSave.length = 0;                  // Clear contents
        tempConcoursSave.push.apply(tempConcoursSave, tempSave);  // Append new contents
    
    //console.log("temp3: "+ tempConcoursSave.length);
}
//==========================================================================================================================================
function searchConcoursCycle(){
    var query = (document.getElementById("search-cycle").value).toLocaleLowerCase();
    var i;
    var curentNomCycle;
    var tempSave = [];
    ////console.log(""+query);
        
    
    if(document.getElementById("search-cycle").selectedIndex == 0)
          return false;
    else
        document.getElementById("wrap-concours").innerHTML="";
    
        for (i = 0; i < tempConcoursSave.length; i++) {
            
            curentNomCycle = nomCycle[tempConcoursSave[i]].toLowerCase();
            if(curentNomCycle.search(""+query)>=0){
                document.getElementById("wrap-concours").appendChild(concours[tempConcoursSave[i]]);
            }
        }
        tempConcoursSave.length = 0;                  // Clear contents
        tempConcoursSave.push.apply(tempConcoursSave, tempSave);  // Append new contents
    
    //console.log("temp4: "+ tempConcoursSave.length);
}
//==========================================================================================================================================
function clearSearch(){
    location.reload();
}
//==========================================================================================================================================
function searchConcoursPro(){
    var query = (document.getElementById("search").value).toLocaleLowerCase();
    var i;
    var curentNomConcours;
    var currentNomMinistere;
    document.getElementById("wrap-concours").innerHTML="";
    for (i = 0; i < concoursPro.length; i++) {
        
        //currentNomMinistere = nomMinistere[i].toLowerCase();
        curentNomConcours = nomConcours[i].toLowerCase();
        
        //
        if((curentNomConcours.search(""+query)>=0) && ((typeConcours[i].toLocaleLowerCase()).search("pro")>=0)){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }/*else if(currentNomMinistere.search(""+query)>=0){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }*/
    }
    
}
//==========================================================================================================================================
function searchConcoursMinisterePro(){
    var query = (document.getElementById("search-category").value).toLocaleLowerCase();
    var i;
    var curentNomConcours;
    var currentNomMinistere;
    ////console.log(""+query);
    document.getElementById("wrap-concours").innerHTML="";
    for (i = 0; i < concours.length; i++) {
        
        //currentNomMinistere = nomMinistere[i].toLowerCase();
        currentNomMinistere = nomMinistere[i].toLowerCase();
        
        //
        if((currentNomMinistere.search(""+query)>=0) && ((typeConcours[i].toLocaleLowerCase()).search("pro")>=0)){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }/*else if(currentNomMinistere.search(""+query)>=0){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }*/
    }
    
}
//==========================================================================================================================================
function searchConcoursAcademicPro(){
    var query = (document.getElementById("search-academic").value).toLocaleLowerCase();
    var i;
    var curentNomAcademic;
    ////console.log(""+query);
    document.getElementById("wrap-concours").innerHTML="";
    for (i = 0; i < concoursPro.length; i++) {
        
        //currentNomMinistere = nomMinistere[i].toLowerCase();
        curentNomAcademic = nomAcademique[i].toLowerCase();
        
        //
        if((curentNomAcademic.search(""+query)>=0) && ((typeConcours[i].toLocaleLowerCase()).search("pro")>=0) ){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }/*else if(currentNomMinistere.search(""+query)>=0){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }*/
    }
    
}
//==========================================================================================================================================
function searchConcoursCyclePro(){
    var query = (document.getElementById("search-cycle").value).toLocaleLowerCase();
    var i;
    var curentNomCycle;
    ////console.log(""+query);
    document.getElementById("wrap-concours").innerHTML="";
    for (i = 0; i < concours.length; i++) {
        
        //currentNomMinistere = nomMinistere[i].toLowerCase();
        curentNomCycle = nomCycle[i].toLowerCase();
        
        //
        if((curentNomCycle.search(""+query)>=0) && ((typeConcours[i].toLocaleLowerCase()).search("pro")>=0)){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }/*else if(currentNomMinistere.search(""+query)>=0){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }*/
    }
    
}
//==========================================================================================================================================
function searchConcoursDirect(){
    var query = (document.getElementById("search").value).toLocaleLowerCase();
    var i;
    var curentNomConcours;
    var currentNomMinistere;
    document.getElementById("wrap-concours").innerHTML="";
    for (i = 0; i < concours.length; i++) {
        
        //currentNomMinistere = nomMinistere[i].toLowerCase();
        curentNomConcours = nomConcours[i].toLowerCase();
        
        //
        if((curentNomConcours.search(""+query)>=0) && ((typeConcours[i].toLocaleLowerCase()).search("direct")>=0)){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }/*else if(currentNomMinistere.search(""+query)>=0){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }*/
    }
    
}
//==========================================================================================================================================
function searchConcoursMinistereDirect(){
    var query = (document.getElementById("search-category").value).toLocaleLowerCase();
    var i;
    var curentNomConcours;
    var currentNomMinistere;
    ////console.log(""+query);
    document.getElementById("wrap-concours").innerHTML="";
    for (i = 0; i < concours.length; i++) {
        
        //currentNomMinistere = nomMinistere[i].toLowerCase();
        currentNomMinistere = nomMinistere[i].toLowerCase();
        
        //
        if((currentNomMinistere.search(""+query)>=0) && ((typeConcours[i].toLocaleLowerCase()).search("direct")>=0)){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }/*else if(currentNomMinistere.search(""+query)>=0){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }*/
    }
    
}
//==========================================================================================================================================
function searchConcoursAcademicDirect(){
    var query = (document.getElementById("search-academic").value).toLocaleLowerCase();
    var i;
    var curentNomAcademic;
    ////console.log(""+query);
    document.getElementById("wrap-concours").innerHTML="";
    for (i = 0; i < concours.length; i++) {
        
        //currentNomMinistere = nomMinistere[i].toLowerCase();
        curentNomAcademic = nomAcademique[i].toLowerCase();
        
        //
        if((curentNomAcademic.search(""+query)>=0) && ((typeConcours[i].toLocaleLowerCase()).search("direct")>=0) ){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }/*else if(currentNomMinistere.search(""+query)>=0){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }*/
    }
    
}
//==========================================================================================================================================
function searchConcoursCycleDirect(){
    var query = (document.getElementById("search-cycle").value).toLocaleLowerCase();
    var i;
    var curentNomCycle;
    ////console.log(""+query);
    document.getElementById("wrap-concours").style.display="none";
    for (i = 0; i < concours.length; i++) {
        
        //currentNomMinistere = nomMinistere[i].toLowerCase();
        curentNomCycle = nomCycle[i].toLowerCase();
        
        //
        if((curentNomCycle.search(""+query)>=0) && ((typeConcours[i].toLocaleLowerCase()).search("direct")>=0)){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }else
        {
            //alert("Aucun Concours Trouvé!");
            document.getElementById("wrap-concours").style.display="block";
        }/*else if(currentNomMinistere.search(""+query)>=0){
            document.getElementById("wrap-concours").appendChild(concours[i]);
        }*/
    }
    
}
//==========================================================================================================================================
function loadMinistry(id){
    localStorage.loadMinistryID = id;
    window.location.href = "Gouvernement_Information.html";
    
}
//==========================================================================================================================================
function loadMinistryInfo(){
    
    
    if(localStorage.getItem("profession")=="Direct"){
  //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';

    concours = [];
    nomConcours = [];
    nomMinistere = [];
    nomCycle = [];
    nomAcademique = [];
    
    var query = localStorage.getItem("loadMinistryID");
    
    var count = 0;
    var divMinistryTitle = document.createElement("div");
        divMinistryTitle.className = "posts-loop-title";
    var h3Title = document.createElement("h3");
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    //----- JS CREATE HTML ELEMENT -----//
    var i;
    concours.length = 0;
    for (i = 0; i < data.data.length; i++) {
        
        
          
            
        //creating the tags
        //=====================================================================
        //create article div
        var article = document.createElement("article");
        article.className = "noo_job hentry";
            article.id = data.data[i].id;
        //=====================================================================
        //create the div loop-item-wrap
        var divLoopWrap = document.createElement("div");
        divLoopWrap.className = "loop-item-wrap";
        //=====================================================================
        //create the div loop-item-content
        var divLoopContent = document.createElement("div");
        divLoopContent.className = "loop-item-content";
    
        //create the div loop-item-title
        var divLooptitle = document.createElement("H2");
        divLooptitle.className = "loop-item-title";
    
        //create the div title
        var titleTag = document.createElement("a");
        //=====================================================================
        //create the div content-meta
        var contentMeta = document.createElement("p");
        contentMeta.className = "content-meta";
        //=====================================================================
        //ministry name
        var ministry = document.createElement("span");
        ministry.className = "job-company";
        var ministryText = document.createElement("a");
        //=====================================================================
        //date of concours
        var date = document.createElement("span");
        //=====================================================================
        //date of concours
        var time = document.createElement("time");
        time.className = "entry-date";
        //=====================================================================
        //date of concours
        var divSee = document.createElement("div");
        divSee.className = "show-view-more";
        //=====================================================================
        //button see more 
        var seeMore = document.createElement("a");
        seeMore.className = "btn btn-primary";
        seeMore.href = "Concours_Informations.html";
        seeMore.type = "reset";
        seeMore.setAttribute("onclick","saveConcoursInfo("+data.data[i].id+")");
        //=====================================================================
        //button see more 
        var iconDate = document.createElement("i");
        iconDate.setAttribute("class","fa fa-calendar");
        //=====================================================================
        var spaceConcours = document.createElement("br");
        //creating image 
       // var imageFeatured = document.createElement("item-featured");
        //var aImgage = document.createElement("a");
       // var image = document.createElement("img");
        //image.width = "50";
        //image.height = "50";
        //image.src = "../images/BF.png";
        //setting the div ids 
        //=====================================================================
        //=====================================================================
        //create the div loop-item-wrap
        
            if(data.data[i].reference == "CONT_ETAT_COM_POL_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_COM_POL_ASCE-LC.pdf");
        }else if(data.data[i].reference == "CONT_ETAT_INSP_DOUA_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_INSP_DOUA_ASCE-LC.pdf");
        }else if(data.data[i].reference == "CONT_ETAT_INSP_IMP_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_INSP_IMP_ASCE-LC.pdf");
        }else{    
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/"+data.data[i].reference+".pdf");
        }   
        
        //date tree 
        time.appendChild(iconDate);
        //time.appendChild(document.createTextNode(data.data[i].date));
        time.appendChild(document.createTextNode("Fermeture le 07-10-2021"));
        date.appendChild(time);
        
        //button tree
        seeMore.appendChild(document.createTextNode("Voir"));
        divSee.appendChild(seeMore);
        
        contentMeta.appendChild(ministry);
        contentMeta.appendChild(date);
        
        divLoopContent.appendChild(divLooptitle);
        divLoopContent.appendChild(contentMeta);
      
        divLoopWrap.appendChild(divLoopContent);
        divLoopWrap.appendChild(divSee);
        
        article.appendChild(divLoopWrap);
        
        nomConcours.push(data.data[i].displayname);
        nomMinistere.push(data.data[i].ministere);
        
        
        if(nomConcours[i] == "Assistants de la Garde de Sécurité Penitentiaire")
            nomAcademique.push("BEPC");
        else 
            nomAcademique.push(data.data[i].degree);
        
        nomCycle.push(data.data[i].cycle);
        descriptionConcours.push(data.data[i].description);
        typeConcours.push(data.data[i].type);
        dateConcours.push(data.data[i].date);
         
        //adding concours to array
        concours.push(article);
        
        
        if(((((data.data[i].ministere).toLowerCase()).search(query.toLowerCase())>=0) && nomAcademique[i] =="BEPC") ){
            count++;
        
          
            
            //=====================================================================
        //adding the values concours values
        //=====================================================================
        //conocours name tree
        titleTag.appendChild(document.createTextNode(data.data[i].displayname));
        divLooptitle.appendChild(titleTag);
        
        //minstry name tree
            ministryConcours = data.data[i].ministere;
             var temp = "";
            var temp2 = "";
            var temp3 = "";
        if(ministryConcours.length > ministryLength){
           for(var j = 0; j <= ministryConcours.length; j++){
               if((j > ministryLength -10) && (ministryConcours.charAt(j) == " ")){
                   temp += "\n";
                   temp2 = temp;
                   temp3 = ministryConcours.substring(j,ministryConcours.length);
                   ministryText.appendChild(document.createTextNode(temp2));
                   ministryText.appendChild(spaceConcours);
                   ministryText.appendChild(document.createTextNode(temp3));
                   
                   break;
               }else{
                   temp += ministryConcours.charAt(j);
               }
               
           }
        }
        else{
            ministryText.appendChild(document.createTextNode(data.data[i].ministere));
        }
           
            if(count<=1)
            h3Title.appendChild(document.createTextNode(data.data[i].ministere+": "));
            
            
           
            
            
        ministry.appendChild(ministryText);
        document.getElementById("wrap-concours").appendChild(article); 
        //=====================================================================
    }
    }
     var spanMinistryTitle = document.createElement("span");    
        spanMinistryTitle.className = "text-primary";
    
        h3Title.appendChild(spanMinistryTitle);
        divMinistryTitle.appendChild(h3Title);
    
        spanMinistryTitle.appendChild(document.createTextNode(count +" Concours Disponibles"));
            document.getElementById("titre").appendChild(divMinistryTitle); 
    });
    }
}
//==========================================================================================================================================
function loadMinistryInfoUser(){
    
    
    if(localStorage.getItem("profession")=="Direct"){
    setUser();
  //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';

    concours = [];
    nomConcours = [];
    nomMinistere = [];
    nomCycle = [];
    nomAcademique = [];
    
    var query = localStorage.getItem("loadMinistryID");
    
    var count = 0;
    var divMinistryTitle = document.createElement("div");
        divMinistryTitle.className = "posts-loop-title";
    var h3Title = document.createElement("h3");
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    //----- JS CREATE HTML ELEMENT -----//
    var i;
    concours.length = 0;
    for (i = 0; i < data.data.length; i++) {
        
        
          
            
        //creating the tags
        //=====================================================================
        //create article div
        var article = document.createElement("article");
        article.className = "noo_job hentry";
            article.id = data.data[i].id;
        //=====================================================================
        //create the div loop-item-wrap
        var divLoopWrap = document.createElement("div");
        divLoopWrap.className = "loop-item-wrap";
        //=====================================================================
        //create the div loop-item-content
        var divLoopContent = document.createElement("div");
        divLoopContent.className = "loop-item-content";
    
        //create the div loop-item-title
        var divLooptitle = document.createElement("H2");
        divLooptitle.className = "loop-item-title";
    
        //create the div title
        var titleTag = document.createElement("a");
        //=====================================================================
        //create the div content-meta
        var contentMeta = document.createElement("p");
        contentMeta.className = "content-meta";
        //=====================================================================
        //ministry name
        var ministry = document.createElement("span");
        ministry.className = "job-company";
        var ministryText = document.createElement("a");
        //=====================================================================
        //date of concours
        var date = document.createElement("span");
        //=====================================================================
        //date of concours
        var time = document.createElement("time");
        time.className = "entry-date";
        //=====================================================================
        //date of concours
        var divSee = document.createElement("div");
        divSee.className = "show-view-more";
        //=====================================================================
        //button see more 
        var seeMore = document.createElement("a");
        seeMore.className = "btn btn-primary";
        seeMore.href = "Concours_Informations.html";
        seeMore.type = "reset";
        seeMore.setAttribute("onclick","saveConcoursInfo("+data.data[i].id+")");
        //=====================================================================
        //button see more 
        var iconDate = document.createElement("i");
        iconDate.setAttribute("class","fa fa-calendar");
        //=====================================================================
        var spaceConcours = document.createElement("br");
        //creating image 
       // var imageFeatured = document.createElement("item-featured");
        //var aImgage = document.createElement("a");
       // var image = document.createElement("img");
        //image.width = "50";
        //image.height = "50";
        //image.src = "../images/BF.png";
        //setting the div ids 
        //=====================================================================
        //=====================================================================
        //create the div loop-item-wrap
        
            if(data.data[i].reference == "CONT_ETAT_COM_POL_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_COM_POL_ASCE-LC.pdf");
        }else if(data.data[i].reference == "CONT_ETAT_INSP_DOUA_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_INSP_DOUA_ASCE-LC.pdf");
        }else if(data.data[i].reference == "CONT_ETAT_INSP_IMP_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_INSP_IMP_ASCE-LC.pdf");
        }else{    
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/"+data.data[i].reference+".pdf");
        }   
        
        //date tree 
        time.appendChild(iconDate);
        //time.appendChild(document.createTextNode(data.data[i].date));
        time.appendChild(document.createTextNode("Fermeture le 07-10-2021"));
        date.appendChild(time);
        
        //button tree
        seeMore.appendChild(document.createTextNode("Voir"));
        divSee.appendChild(seeMore);
        
        contentMeta.appendChild(ministry);
        contentMeta.appendChild(date);
        
        divLoopContent.appendChild(divLooptitle);
        divLoopContent.appendChild(contentMeta);
      
        divLoopWrap.appendChild(divLoopContent);
        divLoopWrap.appendChild(divSee);
        
        article.appendChild(divLoopWrap);
        
        nomConcours.push(data.data[i].displayname);
        nomMinistere.push(data.data[i].ministere);
        
        
        
        if(nomConcours[i] == "Assistants de la Garde de Sécurité Penitentiaire")
            nomAcademique.push("BEPC");
        else 
            nomAcademique.push(data.data[i].degree);
        
        nomCycle.push(data.data[i].cycle);
        descriptionConcours.push(data.data[i].description);
        typeConcours.push(data.data[i].type);
        dateConcours.push(data.data[i].date);
         
        //adding concours to array
        concours.push(article);
        
        
        if(((((data.data[i].ministere).toLowerCase()).search(query.toLowerCase())>=0) && nomAcademique[i] =="BEPC")){
            count++;
        
          
            
            //=====================================================================
        //adding the values concours values
        //=====================================================================
        //conocours name tree
        titleTag.appendChild(document.createTextNode(data.data[i].displayname));
        divLooptitle.appendChild(titleTag);
        
        //minstry name tree
            ministryConcours = data.data[i].ministere;
             var temp = "";
            var temp2 = "";
            var temp3 = "";
        if(ministryConcours.length > ministryLength){
           for(var j = 0; j <= ministryConcours.length; j++){
               if((j > ministryLength -10) && (ministryConcours.charAt(j) == " ")){
                   temp += "\n";
                   temp2 = temp;
                   temp3 = ministryConcours.substring(j,ministryConcours.length);
                   ministryText.appendChild(document.createTextNode(temp2));
                   ministryText.appendChild(spaceConcours);
                   ministryText.appendChild(document.createTextNode(temp3));
                   
                   break;
               }else{
                   temp += ministryConcours.charAt(j);
               }
               
           }
        }
        else{
            ministryText.appendChild(document.createTextNode(data.data[i].ministere));
        }
           
            if(count<=1)
            h3Title.appendChild(document.createTextNode(data.data[i].ministere+": "));
            
            
           
            
            
        ministry.appendChild(ministryText);
        document.getElementById("wrap-concours").appendChild(article); 
        //=====================================================================
    }
    }
     var spanMinistryTitle = document.createElement("span");    
        spanMinistryTitle.className = "text-primary";
    
        h3Title.appendChild(spanMinistryTitle);
        divMinistryTitle.appendChild(h3Title);
    
        spanMinistryTitle.appendChild(document.createTextNode(count +" Concours Disponibles"));
            document.getElementById("titre").appendChild(divMinistryTitle); 
    });
    }
}
//==========================================================================================================================================
function orange(){
    //api url for login verification
     var url = 'https://burkinaproxy3.herokuapp.com/https://apiexam.fofoafrica.net:5443/api/v1/admin/candidate/exam/add';
    
    //store token
    var token;
try{
// Login  method implementation:
async function postData(data={}) {
    
    //setting verification data variables
    
    //var phone = localStorage.getItem("payTelephone");
    //var otp = localStorage.getItem('payCode');
    
    var phone = localStorage.getItem("payTelephone");
    var otp = localStorage.getItem('payCode');
    data.payTelephone = phone;
    data.payCode = otp;
    data.exam_id = (localStorage.getItem("concoursID"));
    data.candidat_id = localStorage.getItem("userid");
    data.centre =  localStorage.getItem("compositionCenter");
    data.souscentre = localStorage.getItem("subCenters");
    data.taille = localStorage.getItem("taille");
    data.provider =  0;
    
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(data);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    
    if(data.code == 405){
        
        alert("Vous avez déjà postulé à ce concours!");
        window.location.href = "Candidat_Concours.html";
    }else if(data.code == 201){
        alert("Merci d'avoir postulé!");
        window.location.href = "Candidat_Concours.html"; 
    }else if(data.code == 402){
        alert("Ajout à l'examen a échoué");
    }
    
  });  
}catch(exception){
    
    alert("le paiement n'as pu etre effectuer, veuillez utiliser le meme code de validation recu ainsi que le numéro de teléphone.");
    window.history.back();
}
}
//==========================================================================================================================================
function orangeLate(){
    //api url for login verification
    var url = SERVER_URL2+ '/candidat/pay/delay';
    
    //store token
    var token;
try{
// Login  method implementation:
async function postData(data={}) {
    
    //setting verification data variables
    
    //var phone = localStorage.getItem("payTelephone");
    //var otp = localStorage.getItem('payCode');
    
    var phone = localStorage.getItem("payTelephone");
    var otp = localStorage.getItem('payCode');
    data.payTelephone = phone;
    data.payCode = otp;
    data.exam_id = (localStorage.getItem("concoursID"));
    data.candidat_id = localStorage.getItem("userid");
    data.centre =  localStorage.getItem("compositionCenter");
    data.souscentre = localStorage.getItem("subCenters");
    data.provider =  0;
    
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    console.log(data);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    
    if(data.code == 405){
        
        alert("Vous avez déjà payé pour ce concours!");
        window.location.href = "Candidat_Concours.html";
    }else if(data.code == 201){
        alert("Merci d'avoir payer pour le concours!");
        window.location.href = "Candidat_Concours.html"; 
    }else if(data.code == 402){
        alert("Ajout à l'examen a échoué");
    }
    
  });  
}catch(exception){
    
    alert("le paiement n'as pu etre effectuer, veuillez utiliser le meme code de validation recu ainsi que le numéro de teléphone.");
    window.history.back();
}
}
//==========================================================================================================================================
// populates user profile.
function applyConcoursMobicash(){
    
    setUser();
     //api url for login verification
    var url = SERVER_URL2+'/admin/candidate/exam/add';

// Login  method implementation:
async function postData(data ={}) {
    //console.log("userid: "+ localStorage.getItem("userid"));
    //setting verification data variables
    
    
    var phone = localStorage.getItem("payTelephone");
    var otp = localStorage.getItem('mpin');
    data.payTelephone = phone;
    data.payCode = otp;
    data.exam_id = (localStorage.getItem("concoursID"));
    data.candidat_id = localStorage.getItem("userid");
    data.centre =  localStorage.getItem("compositionCenter");
    data.souscentre = localStorage.getItem("subCenters");
    data.provider =  1;
    
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    
    if(data.code == 405){
        
        alert("Vous avez déjà postulé à ce concours!");
        window.location.href = "Candidat_Concours.html";
    }else if(data.code == 201){
        alert("Merci d'avoir postulé!");
        window.location.href = "Candidat_Concours.html"; 
    }else if(data.code == 402){
        alert("Ajout à l'examen a échoué");
    }
  });
  
}
//==========================================================================================================================================
function mobicashOuverture(){
     //api url for login verification
    var url = 'https://api.onatel.bf:8443/mobicash/v1/1/webservices';
    
// Login  method implementation:
async function postData(data ={}) {
    
    
    data = {"login":"226Econcours","password":"XEc@n20$"};
    console.log(data);
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',  
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'serviceName' : "PAIDAUTH",
      'type': 'CNXREQ',   
      'origin': 'https://econcours.gov.bf',
      'merchant-id': 'MERCDGOVS24001'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    
    try{
        
    console.log("Bearer "+data.token);
        
    localStorage.mobicashToken = "Bearer "+data.token;
    mobicashPay();
    }catch(exception){
         console.log("paiement echoue! "+exception);
        
    }
  });
}
//==========================================================================================================================================
function mobicashPay(){
     //api url for login verification
    var url = 'https://api.onatel.bf:8443/mobicash/v1/1/webservices';
    
    
// Login  method implementation:
async function postData() {
    
    var data={};
    data.merchantTxnid = makeID();
    data.customerMsisdn = localStorage.getItem("payTelephone");
    
    data.receiverMsisdn = "60828066";
    data.merchantPin = "1010";
    data.billCode = "NA";
    data.billTaxe = "0";
    data.billAmount = "800";
    
    //console.log(data.merchantTxnid);
    //console.log(data.customerMsisdn);
   // //console.log("data: "+data);
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'serviceName' : "INITPAID",
      'token': localStorage.getItem("mobicashToken"),
      'type': 'MPREQ',
      'origin': 'https://econcours.gov.bf',
      'merchant-id': 'MERCDGOVS24001'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(response);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    try{
    localStorage.mobicashTxnid = data.mobicashTxnid;
    localStorage.mpin = data.mpin;  
        if(data.statusCode=="200"){
        
            alert("Un message SMS vous sera envoyé pour initier le paiement!");
        
     localStorage.payCode = data.mpin; 
       document.getElementById("payButton").disabled = false;
        //console.log(data);
        }
    }catch(exception){
        
    //console.log(data);
            alert("Le paiement à échoué, veuillez essayez encore!");
    }
  });
}
//==========================================================================================================================================
function mobicashVerification(){
     //api url for login verification
    var url = 'https://api.onatel.bf:8443/mobicash/v1/1/webservices';
    
    
// Login  method implementation:
async function postData() {
    
    var data = {};
    data.customerMsisdn = localStorage.getItem("payTelephone");
    data.mobicashTxnid = localStorage.getItem("mobicashTxnid");
    data.mpin = localStorage.getItem("mpin");
    
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'serviceName' : "VRIFYPAID",
      'origin': 'https://econcours.gov.bf',
      'token': localStorage.getItem("mobicashToken"),
      'type': 'MPREQ',
      'merchant-id': 'MERCDGOVS24001'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(data);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    
        
    try{
        if(data.PaymentStatus=="PAID" && data.message == "Customer payment succeed"){
            alert("Le paiement avec Mobicash est fait, nous vous ajoutons au concours");
            applyConcoursMobicash();
        }
    }catch(exception){
        
         var answer = confirm("Le paiement à échoué, voulez-vous reessayer le paiement?");
        if(answer == true)
            mobicashVerification();
        else 
            window.location.href = "payMobicash.html";
            
    }
    
    
  });
}
//==========================================================================================================================================
function mobicashOuvertureLate(){
     //api url for login verification
    var url = 'https://api.onatel.bf:8443/mobicash/v1/1/webservices';
    
// Login  method implementation:
async function postData(data ={}) {
    
    
    data = {"login":"226Econcours","password":"XEc@n20$"};
    console.log(data);
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',  
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'serviceName' : "PAIDAUTH",
      'type': 'CNXREQ',   
      'origin': 'https://econcours.gov.bf',
      'merchant-id': 'MERCDGOVS24001'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    
    try{
    localStorage.mobicashToken = "Bearer "+data.token;
    mobicashPayLate();
    }catch(exception){
        
    }
  });
}
//==========================================================================================================================================
function mobicashPayLate(){
     //api url for login verification
    var url = 'https://api.onatel.bf:8443/mobicash/v1/1/webservices';
    
    
// Login  method implementation:
async function postData() {
    
    var data={};
    data.merchantTxnid = makeID();
    data.customerMsisdn = localStorage.getItem("payTelephone");
    
    data.receiverMsisdn = "60828066";
    data.merchantPin = "1010";
    data.billCode = "NA";
    data.billTaxe = "0";
    data.billAmount = "800";
    
    //console.log(data.merchantTxnid);
    //console.log(data.customerMsisdn);
   // //console.log("data: "+data);
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'serviceName' : "INITPAID",
      'token': localStorage.getItem("mobicashToken"),
      'type': 'MPREQ',
      'origin': 'https://econcours.gov.bf',
      'merchant-id': 'MERCDGOVS24001'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(response);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    try{
    localStorage.mobicashTxnid = data.mobicashTxnid;
    localStorage.mpin = data.mpin;
        
        if(data.statusCode=="200"){
        
            alert("Un message SMS vous sera envoyé pour initier le paiement!");
        
       document.getElementById("payButton").disabled = false;
        //console.log(data);
        }
    }catch(exception){
        
    //console.log(data);
            alert("Le paiement à échoué, veuillez essayez encore!");
    }
  });
}
//==========================================================================================================================================
function mobicashVerificationLate(){
     //api url for login verification
    var url = 'https://api.onatel.bf:8443/mobicash/v1/1/webservices';
    
    
// Login  method implementation:
async function postData() {
    
    var data = {};
    data.customerMsisdn = localStorage.getItem("payTelephone");
    data.mobicashTxnid = localStorage.getItem("mobicashTxnid");
    data.mpin = localStorage.getItem("mpin");
    
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'serviceName' : "VRIFYPAID",
      'origin': 'https://econcours.gov.bf',
      'token': localStorage.getItem("mobicashToken"),
      'type': 'MPREQ',
      'merchant-id': 'MERCDGOVS24001'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(data);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    
        
    try{
        if(data.PaymentStatus=="PAID" && data.message == "Customer payment succeed"){
            alert("Le paiement avec Mobicash est fait, nous vous ajoutons au concours");
            applyConcoursMobicashLate();
        }
    }catch(exception){
        
         var answer = confirm("Le paiement à échoué, voulez-vous reessayer le paiement?");
        if(answer == true)
            mobicashVerificationLate();
        else 
            window.location.href = "payMobicash_Late.html";
            
    }
    
    
  });
}
//==========================================================================================================================================
// populates user profile.
function applyConcoursMobicashLate(){
    
    setUser();
     //api url for login verification
    var url = SERVER_URL2+'/candidat/pay/delay';

// Login  method implementation:
async function postData(data ={}) {
    //console.log("userid: "+ localStorage.getItem("userid"));
    //setting verification data variables
    
    
    var phone = localStorage.getItem("payTelephone");
    var otp = localStorage.getItem('mpin');
    data.payTelephone = phone;
    data.payCode = otp;
    data.exam_id = (localStorage.getItem("concoursID"));
    data.candidat_id = localStorage.getItem("userid");
    data.centre =  localStorage.getItem("compositionCenter");
    data.souscentre = localStorage.getItem("subCenters");
    data.provider =  1;
    
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    
    if(data.code == 405){
        
        alert("Vous avez déjà payé pour ce concours!");
        window.location.href = "Candidat_Concours.html";
    }else if(data.code == 201){
        alert("Merci d'avoir payé pour le concours!");
        window.location.href = "Candidat_Concours.html"; 
    }else if(data.code == 402){
        alert("Ajout à l'examen a échoué");
    }
  });
  
}
//==========================================================================================================================================
function makeID() {
   const length = 15;
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
//==========================================================================================================================================
function paySelections(){
    if(document.getElementById('paySelection').value == "OM"){
        localStorage.payCode = document.getElementById('payCode').value;
        
        window.location.href = "LoadingOrange.html";
    } else if(document.getElementById('paySelection').value == "MC"){
        
        //localStorage.payCode = document.getElementById('payCode').value;
       window.location.href = "LoadingMobicash.html";
    }
}
//==========================================================================================================================================
function paySelectionsLate(){
    if(document.getElementById('paySelection').value == "OM"){
        localStorage.payCode = document.getElementById('payCode').value;
        
        window.location.href = "LoadingOrangeLate.html";
    } else if(document.getElementById('paySelection').value == "MC"){
        
        //localStorage.payCode = document.getElementById('payCode').value;
       window.location.href = "LoadingMobicashLate.html";
    }
}
//==========================================================================================================================================
function centerSelection(){
    
    
    if(document.getElementById('compositionCenter').value != ""){
        localStorage.compositionCenter = document.getElementById('compositionCenter').value;
        
        if(document.getElementById('compositionCenter').value =="KADIOGO"){    

            localStorage.subCenters =  "CENTRE DE OUAGADOUGOU";
        }else if(document.getElementById('compositionCenter').value =="HOUET"){    

            localStorage.subCenters =  "CENTRE DE BOBO-DIOULASSO";
        }else if(document.getElementById('compositionCenter').value =="BOULKIEMDE"){    

            localStorage.subCenters =  "CENTRE DE KOUDOUGOU";
        }else if(document.getElementById('compositionCenter').value =="BOULGOU"){    

            localStorage.subCenters =  "CENTRE DE TENKODOGO";
        }else if(document.getElementById('compositionCenter').value =="MOUHOUN"){    

            localStorage.subCenters =  "CENTRE DE DEDOUGOU";
        }else if(document.getElementById('compositionCenter').value =="COMOE"){    

            localStorage.subCenters =  "CENTRE DE BANFORA";
        }else if(document.getElementById('compositionCenter').value =="GOURMA"){    

            localStorage.subCenters =  "CENTRE DE CENTRE DE FADA NGOURMA";
        }else if(document.getElementById('compositionCenter').value =="YATENGA"){    

            localStorage.subCenters =  "CENTRE DE OUAHIGOUYA";
        }else if(document.getElementById('compositionCenter').value =="ZOUNDWEOGO"){    

            localStorage.subCenters =  "CENTRE DE MANGA";
        }else if(document.getElementById('compositionCenter').value =="OUBRITENGA"){    

            localStorage.subCenters =  "CENTRE DE ZINIARE";
        }else if(document.getElementById('compositionCenter').value =="SANMATENGA"){    

            localStorage.subCenters =  "CENTRE DE KAYA";
        }else if(document.getElementById('compositionCenter').value =="SENO"){    

            localStorage.subCenters =  "CENTRE DE DORI";
        }else if(document.getElementById('compositionCenter').value =="PONI"){    

            localStorage.subCenters =  "CENTRE DE GAOUA";
        }
        //verifying if the candidate selected pay later
        if(localStorage.getItem("payLater") == "false"){
            window.location.href = "Pay.html"; // Redirecting to concours page
            //console.log(localStorage.getItem("payLater"));
        }else if(localStorage.getItem("payLater") == "true"){
            
            window.location.href = "paylater.html"; // Redirecting to concours page
        }
    }else {
        document.getElementById("messageErreur").innerHTML = "Selectionnez un centre!";
        jQuery(document).ready(function ($) {
            $('#errorMessages').modal('show');
        });
    }
}
//==========================================================================================================================================
function applyType(){
    
    //alert(localStorage.getItem("profession"));
  /*  if((localStorage.getItem("profession") == "Direct"))
            window.location.href = "Center.html"; // Redirecting to concours page
    else  if((localStorage.getItem("profession") == "Professionnel") && ((localStorage.getItem("ministereConcours").search("Santé") != -1) || (localStorage.getItem("ministereConcours").search("Éducation") != -1))){
            window.location.href = "Center.html"; //Redirecting to concours page
    }else if(localStorage.getItem("profession") == "Professionnel"){
        alert("Le concours sera administré dans le centre unique de Ouagadougou.");
        localStorage.compositionCenter = "KADIOGO";
        localStorage.subCenters =  "CENTRE DE OUAGADOUGOU";
        window.location.href = "Pay.html"; // Redirecting to concours page
    }*/
     alert("Le concours sera administré dans le centre unique de Ouagadougou.");
        localStorage.compositionCenter = "KADIOGO";
        localStorage.subCenters =  "CENTRE DE OUAGADOUGOU";
        window.location.href = "Pay.html"; // Redirecting to concours page
}
//==========================================================================================================================================
function getRole(){
    
        localStorage.roleProfession = "Direct";
     //console.log("role3: "+ localStorage.getItem("role"));
}
//==========================================================================================================================================
function printerDiv() {
//Get the HTML of div

var divElements = document.getElementById("candidateInfo").innerHTML;

//Get the HTML of whole page
var oldPage = document.body.innerHTML;

//Reset the pages HTML with divs HTML only

     document.body.innerHTML = 

     divElements ;



//Print Page
window.print();

//Restore orignal HTML
document.body.innerHTML = oldPage;

}
//==========================================================================================================================================
function comboSearch() {
    
    searchConcours();
    if(!((document.getElementById("search-category").value).localeCompare("")) || (tempConcoursSave.length != 0))
    searchConcoursMinistere();
    
    
        
       if(!((document.getElementById("search-academic").value).localeCompare("")) || (tempConcoursSave.length != 0))
            searchConcoursAcademic();
    tempConcoursSave.length = 0

}
//==========================================================================================================================================
function comboSearchMinistere() {
    
    searchConcours();
    if(!((document.getElementById("search-cycle").value).localeCompare("")) || (tempConcoursSave.length != 0))
    searchConcoursCycle();
    if(!((document.getElementById("search-academic").value).localeCompare("")) || (tempConcoursSave.length != 0))
    searchConcoursAcademic();
    
    tempConcoursSave.length = 0;

}
//==========================================================================================================================================
//showing an error message if the candidate tries to apply and doesn't have an account
function errorMessageConcours(){
    
    alert("Créez un compte pour pouvoir postuler à ce concours");
}
//==========================================================================================================================================
//showing an error message if the candidate tries to apply and doesn't have an account
function saveProfil(){
    
    if(localStorage.getItem("ministryInfo")== "true"){
      //setting the values in the textfield for the users
    document.getElementById("firstname").value = localStorage.getItem("firstname");
    document.getElementById("lastname").value = localStorage.getItem("lastname");
    document.getElementById("telephone").value = localStorage.getItem("telephone");
    document.getElementById("telephone_confirm").value = localStorage.getItem("telephone_confirm");
    document.getElementById("dateofbirth").value = localStorage.getItem("dateofbirth");
    document.getElementById("address").value = localStorage.getItem("address");
    document.getElementById("cnibnumber").value = localStorage.getItem("cnibnumber");
    document.getElementById("cnibnumber_confirm").value = localStorage.getItem("cnibnumber_confirm");
    document.getElementById("cnibplaceofissue").value = localStorage.getItem("cnibplaceofissue");
    document.getElementById("cnibdateissue").value = localStorage.getItem("cnibdateissue");
    document.getElementById("cnibvaliduntil").value = localStorage.getItem("cnibvaliduntil");
  
    document.getElementById("role").value = "Direct";
    if(localStorage.getItem("sex")=='M')
        document.getElementById("sex").value = "M";
    else
        document.getElementById("sex").value = "F";
    
    //verifying the person has a maiden name
    if(localStorage.getItem("maidenname") == '-'){
        document.getElementById("maidenname").value = "";
    }else {
        document.getElementById("maidenname").value = localStorage.getItem("maidenname") ;
    }
    
    }
}
//==========================================================================================================================================
// populates user profile.
function reviewProfile(){
    
    localStorage.modifyInfo = "false";
    
    //setting the values in the textfield for the users
    document.getElementById("firstname").textContent = localStorage.getItem("firstname");
    document.getElementById("lastname").textContent = localStorage.getItem("lastname");
    document.getElementById("telephone").textContent = localStorage.getItem("telephone");
    document.getElementById("telephone_confirm").textContent = localStorage.getItem("telephone_confirm");
    document.getElementById("dateofbirth").textContent = localStorage.getItem("dateofbirth");
    document.getElementById("address").textContent = localStorage.getItem("address");
    document.getElementById("cnibnumber").textContent = localStorage.getItem("cnibnumber");
    document.getElementById("cnibnumber_confirm").textContent = localStorage.getItem("cnibnumber_confirm");
    document.getElementById("cnibplaceofissue").textContent = localStorage.getItem("cnibplaceofissue");
    document.getElementById("cnibdateissue").textContent = localStorage.getItem("cnibdateissue");
    document.getElementById("cnibvaliduntil").textContent = localStorage.getItem("cnibvaliduntil");
  
    document.getElementById("role").textContent = "Direct";
    
    if(localStorage.getItem("sex")=='M')
        document.getElementById("sex").textContent = "Masculin";
    else
        document.getElementById("sex").textContent = "Feminin";
    
    
    //verifying the person has a maiden name
    if(localStorage.getItem("maidenname") == '-'){
        document.getElementById("maidenname").textContent = "";
    }else {
        document.getElementById("maidenname").textContent = localStorage.getItem("maidenname") ;
    }
  
}
//==========================================================================================================================================
// populates user profile.
function modifyInfo(){
    
    localStorage.modifyInfo = "true";
    window.location.href = "Enregistrement.html";
}
//==========================================================================================================================================
// populates user profile.
function payLater(){
    
    localStorage.payLater = "true";
    window.location.href = "center.html";
}
//==========================================================================================================================================
// populates user profile.
function payNow(){
    
    localStorage.payLater = "false";
    window.location.href = "pay.html";
}
//==========================================================================================================================================
function accountPayConcours(id){
            findConcours(id);
            window.location.href = "pay.html";

}
//==========================================================================================================================================
function findConcours(id){  
    //api url for login verification
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(response);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
      
    var i;
    for (i = 0; i < data.count; i++) {
        if(data.data[i].id == id){
    localStorage.displayName = data.data[i].description;
     
    //localStorage.concoursID = id; 
            localStorage.concoursID = 421;  
   window.location.href = "pay_Late.html";
        }
    }
    
});
}
//==========================================================================================================================================
function alertMessage(){
    alert("Le paiement sera activé sous peu. Merci pour votre patience.");
}
//==========================================================================================================================================
function createRecepice() {
    
    window.location.href = "recipice.html";
    
   
}
//==========================================================================================================================================
function getRecipiceData(){
    
    setUser();
    
    localStorage.modifyInfo = "false";
    
    //setting the values in the textfield for the users
    document.getElementById("firstname").textContent = localStorage.getItem("firstname");
    document.getElementById("lastname").textContent = localStorage.getItem("lastname");
    document.getElementById("telephone").textContent = localStorage.getItem("telephone");
    document.getElementById("dateofbirth").textContent = localStorage.getItem("dateofbirth");
    document.getElementById("address").textContent = localStorage.getItem("address");
    document.getElementById("cnibnumber").textContent = localStorage.getItem("cnibnumber");
    document.getElementById("cnibdateissue").textContent = localStorage.getItem("cnibdateissue");
    //document.getElementById("cnibdateissue").textContent = localStorage.getItem("cnibdateissue");
    
    if(localStorage.getItem("sex") == "M")
        document.getElementById("sex").textContent = "Masculin";
    else
        document.getElementById("sex").textContent = "Feminin";
    
    document.getElementById("recepisse").textContent = localStorage.getItem("candidatecode");
  
    
    if(localStorage.getItem("sex")=='M')
        document.getElementById("sex").textContent = "Masculin";
    else
        document.getElementById("sex").textContent = "Feminin";
    
    
    //verifying the person has a maiden name
    if(localStorage.getItem("maidenname") == '-'){
        document.getElementById("maidenname").textContent = "";
    }else {
        document.getElementById("maidenname").textContent = localStorage.getItem("maidenname") ;
    }
    
    
    
    //api url for login verification
    var url = SERVER_URL2+'/candidat/myexams';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.candidat_id= localStorage.getItem("userid");
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    var myID = localStorage.getItem("userid");
    
    var myexam = "";
    var i;
    
    for(i=0;i<data.data.exams.length;i++){
        
        if(data.data.exams[i].exam.id == 421){
        var labelExam = document.createElement("label");
        labelExam.className = "col-sm-8 control-label";
        labelExam.style = "color:red";
        ////console.log(data.data.exams[i].exam );
        exam = data.data.exams[i];
        
        if(exam.payTelephone === "XXXXXXXX"){
            if(i<=9)    
                myexam ="\n"+(i+1)+" | "+ data.data.exams[i].exam.displayname + " | Non payé\n";
            else
                myexam ="\n"+(i+1)+" | "+ data.data.exams[i].exam.displayname + " | Non payé\n";
            
    }else{
            if(i<=9)    
                myexam ="\n"+(i+1)+" | "+ data.data.exams[i].exam.displayname + " | Fermeture 26-02-2021 "+ " | Payé\n";
            else
                myexam ="\n"+(i+1)+" | "+ data.data.exams[i].exam.displayname + " | Fermeture 26-02-2021 "+" | Payé\n";
        
    }
        
        labelExam.textContent = myexam;
        document.getElementById("myConcours").appendChild(labelExam); 
    }
}
  });
}
//==========================================================================================================================================
function redirectModifyConcours(id){
    
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(response);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
      
    var i;
    for (i = 0; i < data.count; i++) {
        if(data.data[i].id == id){
    localStorage.displayName = data.data[i].description;
     
    localStorage.concoursID = id;  
            
    window.location.href = "modifyConcours.html";
        }
    }
});
    
    
     
}
//==========================================================================================================================================
function redirectModifyCenter(id){
    
       
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(response);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
      
    var i;
    for (i = 0; i < data.count; i++) {
        if(data.data[i].id == id){
    localStorage.displayName = data.data[i].description;
     
    localStorage.concoursID = id;  
            
    window.location.href = "modifyCenter.html";
        }
    }
});
   
}
//==========================================================================================================================================
function loadModifyCenter(id){
    
    setUser();
       
    //create the div loop-item-title
        var payTitle = document.createElement("H3");
        payTitle.className = "search-main-title";
    
    var payPTitle = document.createElement("p");
        payPTitle.className = "search-top-title";
    
    var extraTab = document.createElement("br");
      
   // payTitle.appendChild(document.createTextNode("Postuler au Concours: " + localStorage.getItem("displayName")));
    payTitle.appendChild(document.createTextNode("Postuler au Concours: Ingénieur du Génie Rural" ));
  
    document.getElementById("payTitleDiv").appendChild(extraTab);
    document.getElementById("payTitleDiv").appendChild(payTitle);
    document.getElementById("payTitleDiv").appendChild(payPTitle);
   
}//==========================================================================================================================================
function loadModifyConcours(id){
    
    setUser();
       
    //create the div loop-item-title
        var payTitle = document.createElement("H3");
        payTitle.className = "search-main-title";
    
    var payPTitle = document.createElement("p");
        payPTitle.className = "search-top-title";
    
    var extraTab = document.createElement("br");
      
   // payTitle.appendChild(document.createTextNode("Postuler au Concours: " + localStorage.getItem("displayName")));
    payTitle.appendChild(document.createTextNode("Postuler au Concours: Ingénieur du Génie Rural" ));
    
    document.getElementById("payTitleDiv").appendChild(extraTab);
    document.getElementById("payTitleDiv").appendChild(payTitle);
    document.getElementById("payTitleDiv").appendChild(payPTitle);
    localStorage.myConcoursID = id;
    getAllConcoursDirect();
   
}
//==========================================================================================================================================
function getAllConcoursDirect(){
    
    if(localStorage.getItem("profession")=="Direct"){
    setUser();
    //api url for login verification
    //api url for login verification
    var url = SERVER_URL2+ '/exams/getall';
    
    concours = [];
    nomConcours = [];
    nomMinistere = [];
    nomCycle = [];
    nomAcademique = [];
    decretConcours = [];
    
    var count = 0;
    
// Login  method implementation:
async function postData(data ={}) {

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    //----- JS CREATE HTML ELEMENT -----//
    concours.length = 0;
    nomMinistere.length = 0;
    var i;
    
            var select = document.createElement("select");
            
            select.className = "form-control-chosen form-control";
            
            select.id = "modifyConcoursTemp";
    
            var option = document.createElement("option");
            option.text = "Selectionner le nouveau concours";
            option.value = "";
            
            select.appendChild(option); 
    
    for (i = 0; i < data.data.length; i++) {
        
         //creating the tags
        //=====================================================================
        //create article div
        var article = document.createElement("article");
        article.className = "noo_job hentry";
        article.id = data.data[i].id;
        //=====================================================================
        //create the div loop-item-wrap
        var divLoopWrap = document.createElement("div");
        divLoopWrap.className = "loop-item-wrap";
        //=====================================================================
        //create the div loop-item-content
        var divLoopContent = document.createElement("div");
        divLoopContent.className = "loop-item-content";
    
        //create the div loop-item-title
        var divLooptitle = document.createElement("H2");
        divLooptitle.className = "loop-item-title";
    
        //create the div title
        var titleTag = document.createElement("a");
        //=====================================================================
        //create the div content-meta
        var contentMeta = document.createElement("p");
        contentMeta.className = "content-meta";
        //=====================================================================
        //ministry name
        var ministry = document.createElement("span");
        ministry.className = "job-company";
        var ministryText = document.createElement("a");
        var ministryIcon = document.createElement("i");
        ministryIcon.className = "fa fa-map-marker";
        //=====================================================================
        //date of concours
        var date = document.createElement("span");
        //=====================================================================
        //date of concours
        var time = document.createElement("time");
        time.className = "entry-date";
        //=====================================================================
        //date of concours
        var divSee = document.createElement("div");
        divSee.className = "show-view-more";
        //=====================================================================
        //button see more 
        var seeMore = document.createElement("a");
        seeMore.className = "btn btn-primary";
        seeMore.href = "Concours_Informations.html";
        seeMore.id = i;
        seeMore.type = "reset";
        seeMore.setAttribute("onclick","saveConcoursInfo("+data.data[i].id+")");
        //=====================================================================
        //button see more 
        var iconDate = document.createElement("i");
        iconDate.setAttribute("class","fa fa-calendar");
        //=====================================================================
        //ministry name
        var niveauEtude = document.createElement("span");
        niveauEtude.className = "job-company";
        var niveauEtudeText = document.createElement("a");
        var niveauEtudeIcon = document.createElement("i");
        niveauEtudeIcon.className = "fa fa-graduation-cap";
        //=====================================================================
        //ministry name
        var niveauCycle = document.createElement("span");
        niveauCycle.className = "job-company";
        var niveauCycleText = document.createElement("a");
        var niveauCycleIcon = document.createElement("i");
        niveauCycleIcon.className = "fa fa-repeat";
        //=====================================================================
        var spaceConcours = document.createElement("br");
        //creating image 
       // var imageFeatured = document.createElement("item-featured");
        //var aImgage = document.createElement("a");
       // var image = document.createElement("img");
        //image.width = "50";
        //image.height = "50";
        //image.src = "../images/BF.png";
        //setting the div ids 
        //=====================================================================
        
        //=====================================================================
        //adding the values concours values
        //=====================================================================
        //conocours name tree
        titleTag.appendChild(document.createTextNode(data.data[i].displayname));
        divLooptitle.appendChild(titleTag);
        
        //minstry name tree
        ministryText.appendChild(document.createTextNode(data.data[i].ministereacronyme));
        ministry.appendChild(ministryIcon);
        ministry.appendChild(ministryText);
        
        
        if(i == 217)
            niveauEtudeText.appendChild(document.createTextNode("BEPC"));
        else 
            niveauEtudeText.appendChild(document.createTextNode(data.data[i].degree));
        
        niveauEtude.appendChild(niveauEtudeIcon);
        niveauEtude.appendChild(niveauEtudeText);
        
        //cycle level
        niveauCycleText.appendChild(document.createTextNode(data.data[i].cycle));
        niveauCycle.appendChild(niveauCycleIcon);
        niveauCycle.appendChild(niveauCycleText);
        
        //date tree 
        time.appendChild(iconDate);
        //time.appendChild(document.createTextNode(data.data[i].date));
        time.appendChild(document.createTextNode("Fermeture le 07-10-2021"));
        date.appendChild(time);
        
        //button tree
        seeMore.appendChild(document.createTextNode("Voir"));
        divSee.appendChild(seeMore);
        
        contentMeta.appendChild(ministry);
        contentMeta.appendChild(niveauEtude);
        contentMeta.appendChild(niveauCycle);
        contentMeta.appendChild(date);
        
        divLoopContent.appendChild(divLooptitle);
        divLoopContent.appendChild(contentMeta);
      
        divLoopWrap.appendChild(divLoopContent);
        divLoopWrap.appendChild(divSee);
        
        article.appendChild(divLoopWrap);
        
        
        
            
        nomConcours.push(data.data[i].displayname);
        nomMinistere.push(data.data[i].ministere);
        
        if(nomConcours[i] == "Assistants de la Garde de Sécurité Penitentiaire")
            nomAcademique.push("BEPC");
        else 
            nomAcademique.push(data.data[i].degree);
            
        nomCycle.push(data.data[i].cycle);
        descriptionConcours.push(data.data[i].description);
        typeConcours.push(data.data[i].type);
        dateConcours.push(data.data[i].date);
        
        if(data.data[i].reference == "CONT_ETAT_COM_POL_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_COM_POL_ASCE-LC.pdf");
        }else if(data.data[i].reference == "CONT_ETAT_INSP_DOUA_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_INSP_DOUA_ASCE-LC.pdf");
        }else if(data.data[i].reference == "CONT_ETAT_INSP_IMP_ASCE/LC"){
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/CONT_ETAT_INSP_IMP_ASCE-LC.pdf");
        }else{    
            decretConcours.push("https://cs210033fffa46718b6.blob.core.windows.net/communiqueburkina/"+data.data[i].reference+".pdf");
        }
        
        
        //adding concours to array
        concours.push(article);
        
        if(((((data.data[i].type).toLowerCase()).search("direct")>=0) )|| data.data[i].name == "ASS_GSP_MJ"){
           
            concoursPro.push(data.data[i].id);
            
            //console.log(data.data[i].id);
       //console.log(nomConcours[data.data[i].id]);
        //document.getElementById("wrap-concours").appendChild(article); 
        //=====================================================================
            
            
            var option = document.createElement("option");
            option.text = data.data[i].displayname;
            option.value = data.data[i].id;
            select.appendChild(option); 
            
        document.getElementById("newConcoursSelection").appendChild(select); 
            
            
        }
    }
    
});
    }
}
//==========================================================================================================================================
function updateCenter(){
    
//api url for login verification
    var url = 'https://burkinaproxy3.herokuapp.com/https://test.fofoafrica.net/api/v1/admin/candidate/exam/change';
    
    if(document.getElementById('compositionCenter').value != ""){
        localStorage.compositionCenter = document.getElementById('compositionCenter').value;
        
        if(document.getElementById('compositionCenter').value =="KADIOGO"){    

            localStorage.subCenters =  "CENTRE DE OUAGADOUGOU";
        }else if(document.getElementById('compositionCenter').value =="HOUET"){    

            localStorage.subCenters =  "CENTRE DE BOBO-DIOULASSO";
        }else if(document.getElementById('compositionCenter').value =="BOULKIEMDE"){    

            localStorage.subCenters =  "CENTRE DE KOUDOUGOU";
        }else if(document.getElementById('compositionCenter').value =="BOULGOU"){    

            localStorage.subCenters =  "CENTRE DE TENKODOGO";
        }else if(document.getElementById('compositionCenter').value =="MOUHOUN"){    

            localStorage.subCenters =  "CENTRE DE DEDOUGOU";
        }else if(document.getElementById('compositionCenter').value =="COMOE"){    

            localStorage.subCenters =  "CENTRE DE BANFORA";
        }else if(document.getElementById('compositionCenter').value =="GOURMA"){    

            localStorage.subCenters =  "CENTRE DE FADA NGOURMA";
        }else if(document.getElementById('compositionCenter').value =="YATENGA"){    

            localStorage.subCenters =  "CENTRE DE OUAHIGOUYA";
        }else if(document.getElementById('compositionCenter').value =="ZOUNDWEOGO"){    

            localStorage.subCenters =  "CENTRE DE MANGA";
        }else if(document.getElementById('compositionCenter').value =="OUBRITENGA"){    

            localStorage.subCenters =  "CENTRE DE ZINIARE";
        }else if(document.getElementById('compositionCenter').value =="SANMATENGA"){    

            localStorage.subCenters =  "CENTRE DE KAYA";
        }else if(document.getElementById('compositionCenter').value =="SENO"){    

            localStorage.subCenters =  "CENTRE DE DORI";
        }else if(document.getElementById('compositionCenter').value =="PONI"){    

            localStorage.subCenters =  "CENTRE DE GAOUA";
        }
    }
// Login  method implementation:
async function postData(data ={}) {
    
    
    data.exam_id = localStorage.getItem("concoursID");
    data.candidat_id = localStorage.getItem("userid");
    data.centre = localStorage.getItem("compositionCenter");
    data.souscentre = localStorage.getItem("subCenters");

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(response);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
      console.log(data);
    if(data.code == 201){
        alert("Le centre de composition a été modifié.");
        window.location.href = "candidat_concours.html";
    }else{
        alert("Une erreur est survenue, veuillez essayer plus tard.");
        
    }
});
   
}
//==========================================================================================================================================
function findMyConcours(){  
     setUser();

    var i;
    var id = localStorage.getItem("concoursID");
    
    
    console.log(id);
    // reference to 'scripts' select list 
    // used throughout the examples below
    var sel = document.getElementById('modifyConcoursTemp').value;
    
    localStorage.correction_exam_id =  sel;
    
    //api url for login verification
    var url = SERVER_URL2+'/candidat/myexams';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.candidat_id= localStorage.getItem("userid");
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    for(var i = 0; i< data.data.exams.length;i++){
        
        console.log(data.data.exams[i]);
        if(data.data.exams[i].exam.id == id){
            console.log("in");
            localStorage.compositionCenter = data.data.exams[i].centre;
            localStorage.subCenters = data.data.exams[i].souscentre;
            updateConcours();
        }
    }
  });
    
    
}
//==========================================================================================================================================
function updateConcours(){
    
//api url for login verification
    var url = 'https://burkinaproxy3.herokuapp.com/https://test.fofoafrica.net/api/v1/admin/candidate/exam/change';
    
// Login  method implementation:
async function postData(data ={}) {
    
    
    data.exam_id = localStorage.getItem("concoursID");
    data.candidat_id = localStorage.getItem("userid");
    data.centre = localStorage.getItem("compositionCenter");
    data.souscentre = localStorage.getItem("subCenters");
    data.correction_exam_id = localStorage.getItem("correction_exam_id");
    
    
    console.log(data);

  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(response);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
      console.log(data);
    if(data.code == 201){
        alert("Le concours a été modifié.");
        window.location.href = "candidat_concours.html";
    }else if(data.code == 403){
        alert("Le concours existe déjà dans votre liste, veuillez vérifier.");
        window.location.href = "candidat_concours.html";
    }else{
        alert("Une erreur est survenue, veuillez essayer plus tard.");
        
    }
});
   
}
//==========================================================================================================================================
function Coris(){
    //api url for login verification
    var url = SERVER_URL2+ '/candidat/coris/request/pay';
    
    //store token
    var token;
try{
// Login  method implementation:
async function postData(data={}) {
    
    //setting verification data variables
    
    //var phone = localStorage.getItem("payTelephone");
    //var otp = localStorage.getItem('payCode');
    
    var phone = localStorage.getItem("payTelephone");
    var otp = localStorage.getItem('payCode');
    data.payTelephone = phone;
    data.payCode = otp;
    data.exam_id = (localStorage.getItem("concoursID"));
    data.candidat_id = localStorage.getItem("userid");
    data.centre =  localStorage.getItem("compositionCenter");
    data.souscentre = localStorage.getItem("subCenters");
    data.provider =  2;
    
  //fetching values to api for verification
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
    //console.log(data);
  return response.json(); 
}
//get data from api after successful login
postData({ login: true })
  .then(data => {
    
    if(data.code == 405){
        
        alert("Vous avez déjà postulé à ce concours!");
        window.location.href = "Candidat_Concours.html";
    }else if(data.code == 201){
        alert("Merci d'avoir postulé!");
        window.location.href = "Candidat_Concours.html"; 
    }else if(data.code == 402){
        alert("Ajout à l'examen a échoué");
    }
    
  });  
}catch(exception){
    
    alert("le paiement n'as pu etre effectuer, veuillez utiliser le meme code de validation recu ainsi que le numéro de teléphone.");
    window.history.back();
}
}
//==========================================================================================================================================
function concoursClosed(){
    
   alert("La fonctionnalité n'est plus en fonction, les modifications ne sont plus permise. Merci");
}
//==========================================================================================================================================
function redirectPay(){
    
         window.location.href = "pay.html";
}
//==========================================================================================================================================
function getIsRecipiceGood(){
    
    localStorage.modifyInfo = "false";
    isRecipiceGood = false;
    //setting the values in the textfield for the users
    document.getElementById("firstname").textContent = localStorage.getItem("firstname");
    document.getElementById("lastname").textContent = localStorage.getItem("lastname");
    document.getElementById("telephone").textContent = localStorage.getItem("telephone");
    document.getElementById("dateofbirth").textContent = localStorage.getItem("dateofbirth");
    document.getElementById("address").textContent = localStorage.getItem("address");
    document.getElementById("cnibnumber").textContent = localStorage.getItem("cnibnumber");
    document.getElementById("cnibdateissue").textContent = localStorage.getItem("cnibdateissue");
    //document.getElementById("cnibdateissue").textContent = localStorage.getItem("cnibdateissue");
    
    if(localStorage.getItem("sex") == "M")
        document.getElementById("sex").textContent = "Masculin";
    else
        document.getElementById("sex").textContent = "Feminin";
    
    document.getElementById("recepisse").textContent = localStorage.getItem("candidatecode");
  
    
    if(localStorage.getItem("sex")=='M')
        document.getElementById("sex").textContent = "Masculin";
    else
        document.getElementById("sex").textContent = "Feminin";
    
    
    //verifying the person has a maiden name
    if(localStorage.getItem("maidenname") == '-'){
        document.getElementById("maidenname").textContent = "";
    }else {
        document.getElementById("maidenname").textContent = localStorage.getItem("maidenname") ;
    }
    
    
    
    //api url for login verification
    var url = SERVER_URL2+'/candidat/myexams';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.candidat_id= localStorage.getItem("userid");
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    var myID = localStorage.getItem("userid");
    
    var myexam = "";
    var i;
    
    for(i=0;i<data.data.exams.length;i++){
        
        if(data.data.exams[i].exam.id == 421){
            isRecipiceGood = true;
            window.print();
            break;
    }
}
    if(isRecipiceGood == false)
     alert("Veuillez postuler à un concours présentement disponible avant de pouvoir imprimer votre récépicé!");
  });
    
}
//==========================================================================================================================================
function printRecipice(){
    
    getIsRecipiceGood();
    
    if(isRecipiceGood == true){
        
    }else{
       
    }
}
//==========================================================================================================================================
function findFonctionnaire(){
    
    
    if(document.getElementById("searchmatricule").value > "" && document.getElementById("searchlastname").value > ""){
      //api url for login verification
    var url = SERVER_URL2+'/admin/secured/getagentbymatricule';

// Login  method implementation:
async function postData(data ={}) {
    
    //setting verification data variables
    data.matricule= (document.getElementById("searchmatricule").value).split(' ').join('');
    data.lastname= (document.getElementById("searchlastname").value);
    
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  //response from the api
  return response.json(); 
}
//get data from api after successful login
postData({ change: true })
  .then(data => {
    
    console.log(data);
    if(data.success == false){
        alert("Le compte du fonctionnaire est inexistant.");
    }else{
        alert("le compte existe.");
    }
  });
    }else{
        alert("Veuillez remplir le champs vide");
    }
}