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


let formAgregarAlumno = document.getElementById("agregarAlumno");
formAgregarAlumno.addEventListener("submit", addStudent);

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

    try {
        const response = await axios.post("http://localhost:3000/api/create", student);
        console.log('Objeto agregado:', response.data);
    } catch (error) {
        console.error('Error al agregar el estudiante:', error);
    }
}


let formBorrarRegistro = document.getElementById("borrarRegistro");
formBorrarRegistro.addEventListener("submit", deleteStudent);

async function deleteStudent(event){
    event.preventDefault();
    let registerCode = document.getElementById("registerCode").value;

    try {
        const response = await axios.delete(`http://localhost:3000/api/delete/${registerCode}`);
        console.log('Estudiante eliminado:', response.data);
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
    }
}


let formActualizarAlumno = document.getElementById("actualizarAlumno");
formActualizarAlumno.addEventListener("submit", updateStudent);

async function updateStudent(event){
    event.preventDefault();
    let registerCode = document.getElementById("registerCode").value;
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

    try {
        const response = await axios.put(`http://localhost:3000/api/update/${registerCode}`, student);
        console.log('Estudiante eliminado:', response.data);
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
    }
}
