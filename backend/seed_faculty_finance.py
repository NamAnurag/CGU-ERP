import json, urllib.request

BASE = 'http://localhost:8080/api'

def post(path, data):
    req = urllib.request.Request(BASE + path, json.dumps(data).encode(),
                                 {'Content-Type': 'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except Exception as e:
        print('  ERROR:', e)
        return None

# ── 1. Create missing faculty user logins (Dr. R. Sharma, Prof. S. Rao, Dr. P. Kumar)
missing_faculty_users = [
    {"name":"Dr. R. Sharma",  "email":"r.sharma@college.edu.in", "empId":"FAC-2020-055", "dept":"ME"},
    {"name":"Prof. S. Rao",   "email":"s.rao@college.edu.in",    "empId":"FAC-2017-018", "dept":"CE"},
    {"name":"Dr. P. Kumar",   "email":"p.kumar@college.edu.in",  "empId":"FAC-2021-067", "dept":"CSE"},
]
print("=== Creating missing faculty logins ===")
for f in missing_faculty_users:
    r = post('/users', {
        "name": f["name"], "email": f["email"], "role": "Faculty",
        "dept": f["dept"], "status": "active", "joined": "Aug 2021",
        "password": "Peeps@69", "adminId": None, "empId": f["empId"]
    })
    if r:
        print("  Created:", f["name"], "|", f["email"], "| empId:", f["empId"])

# ── 2. Add more faculty to faculty table + their user logins
new_faculty = [
    {"name":"Dr. S. Patel",   "empId":"FAC-2016-009", "email":"s.patel@college.edu.in",   "dept":"EEE", "designation":"Professor",       "subjects":"Power Systems, Electrical Machines", "color":"#f97316"},
    {"name":"Prof. K. Verma", "empId":"FAC-2022-078", "email":"k.verma@college.edu.in",   "dept":"IT",  "designation":"Asst. Professor",  "subjects":"Web Technologies, DBMS",             "color":"#a855f7"},
    {"name":"Dr. M. Das",     "empId":"FAC-2015-003", "email":"m.das@college.edu.in",     "dept":"CSE", "designation":"Professor",        "subjects":"Algorithms, Theory of Computation",  "color":"#22d3ee"},
    {"name":"Prof. R. Gupta", "empId":"FAC-2023-091", "email":"r.gupta@college.edu.in",   "dept":"ME",  "designation":"Asst. Professor",  "subjects":"Fluid Mechanics, CAD",               "color":"#10b981"},
    {"name":"Dr. A. Singh",   "empId":"FAC-2018-044", "email":"a.singh@college.edu.in",   "dept":"CE",  "designation":"Assoc. Professor", "subjects":"Geotechnical Engg., Surveying",      "color":"#ec4899"},
]
print("\n=== Adding new faculty records + logins ===")
for f in new_faculty:
    # Add to faculty table
    fac = post('/faculty', {
        "name": f["name"], "empId": f["empId"], "email": f["email"],
        "dept": f["dept"], "designation": f["designation"],
        "subjects": f["subjects"], "status": "active", "color": f["color"]
    })
    # Add user login
    usr = post('/users', {
        "name": f["name"], "email": f["email"], "role": "Faculty",
        "dept": f["dept"], "status": "active", "joined": "Aug 2022",
        "password": "Peeps@69", "adminId": None, "empId": f["empId"]
    })
    if fac and usr:
        print("  Created:", f["name"], "|", f["email"], "| empId:", f["empId"])

# ── 3. Add more finance team members
finance_members = [
    {"name":"Rajesh Mehta",   "email":"rajesh.mehta@college.edu.in"},
    {"name":"Sunita Sharma",  "email":"sunita.sharma@college.edu.in"},
    {"name":"Vikash Agarwal", "email":"vikash.agarwal@college.edu.in"},
]
print("\n=== Adding finance team members ===")
for f in finance_members:
    r = post('/users', {
        "name": f["name"], "email": f["email"], "role": "Finance",
        "dept": "Finance", "status": "active", "joined": "Jan 2024",
        "password": "Peeps@69", "adminId": None, "empId": None
    })
    if r:
        print("  Created:", f["name"], "|", f["email"])

print("\nAll done!")
