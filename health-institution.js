class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.date = new Date();
    }
}
class Doctor extends Person {
    constructor(firstName, lastName, specialty) {
        super(firstName, lastName);
        this.specialty = specialty;
        this.patients = [];
    }
    setDoctor() {
        console.log(`${this.date} Doctor ${this.firstName} ${this.lastName} is created.`);
    }
    addPatient(patient) {
        this.patients.push(patient);
        console.log(`${this.date} Patient ${patient.firstName} ${patient.lastName} is added to doctor ${this.firstName}'s list.`);
    }
    setAppointment(patient, examination) {
        if (this.patients.indexOf(patient) != -1) {
            console.log(`${this.date} ${examination.type} appointment for the patient ${patient.firstName} ${patient.lastName} is set`);
        }
        else {
            console.log(`Patient ${patient.firstName} ${patient.lastName} is not one of your patients.`);
        }
    }
}
class Patient extends Person {
    constructor(firstName, lastName, birthId, registerNumber) {
        super(firstName, lastName);
        this.birthId = birthId;
        this.registerNumber = registerNumber;
        this.doctor = null;
    }
    setPatient() {
        console.log(`${this.date} Patient ${this.firstName} ${this.lastName} is created.`);
    }
    chooseDoctor(doctor) {
        if (!this.doctor) {
            this.doctor = doctor;
            console.log(`${this.date} Patient ${this.firstName} ${this.lastName} chose doctor ${doctor.firstName} ${doctor.lastName}`);
        }
        else {
            console.log('You have already chosen a doctor.');
        }
    }
    getExaminaton(examination, data) {
        console.log(examination.exam(data));
        //console.log('Examination is finished.')
    }
}
class MedicalExamination {
    constructor(type) {
        this.type = type;
    }
}
class BloodPressureExamination extends MedicalExamination {
    constructor(type) {
        super(type);
    }
    exam(data) {
        this.topValue = data['topValue'];
        this.bottomValue = data['bottomValue'];
        this.pulse = data['pulse'];
        return 'Blood pressure examination is being maintained.';
    }
}
class BloodSugarLevelExamination extends MedicalExamination {
    constructor(type) {
        super(type);
    }
    exam(data) {
        this.value = data['value'];
        this.lastMealTime = data['lastMealTime'];
        return 'Blood sugar level examination is being maintained.';
    }
}
class BloodCholesteroleLevel extends MedicalExamination {
    constructor(type) {
        super(type);
    }
    exam(data) {
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
console.log(doctor1.patients);
