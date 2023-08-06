
document.addEventListener("DOMContentLoaded", readAllStudents);

function readAllStudents(){
    axios.get("http://localhost:3000/api/read")
    .then(function (response){
        let studentsNumber = response.data.length;
        let tabla = document.getElementById("studentList");

        for (let i = 0; i < studentsNumber; i++) {
    
            const actualStudent = response.data[i].student;
            let newRow = tabla.insertRow();
            let idCell = newRow.insertCell();   
            let nameCell = newRow.insertCell(); 
            let ageCell = newRow.insertCell(); 
            let gradeCell = newRow.insertCell();
            
            idCell.innerHTML  = actualStudent.ID;
            nameCell.innerHTML  = actualStudent.name;
            ageCell.innerHTML  = actualStudent.age;
            gradeCell.innerHTML  = actualStudent.grade;
        }
    })
    .catch(function (error){
        console.log(error);
    })
    .finally(function (){});
}


let form = document.getElementById("agregarAlumno");
form.addEventListener("submit", addStudent);

async function addStudent(event){
    event.preventDefault();
    let IDStudent = document.getElementById("ID").value;
    let name = document.getElementById("name").value;
    let grade = document.getElementById("grade").value;
    let age = document.getElementById("age").value;

    const student = {
        ID: IDStudent,
        name: name,
        grade: grade,
        age: age
    }
    console.log(student);
    console.log(form);

    try {
        const response = await axios.post("http://localhost:3000/api/create", student);
        console.log('Objeto agregado:', response.data);
    } catch (error) {
        console.error('Error al agregar el estudiante:', error);
    }
}
