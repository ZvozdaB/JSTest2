const DB = [
    {
        p_key: 'CONFIG',
        s_key: 'main',
        data: {
            unis: [
                {
                    uni: 'STG',
                    urlPrefix: 'https://stg.com',
                    studentUrl: 'https://{STUDENT_NUMBER}.stg.com',
                    adminLink: 'https://admin-{ADMIN_NUMBER}.stg.com'
                },
                {
                    uni: 'OI',
                    urlPrefix: 'https://oi.com',
                    studentUrl: 'https://{STUDENT_NUMBER}.oi.com',
                    adminLink: 'https://admin-{ADMIN_NUMBER}.oi.com'
                }
            ]
        }
    },

    { p_key: 'STG#CONFIG', university_name: 'Staging' },
    { p_key: 'OI#CONFIG', university_name: 'Oxford international' },

    { p_key: 'STG#1000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 1' } },
    { p_key: 'OI#2000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 2' } },
    { p_key: 'STG#4000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 4' } },
    { p_key: 'STG#5000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 5' } },

    { p_key: 'STG#1000', s_key: 'FINANCE', data: { deposit: 200 } },
    { p_key: 'OI#2000', s_key: 'FINANCE', data: { deposit: 400 } },
    { p_key: 'STG#4000', s_key: 'FINANCE', data: { deposit: 700 } },
    { p_key: 'STG#5000', s_key: 'FINANCE', data: { deposit: 100 } },

    { p_key: 'OI#MANAGER', s_key: 'main', hasAccess: ['2000'] },
    { p_key: 'STG#MANAGER', s_key: 'main', hasAccess: ['4000'] },

    { p_key: 'STG#1000', s_key: 'USER#STUDENT' },
    { p_key: 'OI#2000', s_key: 'USER#STUDENT' },
    { p_key: 'ADM#STG#3000', s_key: 'USER#ADMIN' },
    { p_key: 'STG#4000', s_key: 'USER#STUDENT' },
    { p_key: 'STG#5000', s_key: 'USER#STUDENT' },
    { p_key: 'ADM#OI#6000', s_key: 'USER#ADMIN' }
];



const getAllUsersByUni = uni => {
    function findURL(url, id, change) {
        let changeStart = url.indexOf(change);
        let newUrlStart = url.slice(0, changeStart);
        let newUrlEnd = url.slice(changeStart + change.length);
        let newUrl = newUrlStart + id + newUrlEnd
        return newUrl;
    }

    const uniObg = DB[0].data.unis.find(item => item.uni === uni);
    const universityData = DB.filter(item => item.p_key.includes(uni) );
    const university_name = universityData.find(item => item.university_name).university_name;

    const studentsID = universityData.filter(item => (item.s_key === 'USER#STUDENT')).map(item => item = item.p_key);
    const students = [];

    for(let i = 0; i < studentsID.length; i++){
        let studentData = {};
        studentData.studentNumber = studentsID[i].slice(uni.length + 1);
        studentData.uni = uni;
        studentData.studentUrl = findURL(uniObg.studentUrl, studentData.studentNumber, "{STUDENT_NUMBER}") ;
        studentData.name = universityData.find(item => item.p_key === studentsID[i] && item.data.name).data.name;
        studentData.deposit = universityData.find(item => item.p_key === studentsID[i] && item.data.deposit).data.deposit;
        students.push(studentData);
    }

    const adminID = universityData.filter(item => (item.s_key === 'USER#ADMIN')).map(item => item = item.p_key);
    
    let admins ={
        shortCode: 'ADM',
        list: []
    }

    for (let i = 0; i < adminID.length; i++){
        let adminData ={};
        adminData.id = adminID[i].slice(uni.length + 5 );
        adminData.link = findURL(uniObg.adminLink, adminData.id, "{ADMIN_NUMBER}");
        let studentHasAccess = universityData.find(item => item.hasAccess).hasAccess;
        adminData.students = [];
        for (let j = 0; j < studentHasAccess.length; j++){
            let studentsData = students.find(item => item.studentNumber === studentHasAccess[j]);
            let studentNumber = studentsData.studentNumber;
            let studentUrl = studentsData.studentUrl;
            adminData.students.push({ studentNumber, studentUrl,})
        }
        admins.list.push(adminData);
    }

    return { 
        uniUrl: uniObg.urlPrefix,
        uni: university_name,
        shortCode: uni,
        students: students, 
        admins, 
    }
};

const stgUsers = getAllUsersByUni("OI");
console.log(stgUsers)

