import json, urllib.request, random

BASE = 'http://localhost:8080/api'

def get(path):
    with urllib.request.urlopen(BASE + path) as r:
        return json.loads(r.read())

def post(path, data):
    req = urllib.request.Request(BASE + path, json.dumps(data).encode(),
                                  {'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

def put(path, data):
    req = urllib.request.Request(BASE + path, json.dumps(data).encode(),
                                  {'Content-Type': 'application/json'}, method='PUT')
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

students    = get('/students')
fee_list    = get('/fees')
fee_by_roll = {f['roll']: f for f in fee_list}

TOTAL_FEE = 80000
random.seed(42)
results = {'created': 0, 'updated': 0}

for i, s in enumerate(students):
    roll = s['roll']
    name = s['name']
    dept = s['dept']

    bucket = i % 20
    if bucket < 7:
        # 35% -> 69000 pending (due=69000, paid=11000)
        paid       = 11000
        due        = 69000
        status     = 'partial'
        scholarship = 0
    elif bucket < 15:
        # 40% -> fully paid or overpaid
        paid       = random.choice([40000, 50000, 60000, 70000, 80000])
        due        = max(0, TOTAL_FEE - paid)
        status     = 'paid' if due == 0 else 'partial'
        scholarship = random.choice([0, 0, 5000, 10000, 15000])
    else:
        # 25% -> partial random
        paid       = (random.randint(10, 60) * 1000)
        due        = TOTAL_FEE - paid
        status     = 'partial'
        scholarship = random.choice([0, 0, 5000])

    payload = {
        'name': name, 'roll': roll, 'dept': dept,
        'year': 4, 'total': TOTAL_FEE,
        'paid': paid, 'due': due,
        'status': status, 'scholarship': scholarship
    }

    if roll in fee_by_roll:
        fid = fee_by_roll[roll]['id']
        put('/fees/' + str(fid), payload)
        results['updated'] += 1
    else:
        post('/fees', payload)
        results['created'] += 1

    print(name[:30].ljust(30) + ' | ' + roll + ' | paid=' + str(paid) + ' | due=' + str(due) + ' | ' + status)

print('\nDone - created: ' + str(results['created']) + ', updated: ' + str(results['updated']))
