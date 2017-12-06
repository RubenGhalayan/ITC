#Task 1:
Create view examsView as select  st.Name "Name", sb.Title "Subjectt", e.Score "Score" from students st, subjects sb, exams e where e.Student_id=st.id and e.Subject_id=sb.id order by Subject,Score;
Select Subject, max(Score) as Max, min(Score) as Min, avg(Score) as Avg from examsView group by Subject order by Avg;




#Task 2:
Select Name, avg(Score) as Avg, count(Score) as Count from examsView group by Name order by Count desc;
