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
            patient.appointments.push(examination);
            console.log(`${this.date} ${examination.type} appointment for the patient ${patient.firstName} ${patient.lastName} is set`)
        } else {
            console.log(`${this.date} Patient ${patient.firstName} ${patient.lastName} is not one of your patients.`)
        }
    }
}

class Patient extends Person {
    private birthId: number;
    private registerNumber: number;
    doctor: Doctor;
    appointments: MedicalExamination[];

    constructor(firstName: string, lastName: string, birthId: number, registerNumber: number){
        super(firstName, lastName);
        this.birthId = birthId;
        this.registerNumber = registerNumber;
        this.doctor = null;
        this.appointments = [];
    }

    setPatient(){
        console.log(`${this.date} Patient ${this.firstName} ${this.lastName} is created.`)    
    }

    chooseDoctor(doctor: Doctor){
        if (!this.doctor){        
            this.doctor = doctor;
            doctor.patients.push(this);
            console.log(`${this.date} Patient ${this.firstName} ${this.lastName} chose doctor ${doctor.firstName} ${doctor.lastName}`);
        } else {
            console.log(`${this.date} Patient ${this.firstName} has already chosen a doctor.`)
        }  
    }

    getExaminaton(examination: MedicalExamination, data: object){
        if (this.appointments.indexOf(examination) != -1){
            console.log(`${this.date} Patient ${this.firstName}:`, examination.examine(data)); 
            this.appointments.splice(this.appointments.indexOf(examination), 1) 
        } else {
            console.log(`${this.date} ${this.firstName} doesn't have an appointment for ${examination.type} examination.`)
        }
    }
}

abstract class MedicalExamination {
    type: string;
    date: Date;

    constructor(type: string){
        this.type = type;
        this.date = new Date();
    }
    abstract examine(data: object): void;

}

class BloodPressureExamination extends MedicalExamination{
    topValue: number;
    bottomValue: number;
    pulse: number;

    constructor(type: string){
        super(type);
    }

    examine(data: object){
        this.topValue = data['topValue'];
        this.bottomValue = data['bottomValue'];
        this.pulse = data['pulse'];
        return `Blood pressure examination is being maintained.
            Top value: ${this.topValue}
            Bottom value: ${this.bottomValue}
            Pulse: ${this.pulse}`;    
    }

}

class BloodSugarLevelExamination extends MedicalExamination{
    value: number; 
    lastMealTime: string; 

    constructor(type: string){
        super(type);
    }

    examine(data: object){
        this.value = data['value'];
        this.lastMealTime = data['lastMealTime'];
        return `Blood sugar level examination is being maintained.
            Value: ${this.value}
            Time of last meal: ${this.lastMealTime}`;
    }
}

class BloodCholesteroleLevel extends MedicalExamination {
    value: number; 
    lastMealTime: string;

    constructor(type: string){
        super(type);
    }

    examine(data: object){
        this.value = data['value'];
        this.lastMealTime = data['lastMealTime'];
        return `Blood cholesterole level examination is being maintained.
            Value: ${this.value}
            Time of last meal: ${this.lastMealTime}`;
    }
}

let doctor1 = new Doctor('Milan', 'Milanovic', 'cardiologist');
let doctor2 = new Doctor('Petar', 'Petrovic', 'neurospecialist');
let patient1 = new Patient('Dragan', 'Dragic', 123456789, 123);
let patient2 = new Patient('Marko', 'Markovic', 123456789, 123);

let bloodSugarExamination = new BloodSugarLevelExamination('Blood sugar level');
let bloodPressureExamination = new BloodPressureExamination('Blood pressure');
let bloodCholesteroleExamination = new BloodCholesteroleLevel('Blood cholesterole');


doctor1.setDoctor();
patient1.setPatient();
patient1.chooseDoctor(doctor1);
patient1.chooseDoctor(doctor2);
patient2.chooseDoctor(doctor1);

//console.log(doctor1.patients)

doctor1.setAppointment(patient1, bloodSugarExamination);
//doctor1.setAppointment(patient2, bloodSugarExamination);
doctor1.setAppointment(patient1, bloodPressureExamination);
//console.log(patient1.appointments)

patient1.getExaminaton(bloodSugarExamination, {
    value: 55, lastMealTime: '11h'
});
patient2.getExaminaton(bloodSugarExamination, {
    value: 59, lastMealTime: '12h'
});
patient1.getExaminaton(bloodPressureExamination, {
    topValue: 100, bottomValue: 50, pulse: 120
});
patient1.getExaminaton(bloodSugarExamination, {
    value: 60, lastMealTime: '12h'
});




