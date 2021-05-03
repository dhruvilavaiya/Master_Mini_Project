function retrive(r, result1) {
    var ele1 = document.getElementById('text')
    var ele = document.createElement('textarea')
    ele.id = `id${r - 1}`
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
    ele.value = result1[r - 1]
    // hello2(ele)
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
    delele.style.color="white"
    delele.id = `j${r - 1}`
    document.body.appendChild(delele)
    delele.onclick = edit
    function edit() {
        var a = this.id
        var b = a[1]
        var sel_t_area = document.getElementById(`id${b}`)
        var sel_del_ele = document.getElementById(a)
        del(sel_t_area, sel_del_ele, r)
        // console.log(sel_t_area);
        // sel_t_area.disabled = false
        // sel_t_area.focus()
    }
    var doneele = document.createElement("i")
    doneele.classList = "fas fa-check fa-2x do"
    doneele.style.marginLeft = "10px"
    doneele.id = `k${r - 1}`
    doneele.style.color = "white"
    hello2(ele, doneele)
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
        hello(sel_t_area)
        $('#loader').show()
    }

    var br = document.createElement('br')
    document.body.appendChild(br)


}

function del(sel_t_area, sel_del_ele, r) {
    $('#loader').show()
    // console.log(sel_del_ele);
    sel_t_area.remove()
    // console.log(sel_t_area);
    sel_del_ele.remove()

    var sel_done_ele=document.getElementById(`k${r - 1}`)
    sel_done_ele.remove()
    // console.log(document.getElementById(`k${r - 1}`));
    // console.log(r);
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
        var status = doc.data()
        console.log(status);
        var status1 = Object.entries(status);
        var status2 = []
        for (temp = 0; temp < status1.length; temp++) {
            if (status1[temp][0] != "length" && status1[temp][0] != "Name" && status1[temp][0] != "Email" && status1[temp][0] != "Password" && status1[temp][0] != "Phone") {
                status2.push(status1[temp])
            }
        }
        console.log(status2);
        var status4=[]
        for(temp=0;temp<status2.length;temp++){
            var status5=[]
            status5.push(status2[temp][0])
            status5.push(status2[temp][1].msg)
            status4.push(status5)
        }
        
        console.log(status4);
        
        for (s = 0; s < status4.length; s++) {
            if (sel_t_area.value == status4[s][1]) {
                var store=status4[s][0]
            }
        }
        console.log(store);
        firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).update({
            [store]: firebase.firestore.FieldValue.delete()
        })
        firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc)=>{
            firebase.firestore().collection('signup_user/').doc(localStorage.getItem('uid')).update({
                length: doc.data().length-1
        })  
        })
        
        wholeupdate(store)
        // function refresh() {
        //     location.reload()    
        // }
        // setTimeout(refresh,1000)
    })

}
function wholeupdate(store) {
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
        var status = doc.data()
        var store1=doc.data().length
        console.log(store);
        console.log(status);

        var status1 = Object.entries(status);
        var status2 = []
        for (temp = 0; temp < status1.length; temp++) {
            if (status1[temp][0] != "length" && status1[temp][0] != "Name" && status1[temp][0] != "Email" && status1[temp][0] != "Password" && status1[temp][0] != "Phone") {
                status2.push(status1[temp])
            }
        }
        // console.log(status2);
        var status3 = []
        for (temp = 0; temp < status2.length; temp++) {
            status3.push(Object.entries(status2[temp][1]))
            // status3.push(status2[temp][1]['status'])
        }
        // console.log(status3);
        var array1 = []
        for (let s = 0; s < status3.length; s++) {
            var array = []
            if (status3[s][0][0] == "msg") {
                array.push(status3[s][0][1])
                array.push(status3[s][1][1])

            }
            else {
                array.push(status3[s][1][1])
                array.push(status3[s][0][1])

            }
            array1.push(array)
        }
        console.log(array1);
        
        if(store[4]!=array1.length+1){
            var sp=`task${array1.length+1}`
            console.log("sp=",sp);
            firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).update({
                [sp]: firebase.firestore.FieldValue.delete()
            })  
        }
        for (q = 0; q < array1.length; q++) {
            key = `task${q + 1}`
            console.log(key);
            firebase.firestore().collection('signup_user/').doc(localStorage.getItem('uid')).update({
                [key]: {
                    msg: array1[q][0],
                    status: array1[q][1],
                }
            })
        }
    })
    function refresh() {
            location.reload()    
        }
        setTimeout(refresh,2000)
}
function hello2(ele, doneele) {
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
        var status = doc.data()
        // console.log(status);

        var status1 = Object.entries(status);
        var status2 = []
        for (temp = 0; temp < status1.length; temp++) {
            if (status1[temp][0] != "length" && status1[temp][0] != "Name" && status1[temp][0] != "Email" && status1[temp][0] != "Password" && status1[temp][0] != "Phone") {
                status2.push(status1[temp])
            }
        }
        // console.log(status2);
        var status3 = []
        for (temp = 0; temp < status2.length; temp++) {
            status3.push(Object.entries(status2[temp][1]))
            // status3.push(status2[temp][1]['status'])
        }
        // console.log(status3);
        var array1 = []
        for (let s = 0; s < status3.length; s++) {
            var array = []
            if (status3[s][0][0] == "msg") {
                array.push(status3[s][0][1])
                array.push(status3[s][1][1])

            }
            else {
                array.push(status3[s][1][1])
                array.push(status3[s][0][1])

            }
            array1.push(array)
        }
        console.log(array1);
        for (s = 0; s < array1.length; s++) {
            if (ele.value == array1[s][0]) {
                if (array1[s][1] == "done") {
                    ele.style.textDecoration = "line-through"
                    doneele.style.color = "#7fff00"
                }
            }
        }
    })
}
function hello(sel_t_area) {
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
        var status = doc.data()
        // console.log(status);

        var status1 = Object.entries(status);
        var status2 = []
        for (temp = 0; temp < status1.length; temp++) {
            if (status1[temp][0] != "length" && status1[temp][0] != "Name" && status1[temp][0] != "Email" && status1[temp][0] != "Password" && status1[temp][0] != "Phone") {
                status2.push(status1[temp])
            }
        }
        // console.log(status2);
        var status3 = []
        for (temp = 0; temp < status2.length; temp++) {
            status3.push(Object.entries(status2[temp][1]))
            // status3.push(status2[temp][1]['status'])
        }
        // console.log(status3);
        var array1 = []
        for (let s = 0; s < status3.length; s++) {
            var array = []
            if (status3[s][0][0] == "msg") {
                array.push(status3[s][0][1])
                array.push(status3[s][1][1])

            }
            else {
                array.push(status3[s][1][1])
                array.push(status3[s][0][1])

            }
            array1.push(array)
        }
        console.log(array1);
        for (q = 0; q < array1.length; q++) {
            if (sel_t_area.value == array1[q][0]) {

                array1[q][1] = "done"
                // array1[q][1] = `done${array1[q][1][7]}`
                // key=`task${q+1}`
                // console.log(key);
                // firebase.firestore().collection('signup_user/').doc(localStorage.getItem('uid')).update({
                //     [key]:{
                //         msg:array1[q][0],
                //         status:"done",
                //     }

                // })  
            }

        }
        for (q = 0; q < array1.length; q++) {
            key = `task${q + 1}`
            console.log(key);
            firebase.firestore().collection('signup_user/').doc(localStorage.getItem('uid')).update({
                [key]: {
                    msg: array1[q][0],
                    status: array1[q][1],
                }
            })
        }
        console.log(array1);

    })
    function refresh() {
        location.reload()    
    }
    setTimeout(refresh,2000)
}

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
        delele.style.color="white"
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
            hello(sel_t_area)
        }
        function edit() {
            var a = this.id
            var b = a[1]
            var sel_t_area = document.getElementById(`id${b}`)
            console.log(sel_t_area);
            var sel_del_ele = document.getElementById(a)
            var sel_done_ele = document.getElementById(`k${b}`)
            sel_done_ele.remove()
            sel_del_ele.remove()
            sel_t_area.remove()
        }
        i += 1
        console.log(i);

    }
    else {
        alert('plase enter your task...!')
    }
    var br = document.createElement('br')
    document.body.appendChild(br)

}
// var sel_ele=document.getElementById('add')
// sel_ele.addEventListener('click',addData)

function addData() {
    var ele1 = document.getElementById('text')
    console.log(ele1.value);
    if (ele1.value != "") {
        firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
            // var p=doc.data().length
            // console.log("p",p);
            // console.log(i);
            i = i + 1
            console.log(i);
            key = `task${i}`
            console.log(key);
            firebase.firestore().collection('signup_user/').doc(localStorage.getItem('uid')).update({
                [key]: {
                    msg: ele1.value,
                    status: `pending${i}`,
                }

            })
            i = i - 1
        })
    }
}


var i
firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
    i = doc.data().length
    // console.log(i);
})


//intialization of i from database
var todo = document.getElementById('add')
todo.addEventListener('click', ref1)
function ref1() {

    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {

        addData()
        setTimeout(add, 2000)
        function refresh() {
            location.reload()     
        }
        setTimeout(refresh,1000)   
    }
    else {
        addData()
        // add()
        setTimeout(add, 2000)
        function refresh() {
            location.reload()     
        }
        setTimeout(refresh,1000)   
    }
    firebase.firestore().collection('signup_user/').doc(localStorage.getItem('uid')).update({
        length: i + 1
    })
}


window.onload = main()

function main() {
    $('#loader').show();
    firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
        j = doc.data().length
        firebase.firestore().collection('signup_user').doc(localStorage.getItem('uid')).get().then((doc) => {
            var data = doc.data()
            console.log(data);
            var res = Object.entries(data);
            var result = []
            for (temp = 0; temp < res.length; temp++) {
                if (res[temp][0] != "length" && res[temp][0] != "Name" && res[temp][0] != "Email" && res[temp][0] != "Password" && res[temp][0] != "Phone") {
                    result.push(res[temp])
                }
            }
            // console.log(result);
            // console.log(result[0][1]['msg']);
            var result1 = []
            for (temp = 0; temp < result.length; temp++) {
                // console.log(result[temp][1]['msg']);
                result1.push(result[temp][1]['msg'])

            }

            if (j != 0) {
                for (let r = 1; r <= j; r++) {
                    retrive(r, result1)
                }
            }
            $('#loader').hide();

        })
    })
}
