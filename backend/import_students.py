import json, urllib.request, urllib.error

with open(r'c:\Users\Prudhvi\Downloads\educore-with-admin\CGUStudentsData.txt', encoding='utf-8') as f:
    lines = f.read().strip().splitlines()

students = []
for line in lines[1:]:  # skip header
    parts = line.strip().split('\t')
    if len(parts) >= 3:
        name, roll, email = parts[0].strip(), parts[1].strip(), parts[2].strip()
        if name and roll and email:
            students.append({"name": name, "roll": roll, "email": email.lower()})

payload = json.dumps(students).encode('utf-8')
req = urllib.request.Request(
    'http://localhost:8080/api/bulk/students',
    data=payload,
    headers={'Content-Type': 'application/json'},
    method='POST'
)
try:
    with urllib.request.urlopen(req) as res:
        print("Result:", res.read().decode())
except urllib.error.HTTPError as e:
    print("Error:", e.code, e.read().decode())
