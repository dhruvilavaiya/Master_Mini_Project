
function fun() {
    var a = document.getElementById('email');
    var email = a.value;
    var b = document.getElementById('pass');
    var pass = b.value;
    var name=document.getElementById('name')
    var phone=document.getElementById('phone')
    console.log(email);
    console.log(pass);
    
    if(email=="" || pass=="" || name.value==""|| phone.value==""){
        alert("please enter all details....")
    }
    else{
        console.log("hi");
        console.log(email);
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && email[0]!='.' && email[email.length-2]!='.')
  {
 
    spinner.show();
    firebase.auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((userCredential)=>{
            // console.log(userCredential.user.uid);
            localStorage.setItem('uid',userCredential.user.uid)
            setTimeout(wait,3000) 
            setTimeout(Redirect,5000)   

          })
        .catch(function (error) {
            if (error.code == "auth/email-already-in-use" || error.code == "auth/weak-password" || error.code == "auth/invalid-emai") {
                spinner.hide(100,function(){
                alert(error.message);
                });
            }
           
        });
  }
  else{
        alert("You have entered an invalid email address!");    
    }
    function wait() {
        firebase.firestore().collection('signup_user/').doc(localStorage.getItem('uid')).set({
            Name:name.value,
            Email:email,
            Password:pass,
            Phone:phone.value,
            // length:0
        })        
    }
    
    function Redirect(){
        window.location.href = "to_do.html"
      }
       
    }
}

function logout() {
    
    firebase.auth()
    .signOut()
    console.log("logged out...");   
    localStorage.removeItem('uid')
    window.location.href="index.html"

}

function Read() {
    // firebase.firestore().collection("signup_user").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data().Name +' '+ doc.data().Email}`);
    //     });
    // });
    firebase.firestore().collection("signup_user").doc(localStorage.getItem('uid')).get().then((doc)=>{
        console.log(doc.data());
        var ele=document.getElementById("demo")
        // ele.innerHTML=`Email= ${doc.data().Email} <br> Name= ${doc.data().Name}<br>Phone= ${doc.data().Phone}`
    })
    window.location.href="profile.html"

}