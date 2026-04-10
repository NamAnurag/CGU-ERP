package com.example.backend.config;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final StudentRepository studentRepo;
    private final FacultyRepository facultyRepo;
    private final CourseRepository courseRepo;
    private final UserRepository userRepo;
    private final FeeRecordRepository feeRepo;
    private final AssignmentRepository assignmentRepo;
    private final AnnouncementRepository announcementRepo;

    @Override
    public void run(String... args) {
        seedStudents();
        seedFaculty();
        seedCourses();
        seedUsers();
        seedFees();
        seedAssignments();
        seedAnnouncements();
    }

    private void seedStudents() {
        if (studentRepo.count() > 0) return;
        String[] names = {"Ashish Kumar","Riya Sharma","Arjun Mehta","Priya Patel","Rohit Kumar",
                "Sneha Das","Vikram Singh","Anjali Nair","Kiran Rao","Deepak Jha",
                "Pooja Mishra","Aditya Verma","Neha Gupta","Saurabh Yadav","Kavya Reddy"};
        String[] depts = {"CSE","ECE","ME","CE","EEE","IT"};
        String[] colors = {"#4f8ef7","#22d3ee","#10b981","#f59e0b","#ec4899","#f97316"};
        for (int i = 0; i < names.length; i++) {
            Student s = new Student();
            s.setName(names[i]);
            s.setRoll("22CS0" + String.format("%03d", i + 101));
            s.setEmail(names[i].toLowerCase().replace(" ", ".") + "@college.edu.in");
            s.setDept(depts[i % depts.length]);
            s.setSem((i % 6) + 1);
            s.setCgpa(Math.round((7.5 + Math.random() * 2.5) * 10.0) / 10.0);
            s.setAttendance(60 + (int)(Math.random() * 35));
            s.setStatus("active");
            s.setColor(colors[i % colors.length]);
            studentRepo.save(s);
        }
    }

    private void seedFaculty() {
        if (facultyRepo.count() > 0) return;
        List.of(
            new String[]{"Dr. T. Mishra","FAC-2019-042","t.mishra@college.edu.in","CSE","Assoc. Professor","ML, Deep Learning","active","#6366f1"},
            new String[]{"Prof. A. Nair","FAC-2018-031","a.nair@college.edu.in","ECE","Professor","Digital Circuits","active","#f59e0b"},
            new String[]{"Dr. R. Sharma","FAC-2020-055","r.sharma@college.edu.in","ME","Asst. Professor","Thermodynamics","active","#10b981"},
            new String[]{"Prof. S. Rao","FAC-2017-018","s.rao@college.edu.in","CE","Professor","Structural Engg.","on-leave","#22d3ee"},
            new String[]{"Dr. P. Kumar","FAC-2021-067","p.kumar@college.edu.in","CSE","Asst. Professor","Computer Networks","active","#ec4899"}
        ).forEach(d -> {
            Faculty f = new Faculty();
            f.setName(d[0]); f.setEmpId(d[1]); f.setEmail(d[2]); f.setDept(d[3]);
            f.setDesignation(d[4]); f.setSubjects(d[5]); f.setStatus(d[6]); f.setColor(d[7]);
            facultyRepo.save(f);
        });
    }

    private void seedCourses() {
        if (courseRepo.count() > 0) return;
        List.of(
            new Object[]{"CS501","Machine Learning","CSE",5,4,"Dr. T. Mishra",62,"active","#6366f1"},
            new Object[]{"CS606","Deep Learning","CSE",6,4,"Dr. T. Mishra",58,"active","#ec4899"},
            new Object[]{"CS604","ML Lab","CSE",6,2,"Dr. T. Mishra",58,"active","#f59e0b"},
            new Object[]{"CS502","Computer Networks","CSE",5,4,"Dr. P. Kumar",62,"active","#10b981"},
            new Object[]{"EC401","Digital Signal Processing","ECE",4,4,"Prof. A. Nair",48,"active","#22d3ee"},
            new Object[]{"ME301","Thermodynamics","ME",3,4,"Dr. R. Sharma",54,"inactive","#f97316"}
        ).forEach(d -> {
            Course c = new Course();
            c.setCode((String)d[0]); c.setName((String)d[1]); c.setDept((String)d[2]);
            c.setSem((Integer)d[3]); c.setCredits((Integer)d[4]); c.setFaculty((String)d[5]);
            c.setStudents((Integer)d[6]); c.setStatus((String)d[7]); c.setColor((String)d[8]);
            courseRepo.save(c);
        });
    }

    private void seedUsers() {
        if (userRepo.count() > 0) {
            // Patch any missing users from later seeder updates
            String[][] missing = {
                {"Finance Team","finance@college.edu.in","Finance","Finance","active","Jan 2022","Peeps@69",null,null},
                {"Rajesh Mehta","rajesh.mehta@college.edu.in","Finance","Finance","active","Jan 2022","Peeps@69",null,null},
                {"Sunita Sharma","sunita.sharma@college.edu.in","Finance","Finance","active","Jan 2022","Peeps@69",null,null},
                {"Vikash Agarwal","vikash.agarwal@college.edu.in","Finance","Finance","active","Jan 2022","Peeps@69",null,null},
                {"Dr. R. Sharma","r.sharma@college.edu.in","Faculty","ME","active","Aug 2020","Peeps@69",null,"FAC-2020-055"},
                {"Prof. S. Rao","s.rao@college.edu.in","Faculty","CE","on-leave","Jul 2017","Peeps@69",null,"FAC-2017-018"},
                {"Dr. P. Kumar","p.kumar@college.edu.in","Faculty","CSE","active","Aug 2021","Peeps@69",null,"FAC-2021-067"},
                {"Ashish Kumar","ashish.kumar@college.edu.in","Student","CSE","active","Jan 2022","Peeps@69",null,null},
                {"Riya Sharma","riya.sharma@college.edu.in","Student","CSE","active","Jan 2022","Peeps@69",null,null},
                {"Arjun Mehta","arjun.mehta@college.edu.in","Student","ME","active","Jan 2022","Peeps@69",null,null},
                {"Priya Patel","priya.patel@college.edu.in","Student","CE","active","Jan 2022","Peeps@69",null,null},
                {"Rohit Kumar","rohit.kumar@college.edu.in","Student","EEE","active","Jan 2022","Peeps@69",null,null},
                {"Sneha Das","sneha.das@college.edu.in","Student","IT","active","Jan 2022","Peeps@69",null,null},
                {"Vikram Singh","vikram.singh@college.edu.in","Student","CSE","active","Jan 2022","Peeps@69",null,null},
                {"Anjali Nair","anjali.nair@college.edu.in","Student","ECE","active","Jan 2022","Peeps@69",null,null},
                {"Kiran Rao","kiran.rao@college.edu.in","Student","ME","active","Jan 2022","Peeps@69",null,null},
                {"Deepak Jha","deepak.jha@college.edu.in","Student","CE","active","Jan 2022","Peeps@69",null,null},
                {"Pooja Mishra","pooja.mishra@college.edu.in","Student","EEE","active","Jan 2022","Peeps@69",null,null},
                {"Aditya Verma","aditya.verma@college.edu.in","Student","IT","active","Jan 2022","Peeps@69",null,null},
                {"Neha Gupta","neha.gupta@college.edu.in","Student","CSE","active","Jan 2022","Peeps@69",null,null},
                {"Saurabh Yadav","saurabh.yadav@college.edu.in","Student","ECE","active","Jan 2022","Peeps@69",null,null},
                {"Kavya Reddy","kavya.reddy@college.edu.in","Student","ME","active","Jan 2022","Peeps@69",null,null}
            };
            for (String[] d : missing) {
                if (userRepo.findByEmail(d[1]).isEmpty()) {
                    User u = new User();
                    u.setName(d[0]); u.setEmail(d[1]); u.setRole(d[2]); u.setDept(d[3]);
                    u.setStatus(d[4]); u.setJoined(d[5]); u.setPassword(d[6]);
                    u.setAdminId(d[7]); u.setEmpId(d[8]);
                    userRepo.save(u);
                }
            }
            return;
        }
        // name, email, role, dept, status, joined, password, adminId, empId
        List.of(
            new String[]{"Ashish Kumar","ashish.kumar@college.edu.in","Student","CSE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Riya Sharma","riya.sharma@college.edu.in","Student","CSE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Arjun Mehta","arjun.mehta@college.edu.in","Student","ME","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Priya Patel","priya.patel@college.edu.in","Student","CE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Rohit Kumar","rohit.kumar@college.edu.in","Student","EEE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Sneha Das","sneha.das@college.edu.in","Student","IT","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Vikram Singh","vikram.singh@college.edu.in","Student","CSE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Anjali Nair","anjali.nair@college.edu.in","Student","ECE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Kiran Rao","kiran.rao@college.edu.in","Student","ME","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Deepak Jha","deepak.jha@college.edu.in","Student","CE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Pooja Mishra","pooja.mishra@college.edu.in","Student","EEE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Aditya Verma","aditya.verma@college.edu.in","Student","IT","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Neha Gupta","neha.gupta@college.edu.in","Student","CSE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Saurabh Yadav","saurabh.yadav@college.edu.in","Student","ECE","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Kavya Reddy","kavya.reddy@college.edu.in","Student","ME","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Dr. T. Mishra","t.mishra@college.edu.in","Faculty","CSE","active","Aug 2019","Peeps@69",null,"FAC-2019-042"},
            new String[]{"Prof. A. Nair","a.nair@college.edu.in","Faculty","ECE","active","Jul 2018","Peeps@69",null,"FAC-2018-031"},
            new String[]{"Dr. R. Sharma","r.sharma@college.edu.in","Faculty","ME","active","Aug 2020","Peeps@69",null,"FAC-2020-055"},
            new String[]{"Prof. S. Rao","s.rao@college.edu.in","Faculty","CE","on-leave","Jul 2017","Peeps@69",null,"FAC-2017-018"},
            new String[]{"Dr. P. Kumar","p.kumar@college.edu.in","Faculty","CSE","active","Aug 2021","Peeps@69",null,"FAC-2021-067"},
            new String[]{"Super Admin","admin@college.edu.in","Admin","ALL","active","Jan 2024","Peeps@69","ADMIN-2024-001",null},
            new String[]{"Finance Team","finance@college.edu.in","Finance","Finance","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Rajesh Mehta","rajesh.mehta@college.edu.in","Finance","Finance","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Sunita Sharma","sunita.sharma@college.edu.in","Finance","Finance","active","Jan 2022","Peeps@69",null,null},
            new String[]{"Vikash Agarwal","vikash.agarwal@college.edu.in","Finance","Finance","active","Jan 2022","Peeps@69",null,null}
        ).forEach(d -> {
            User u = new User();
            u.setName(d[0]); u.setEmail(d[1]); u.setRole(d[2]); u.setDept(d[3]);
            u.setStatus(d[4]); u.setJoined(d[5]); u.setPassword(d[6]);
            u.setAdminId(d[7]); u.setEmpId(d[8]);
            userRepo.save(u);
        });
    }

    private void seedFees() {
        if (feeRepo.count() > 0) return;
        List.of(
            new Object[]{"Ashish Kumar","22CS0142","CSE",4,183000L,138000L,45000L,"partial",15000L},
            new Object[]{"Riya Sharma","22CS0101","CSE",4,183000L,183000L,0L,"paid",0L},
            new Object[]{"Arjun Mehta","22CS0102","CSE",4,183000L,0L,183000L,"unpaid",0L},
            new Object[]{"Priya Patel","22EC0055","ECE",4,176000L,176000L,0L,"paid",20000L},
            new Object[]{"Rohit Kumar","22ME0031","ME",4,168000L,84000L,84000L,"partial",0L},
            new Object[]{"Sneha Das","22CS0105","CSE",3,183000L,183000L,0L,"paid",15000L}
        ).forEach(d -> {
            FeeRecord r = new FeeRecord();
            r.setName((String)d[0]); r.setRoll((String)d[1]); r.setDept((String)d[2]);
            r.setYear((Integer)d[3]); r.setTotal((Long)d[4]); r.setPaid((Long)d[5]);
            r.setDue((Long)d[6]); r.setStatus((String)d[7]); r.setScholarship((Long)d[8]);
            feeRepo.save(r);
        });
    }

    private void seedAssignments() {
        if (assignmentRepo.count() > 0) return;
        List.of(
            new Object[]{"CNN Implementation — CIFAR-10","CS606","Project",30,"Mar 30",38,58,0,"#ec4899"},
            new Object[]{"K-Means Clustering on Retail Dataset","CS604","Lab",20,"Mar 20",52,58,52,"#f59e0b"},
            new Object[]{"Regression Model Comparison","CS501","Assignment",25,"Apr 5",21,62,0,"#6366f1"},
            new Object[]{"Feature Engineering Lab","CS604","Lab",20,"Mar 15",60,62,47,"#10b981"}
        ).forEach(d -> {
            Assignment a = new Assignment();
            a.setTitle((String)d[0]); a.setSubject((String)d[1]); a.setType((String)d[2]);
            a.setMarks((Integer)d[3]); a.setDeadline((String)d[4]); a.setSubmitted((Integer)d[5]);
            a.setTotal((Integer)d[6]); a.setGraded((Integer)d[7]); a.setColor((String)d[8]);
            assignmentRepo.save(a);
        });
    }

    private void seedAnnouncements() {
        if (announcementRepo.count() > 0) return;
        List.of(
            new String[]{"End-Term Practical Exam Schedule Released","The End-Term practical exam for CS604 is scheduled for April 18–19, 2026.","Urgent","CS604","Sem 6 Students","Mar 26, 2026"},
            new String[]{"Assignment Deadline Extended — CNN Implementation","Deadline extended to April 2, 2026. No further extensions will be granted.","Notice","CS606","All Students","Mar 24, 2026"},
            new String[]{"Guest Lecture: Transformer Architectures","Guest lecture by Dr. Ramesh Iyer (IIT Bombay) on April 5, 2026 at 2 PM.","Info","CS606","Sem 6 Students","Mar 22, 2026"},
            new String[]{"Mid-Term Results Published on Portal","Marks for CS501 Mid-Term uploaded. Re-evaluation requests within 7 days.","Notice","CS501","Sem 5 Students","Mar 20, 2026"}
        ).forEach(d -> {
            Announcement a = new Announcement();
            a.setTitle(d[0]); a.setBody(d[1]); a.setUrgency(d[2]);
            a.setSubject(d[3]); a.setAudience(d[4]); a.setDate(d[5]);
            announcementRepo.save(a);
        });
    }
}
