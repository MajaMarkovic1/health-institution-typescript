

class Person {
    firstName: string;
    lastName: string;
    date: Date;

    constructor(firstName: string, lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.date = new Date();
    }
    
}

class Doctor extends Person{
    specialty: string;
    patients: Patient[];

    constructor(firstName: string, lastName: string, specialty: string){
        super(firstName, lastName);
        this.specialty = specialty;
        this.patients = [];
    }

    setDoctor(){
        console.log(`${this.date} Doctor ${this.firstName} ${this.lastName} is created.`)    
    }

    addPatient(patient: Patient){
        this.patients.push(patient);
        console.log(`${this.date} Patient ${patient.firstName} ${patient.lastName} is added to doctor ${this.firstName}'s list.`)
    }

    setAppointment(patient: Patient, examination: MedicalExamination){
        if (this.patients.indexOf(patient) != -1){
            console.log(`${this.date} ${examination.type} appointment for the patient ${patient.firstName} ${patient.lastName} is set`)
        } else {
            console.log(`Patient ${patient.firstName} ${patient.lastName} is not one of your patients.`)
        }
    }
}

class Patient extends Person {
    private birthId: number;
    private registerNumber: number;
    doctor: Doctor;

    constructor(firstName: string, lastName: string, birthId: number, registerNumber: number){
        super(firstName, lastName);
        this.birthId = birthId;
        this.registerNumber = registerNumber;
        this.doctor = null;
    }

    setPatient(){
        console.log(`${this.date} Patient ${this.firstName} ${this.lastName} is created.`)    
    }

    chooseDoctor(doctor: Doctor){
        if (!this.doctor){        
            this.doctor = doctor;
            console.log(`${this.date} Patient ${this.firstName} ${this.lastName} chose doctor ${doctor.firstName} ${doctor.lastName}`);
        } else {
            console.log('You have already chosen a doctor.')
        }
        
    }

    getExaminaton(examination: MedicalExamination, data: object){
        console.log(examination.exam(data));
        //console.log('Examination is finished.')
    }
}

abstract class MedicalExamination {
    type: string;

    constructor(type: string){
        this.type = type;
    }
    abstract exam(data: object): void;

}

class BloodPressureExamination extends MedicalExamination{
    topValue: number;
    bottomValue: number;
    pulse: number;

    constructor(type: string){
        super(type);
    }

    exam(data: object){
        this.topValue = data['topValue'];
        this.bottomValue = data['bottomValue'];
        this.pulse = data['pulse'];
        return 'Blood pressure examination is being maintained.';
        
    }

}

class BloodSugarLevelExamination extends MedicalExamination{
    value: number; 
    lastMealTime: string; 

    constructor(type: string){
        super(type);
    }

    exam(data: object){
        this.value = data['value'];
        this.lastMealTime = data['lastMealTime'];
        return 'Blood sugar level examination is being maintained.';
    }
}

class BloodCholesteroleLevel extends MedicalExamination {
    value: number; 
    lastMealTime: string;

    constructor(type: string){
        super(type);
    }

    exam(data: object){
        this.value = data['value'];
        this.lastMealTime = data['lastMealTime'];
        return 'Bllod cholesterole level is being maintained.';
    }
}


let doctor1 = new Doctor('Milan', 'Milanovic', 'cardiologist');
let doctor2 = new Doctor('Petar', 'Petrovic', 'neurospecialist');
let patient1 = new Patient('Dragan', 'Dragic', 123456789, 123);

let exam1 = new BloodSugarLevelExamination('Blood sugar level');
let exam2 = new BloodPressureExamination('Blood pressure');
let exam3 = new BloodCholesteroleLevel('Blood cholesterole');


doctor1.setDoctor();
patient1.setPatient();
patient1.chooseDoctor(doctor1);
patient1.chooseDoctor(doctor2);

doctor1.addPatient(patient1);
doctor1.setAppointment(patient1, exam1);
doctor1.setAppointment(patient1, exam2);
patient1.getExaminaton(exam1, {
    value: 55, lastMealTime: '11h'
});


console.log(doctor1.patients)


