--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: itc; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE itc IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: exams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE exams (
    id integer NOT NULL,
    student_id integer NOT NULL,
    training_id integer NOT NULL,
    score integer,
    subject_id integer NOT NULL
);


ALTER TABLE exams OWNER TO postgres;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE students (
    id integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    training_id integer NOT NULL
);


ALTER TABLE students OWNER TO postgres;

--
-- Name: trainings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE trainings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainings_id_seq OWNER TO postgres;

--
-- Name: trainings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE trainings (
    id integer DEFAULT nextval('trainings_id_seq'::regclass) NOT NULL,
    name text
);


ALTER TABLE trainings OWNER TO postgres;

--
-- Name: averageOfTraining; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW "averageOfTraining" AS
 SELECT t.name AS "ITC",
    st.name AS "Name",
    st.surname AS "Surname",
    avg(e.score) AS avg
   FROM exams e,
    trainings t,
    students st
  WHERE ((e.student_id = st.id) AND (e.training_id = t.id))
  GROUP BY t.name, st.name, st.surname;


ALTER TABLE "averageOfTraining" OWNER TO postgres;

--
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE subjects (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE subjects OWNER TO postgres;

--
-- Name: countOfMax; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW "countOfMax" AS
 SELECT t.name AS "ITC",
    sb.name AS "Subject",
    max(e.score) AS "Max score",
    count(e.score) AS count
   FROM exams e,
    trainings t,
    subjects sb
  WHERE ((e.subject_id = sb.id) AND (e.training_id = t.id))
  GROUP BY t.name, sb.name, e.score
  ORDER BY t.name;


ALTER TABLE "countOfMax" OWNER TO postgres;

--
-- Name: countOfTrainings; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW "countOfTrainings" AS
 SELECT st.name AS "Name",
    st.surname AS "Surname",
    sb.name AS "Subject",
    max(e.score) AS "Max score",
    min(e.score) AS "Min score",
    count(t.name) AS count
   FROM exams e,
    students st,
    subjects sb,
    trainings t
  WHERE ((e.student_id = st.id) AND (e.subject_id = sb.id) AND (e.training_id = t.id))
  GROUP BY st.name, st.surname, sb.name;


ALTER TABLE "countOfTrainings" OWNER TO postgres;

--
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE exams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE exams_id_seq OWNER TO postgres;

--
-- Name: exams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE exams_id_seq OWNED BY exams.id;


--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE students_id_seq OWNED BY students.id;


--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE subjects_id_seq OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE subjects_id_seq OWNED BY subjects.id;


--
-- Name: exams id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exams ALTER COLUMN id SET DEFAULT nextval('exams_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students ALTER COLUMN id SET DEFAULT nextval('students_id_seq'::regclass);


--
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subjects ALTER COLUMN id SET DEFAULT nextval('subjects_id_seq'::regclass);


--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY exams (id, student_id, training_id, score, subject_id) FROM stdin;
1	1	1	100	1
2	1	1	99	2
3	1	1	90	3
4	1	2	100	1
5	1	2	100	2
6	1	2	100	3
7	2	3	80	1
8	2	3	90	2
9	2	3	90	3
10	2	4	90	1
11	2	4	100	2
12	2	4	90	3
13	2	2	100	1
\.


--
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('exams_id_seq', 13, true);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY students (id, name, surname, training_id) FROM stdin;
1	Nane	Hambardzumyan	1
2	Mane	Hambardzumyan	2
3	Armenuhi	Qocharyan	3
4	Hasmik	Naslyan	4
5	Stepan	Chaparyan	5
6	Mariam	Papikyan	6
7	Hasmik	Kirakosyan	7
8	Araksya	Hambaryan	8
\.


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('students_id_seq', 8, true);


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY subjects (id, name) FROM stdin;
1	C++
2	Linux
3	Network
4	Architecture
5	Version control
6	Development process
7	Bash
8	Python
9	Vim
10	Web
11	Databases
\.


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('subjects_id_seq', 11, true);


--
-- Data for Name: trainings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY trainings (id, name) FROM stdin;
1	ITC1
2	ITC2
3	ITC3
4	ITC4
5	ITC5
6	ITC6
7	ITC7
8	ITC8
\.


--
-- Name: trainings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('trainings_id_seq', 8, true);


--
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- Name: trainings trainings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings
    ADD CONSTRAINT trainings_pkey PRIMARY KEY (id);


--
-- Name: exams exams_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT exams_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id);


--
-- Name: exams exams_training_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT exams_training_id_fkey FOREIGN KEY (training_id) REFERENCES trainings(id);


--
-- Name: exams forkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exams
    ADD CONSTRAINT forkey FOREIGN KEY (subject_id) REFERENCES subjects(id);


--
-- Name: students students_training_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_training_id_fkey FOREIGN KEY (training_id) REFERENCES trainings(id);


--
-- PostgreSQL database dump complete
--

