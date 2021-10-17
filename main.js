

var couseApi='http://localhost:3000/sinhvien';

// Start ung dung
function start(){
    getStudent(renderListStudent);
    handleCraeteForm();
}
start();

// get List Students
function getStudent(callback){
    fetch(couseApi)
    .then(function(response){
        // json parse=> Javascript
        return response.json();
    })
    .then(callback)

}
// create courses
function createCourses(data,callback){
    var options={
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(data)
    }
    fetch(couseApi,options)
    .then(function(response){
         response.json()
    })
    .then(callback)

}
// Render ListStudents
function renderListStudent(listStudent){
    var listStudents=document.querySelector("#liststudent");
    var htmls=listStudent.map(function(student){
        return `<li class="student-${student.id}">
            <h5 class="student-mssv-${student.id}">${student.mssv}</h5>
            <h5 class="student-name-${student.id}">${student.name}</h5>
            <button onclick="deleteStudent(${student.id})">Xóa</button>
            <button onclick="changeStudent(${student.id})">Sửa</button>
        </li>`
    })
    listStudents.innerHTML=htmls.join('')
}
// handleForm
function handleCraeteForm(){
    var createBtn=document.querySelector("#create");
    createBtn.onclick=function(){
        var mssv=document.querySelector('input[name="mssv"]').value
        var name=document.querySelector('input[name="name"]').value
        var formData={
            mssv:mssv,
            name:name
        }
        createCourses(formData,  getStudent(renderListStudent)
        )
        
    }

}
// Xóa học sinh
function deleteStudent(studentid){
    var options={
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        
    }
    fetch(couseApi+"/"+studentid,options)
    .then(function(response){
        response.json()
    })
    .then(function(){
       var student= document.querySelector('.student-'+studentid)
        if(student){
            student.remove();
        }
    })



}
// change student
function changeStudent(idStudent){
    alert(idStudent)
    var mssv=document.querySelector('.student-mssv-'+idStudent)
    var name=document.querySelector('.student-name-'+idStudent)
    // the input
    var inputmssv=document.querySelector('input[name="mssv"]')
    var inputname=document.querySelector('input[name="name"]')
    inputmssv.value=mssv.innerText;
    inputname.value=name.innerText;
    var createBtn=document.querySelector("#create");
    createBtn.innerHTML="Save"
    createBtn.onclick=function(){
            var data={
                mssv: inputmssv.value,
                name: inputname.value
            }
            updateSinhVien(data, getStudent(renderListStudent),idStudent)

    }
}
function updateSinhVien(data,callback,idStudent){

    var options={
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:JSON.stringify(data)
        
    }
    fetch(couseApi+"/"+idStudent,options)
    .then(function(response){
        response.json()
    })
   .then(callback)
}