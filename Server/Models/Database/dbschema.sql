--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-08 17:48:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE rekrut;
--
-- TOC entry 3387 (class 1262 OID 16398)
-- Name: rekrut; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE rekrut WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE rekrut OWNER TO postgres;

\connect rekrut

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16446)
-- Name: business; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA business;


ALTER SCHEMA business OWNER TO postgres;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: system; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA system;


ALTER SCHEMA system OWNER TO pg_database_owner;

--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA system; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA system IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 16456)
-- Name: Applicant; Type: TABLE; Schema: business; Owner: postgres
--

CREATE TABLE business."Applicant" (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    full_name character varying,
    phone_number character varying
);


ALTER TABLE business."Applicant" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16455)
-- Name: Applicant_id_seq; Type: SEQUENCE; Schema: business; Owner: postgres
--

ALTER TABLE business."Applicant" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME business."Applicant_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16448)
-- Name: Job; Type: TABLE; Schema: business; Owner: postgres
--

CREATE TABLE business."Job" (
    id bigint NOT NULL,
    title character varying,
    description character varying
);


ALTER TABLE business."Job" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16486)
-- Name: JobApplication; Type: TABLE; Schema: business; Owner: postgres
--

CREATE TABLE business."JobApplication" (
    id bigint NOT NULL,
    job_id bigint NOT NULL,
    applicant_id bigint,
    resume character varying,
    cover_letter character varying
);


ALTER TABLE business."JobApplication" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16485)
-- Name: JobApplication_id_seq; Type: SEQUENCE; Schema: business; Owner: postgres
--

ALTER TABLE business."JobApplication" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME business."JobApplication_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 16447)
-- Name: Job_id_seq; Type: SEQUENCE; Schema: business; Owner: postgres
--

ALTER TABLE business."Job" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME business."Job_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 16471)
-- Name: Recruiter; Type: TABLE; Schema: business; Owner: postgres
--

CREATE TABLE business."Recruiter" (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    full_name character varying,
    phone_number character varying
);


ALTER TABLE business."Recruiter" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16470)
-- Name: Recruiter_id_seq; Type: SEQUENCE; Schema: business; Owner: postgres
--

ALTER TABLE business."Recruiter" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME business."Recruiter_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16423)
-- Name: Feature; Type: TABLE; Schema: system; Owner: postgres
--

CREATE TABLE system."Feature" (
    id bigint NOT NULL,
    name character varying,
    description character varying,
    code character varying,
    route character varying
);


ALTER TABLE system."Feature" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16422)
-- Name: Feature_id_seq; Type: SEQUENCE; Schema: system; Owner: postgres
--

ALTER TABLE system."Feature" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME system."Feature_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16411)
-- Name: Profile; Type: TABLE; Schema: system; Owner: postgres
--

CREATE TABLE system."Profile" (
    id bigint NOT NULL,
    name character varying,
    description character varying,
    code character varying
);


ALTER TABLE system."Profile" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16431)
-- Name: ProfileFeatureMap; Type: TABLE; Schema: system; Owner: postgres
--

CREATE TABLE system."ProfileFeatureMap" (
    id bigint NOT NULL,
    profile_id bigint NOT NULL,
    feature_id bigint NOT NULL
);


ALTER TABLE system."ProfileFeatureMap" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16430)
-- Name: ProfileFeatureMap_id_seq; Type: SEQUENCE; Schema: system; Owner: postgres
--

ALTER TABLE system."ProfileFeatureMap" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME system."ProfileFeatureMap_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16414)
-- Name: Profiles_id_seq; Type: SEQUENCE; Schema: system; Owner: postgres
--

ALTER TABLE system."Profile" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME system."Profiles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: User; Type: TABLE; Schema: system; Owner: postgres
--

CREATE TABLE system."User" (
    id bigint NOT NULL,
    user_name character varying(30),
    email character varying(254),
    password_hash character varying(512),
    profile_id bigint NOT NULL
);


ALTER TABLE system."User" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: User_Id_seq; Type: SEQUENCE; Schema: system; Owner: postgres
--

ALTER TABLE system."User" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME system."User_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3224 (class 2606 OID 16462)
-- Name: Applicant Applicant_pkey; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."Applicant"
    ADD CONSTRAINT "Applicant_pkey" PRIMARY KEY (id);


--
-- TOC entry 3226 (class 2606 OID 16464)
-- Name: Applicant Applicant_user_id_key; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."Applicant"
    ADD CONSTRAINT "Applicant_user_id_key" UNIQUE (user_id);


--
-- TOC entry 3232 (class 2606 OID 16492)
-- Name: JobApplication JobApplication_pkey; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."JobApplication"
    ADD CONSTRAINT "JobApplication_pkey" PRIMARY KEY (id);


--
-- TOC entry 3222 (class 2606 OID 16454)
-- Name: Job Job_pkey; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."Job"
    ADD CONSTRAINT "Job_pkey" PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 16477)
-- Name: Recruiter Recruiter_pkey; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."Recruiter"
    ADD CONSTRAINT "Recruiter_pkey" PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 16479)
-- Name: Recruiter Recruiter_user_id_key; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."Recruiter"
    ADD CONSTRAINT "Recruiter_user_id_key" UNIQUE (user_id);


--
-- TOC entry 3218 (class 2606 OID 16429)
-- Name: Feature Feature_pkey; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."Feature"
    ADD CONSTRAINT "Feature_pkey" PRIMARY KEY (id);


--
-- TOC entry 3220 (class 2606 OID 16435)
-- Name: ProfileFeatureMap ProfileFeatureMap_pkey; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."ProfileFeatureMap"
    ADD CONSTRAINT "ProfileFeatureMap_pkey" PRIMARY KEY (id);


--
-- TOC entry 3216 (class 2606 OID 16421)
-- Name: Profile Profiles_pkey; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."Profile"
    ADD CONSTRAINT "Profiles_pkey" PRIMARY KEY (id);


--
-- TOC entry 3210 (class 2606 OID 16410)
-- Name: User User_email_key; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- TOC entry 3212 (class 2606 OID 16404)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3214 (class 2606 OID 16408)
-- Name: User User_user_name_key; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."User"
    ADD CONSTRAINT "User_user_name_key" UNIQUE (user_name);


--
-- TOC entry 3236 (class 2606 OID 16465)
-- Name: Applicant Applicant_user_id_fkey; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."Applicant"
    ADD CONSTRAINT "Applicant_user_id_fkey" FOREIGN KEY (user_id) REFERENCES system."User"(id);


--
-- TOC entry 3238 (class 2606 OID 16498)
-- Name: JobApplication JobApplication_applicant_id_fkey; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."JobApplication"
    ADD CONSTRAINT "JobApplication_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES business."Applicant"(id);


--
-- TOC entry 3239 (class 2606 OID 16493)
-- Name: JobApplication JobApplication_job_id_fkey; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."JobApplication"
    ADD CONSTRAINT "JobApplication_job_id_fkey" FOREIGN KEY (job_id) REFERENCES business."Job"(id);


--
-- TOC entry 3237 (class 2606 OID 16480)
-- Name: Recruiter Recruiter_user_id_fkey; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."Recruiter"
    ADD CONSTRAINT "Recruiter_user_id_fkey" FOREIGN KEY (user_id) REFERENCES system."User"(id);


--
-- TOC entry 3234 (class 2606 OID 16441)
-- Name: ProfileFeatureMap ProfileFeatureMap_feature_id_fkey; Type: FK CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."ProfileFeatureMap"
    ADD CONSTRAINT "ProfileFeatureMap_feature_id_fkey" FOREIGN KEY (feature_id) REFERENCES system."Feature"(id);


--
-- TOC entry 3235 (class 2606 OID 16436)
-- Name: ProfileFeatureMap ProfileFeatureMap_profile_id_fkey; Type: FK CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."ProfileFeatureMap"
    ADD CONSTRAINT "ProfileFeatureMap_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES system."Profile"(id);


--
-- TOC entry 3233 (class 2606 OID 16503)
-- Name: User User_profile_id_fkey; Type: FK CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."User"
    ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES system."Profile"(id) NOT VALID;


-- Completed on 2023-03-08 17:48:48

--
-- PostgreSQL database dump complete
--

