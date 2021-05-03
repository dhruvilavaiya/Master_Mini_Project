var i
firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc)=>{
    if(doc.data().Task==undefined){
        i=0           
    }
    else{
        i=doc.data().Task.length
    }
})

function add() {
    var ele1 = document.getElementById('text')
    if (ele1.value != "") {
        var ele = document.createElement('textarea')
        ele.id = `id${i}`
        ele.className = "todo"
        ele.style.position = "relative"
        ele.style.overflow = "hidden"
        ele.style.resize = "none"
        ele.rows = 2
        ele.maxLength = 37
        ele.style.marginTop = "20px"
        ele.style.marginLeft = "10px"
        ele.style.paddingLeft = "5px"
        ele.style.paddingTop = "10px"
        ele.style.color = "white"
        ele.style.width = "250px"
        ele.style.fontSize = "18px"
        // ele.style.height="25px"
        ele.style.backgroundColor = "Transparent";
        // ele.style.borderRadius="7px"
        ele.style.outline = "none";
        ele.style.border = "none";
        ele.style.borderBottom = "2px solid white"
        ele.value = ele1.value
        ele.disabled = true
        if (ele1.value.length <= ele.maxLength) {
            document.body.appendChild(ele)
        }
        else {
            alert("Your task should be short(lessthan 37 characters..)")
        }

        var delele = document.createElement("i")
        delele.classList = "far fa-trash-alt fa-2x"
        delele.style.marginLeft = "10px"
        delele.style.color = "white"
        delele.id = `j${i}`
        document.body.appendChild(delele)
        delele.onclick = edit

        var doneele = document.createElement("i")
        doneele.classList = "fas fa-check fa-2x do"
        doneele.style.marginLeft = "10px"
        doneele.id = `k${i}`
        doneele.style.color = "white"
        document.body.appendChild(doneele)
        doneele.onclick = done
        function done() {
            //   console.log(doneele);
            doneele.style.color = "#7fff00"
            var c = this.id
            var d = c[1]
            var sel_t_area = document.getElementById(`id${d}`)
            console.log(sel_t_area);
            sel_t_area.disabled = false
            sel_t_area.style.textDecoration = "line-through"
            updateStatus(sel_t_area)

        }
        function edit() {
            var a = this.id
            var b = a[1]
            var sel_t_area = document.getElementById(`id${b}`)
            // console.log(sel_t_area);
            var sel_del_ele = document.getElementById(a)
            var sel_done_ele = document.getElementById(`k${b}`)
            sel_done_ele.remove()
            sel_del_ele.remove()
            sel_t_area.remove()
            
            removetask(sel_t_area,sel_done_ele,sel_del_ele)
        }
        i += 1
        console.log(i);

    }
    else {
        alert('plase enter your task...!')
    }
    var br = document.createElement('br')
    br.id=`br${i-1}`
    document.body.appendChild(br)

    addData(ele1.value)
    // firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc)=>{
    //     if(doc.data().length==0){
    //         addData(ele1.value)
    //         firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).update({
    //             length:1
    //         })
    //     }
    //     else{
    //         firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc)=>{
    //         for(let s=0;s<doc.data().Task.length;s++){
    //             if(ele1.value==doc.data().Task[s].msg){
    //                 alert("Task is already exist..")
    //                 break;
    //             }
    //             else{
    //                 console.log("object");
    //             }
    //         }
    //         })
    //     }
    // })    

}
function removetask(t_area,done_ele,del_ele) {
    let a=t_area.id[2]
    let br=document.getElementById(`br${a}`)
    br.remove()
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
        for(let s=0;s<doc.data().Task.length;s++){
            if(t_area.value==doc.data().Task[s].msg)
            {
                let sts=doc.data().Task[s].status
                firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).update({
                    Task: firebase.firestore.FieldValue.arrayRemove({
                        msg: t_area.value,
                        status:sts
                    })
                })
            }
        }
   })
}
function addData(message) {
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).update({
        Task: firebase.firestore.FieldValue.arrayUnion({
            msg: message,
            status: 'pending'
        })
    })
}

function updateStatus(t_area) {
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
        for(let s=0;s<doc.data().Task.length;s++){
            if(t_area.value==doc.data().Task[s].msg)
            {
                firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).update({
                    Task: firebase.firestore.FieldValue.arrayRemove({
                        msg: t_area.value,
                        status: 'pending'
                    })
                })
                firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).update({
                    Task: firebase.firestore.FieldValue.arrayUnion({
                        msg: t_area.value,
                        status: 'done'
                    })
                })
            }
        }
    })
    
}
function retrive(s,data) {
    
    var ele = document.createElement('textarea')
    ele.id = `id${s}`
    ele.className = "todo"
    ele.style.position = "relative"
    ele.style.overflow = "hidden"
    ele.style.resize = "none"
    ele.rows = 2
    ele.maxLength = 37
    ele.style.marginTop = "20px"
    ele.style.marginLeft = "10px"
    ele.style.paddingLeft = "5px"
    ele.style.paddingTop = "10px"
    ele.style.color = "white"
    ele.style.width = "250px"
    ele.style.fontSize = "18px"
    // ele.style.height="25px"
    ele.style.backgroundColor = "Transparent";
    // ele.style.borderRadius="7px"
    ele.style.outline = "none";
    ele.style.border = "none";
    ele.style.borderBottom = "2px solid white"
    ele.value = data.Task[s].msg
    // hello2(ele)
    ele.disabled = true
    
   document.body.appendChild(ele)

    var delele = document.createElement("i")
    delele.classList = "far fa-trash-alt fa-2x"
    delele.style.marginLeft = "10px"
    delele.style.color="white"
    delele.id = `j${s}`
    document.body.appendChild(delele)
    delele.onclick = edit
   
    var doneele = document.createElement("i")
    doneele.classList = "fas fa-check fa-2x do"
    doneele.style.marginLeft = "10px"
    doneele.id = `k${s}`
    doneele.style.color = "white"
    
    document.body.appendChild(doneele)
    doneele.onclick = done
    function done() {
        
        doneele.style.color = "#7fff00"
        var c = this.id
        var d = c[1]
        var sel_t_area = document.getElementById(`id${d}`)
        console.log(sel_t_area);
        sel_t_area.disabled = false
        sel_t_area.style.textDecoration = "line-through"
        updateStatus(sel_t_area)
    }
    function edit() {
        var a = this.id
        var b = a[1]
        var sel_t_area = document.getElementById(`id${b}`)
        var sel_del_ele = document.getElementById(a)
        var sel_done_ele=document.getElementById(`k${b}`)
        sel_done_ele.remove()
        sel_del_ele.remove()
        sel_t_area.remove()
        removetask(sel_t_area,sel_done_ele,sel_del_ele)

        
    }
    var br = document.createElement('br')
    br.id=`br${s}`
    document.body.appendChild(br)
    if(data.Task[s].status=="done"){
        ele.style.textDecoration="line-through"
        doneele.style.color="#7fff00"
    }
}
var spinner = $('#loader'); 
window.onload = main()
function main() {
    
    spinner.show()
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
        if(doc.data().Task!=undefined){
        for (let s = 0; s < doc.data().Task.length; s++) {
            retrive(s,doc.data())
            
        }
    }
    spinner.hide()
    })
    
}

