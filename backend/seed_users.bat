@echo off
REM Fix existing wrong-email users and create missing ones

REM Fix Ashish Kumar - wrong email
curl -s -X PUT http://localhost:8080/api/users/1 -H "Content-Type: application/json" -d "{\"name\":\"Ashish Kumar\",\"email\":\"ashish.kumar@college.edu.in\",\"role\":\"Student\",\"dept\":\"CSE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"

REM Fix Riya Sharma - wrong email
curl -s -X PUT http://localhost:8080/api/users/3 -H "Content-Type: application/json" -d "{\"name\":\"Riya Sharma\",\"email\":\"riya.sharma@college.edu.in\",\"role\":\"Student\",\"dept\":\"ECE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"

REM Fix Arjun Mehta - wrong email
curl -s -X PUT http://localhost:8080/api/users/5 -H "Content-Type: application/json" -d "{\"name\":\"Arjun Mehta\",\"email\":\"arjun.mehta@college.edu.in\",\"role\":\"Student\",\"dept\":\"ME\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"

REM Create missing students
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Priya Patel\",\"email\":\"priya.patel@college.edu.in\",\"role\":\"Student\",\"dept\":\"CE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Rohit Kumar\",\"email\":\"rohit.kumar@college.edu.in\",\"role\":\"Student\",\"dept\":\"EEE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Sneha Das\",\"email\":\"sneha.das@college.edu.in\",\"role\":\"Student\",\"dept\":\"IT\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Vikram Singh\",\"email\":\"vikram.singh@college.edu.in\",\"role\":\"Student\",\"dept\":\"CSE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Anjali Nair\",\"email\":\"anjali.nair@college.edu.in\",\"role\":\"Student\",\"dept\":\"ECE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Kiran Rao\",\"email\":\"kiran.rao@college.edu.in\",\"role\":\"Student\",\"dept\":\"ME\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Deepak Jha\",\"email\":\"deepak.jha@college.edu.in\",\"role\":\"Student\",\"dept\":\"CE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Pooja Mishra\",\"email\":\"pooja.mishra@college.edu.in\",\"role\":\"Student\",\"dept\":\"EEE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Aditya Verma\",\"email\":\"aditya.verma@college.edu.in\",\"role\":\"Student\",\"dept\":\"IT\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Neha Gupta\",\"email\":\"neha.gupta@college.edu.in\",\"role\":\"Student\",\"dept\":\"CSE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Saurabh Yadav\",\"email\":\"saurabh.yadav@college.edu.in\",\"role\":\"Student\",\"dept\":\"ECE\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"
curl -s -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"Kavya Reddy\",\"email\":\"kavya.reddy@college.edu.in\",\"role\":\"Student\",\"dept\":\"ME\",\"status\":\"active\",\"joined\":\"Jan 2022\",\"password\":\"Peeps@69\",\"adminId\":null,\"empId\":null}"

echo Done!
