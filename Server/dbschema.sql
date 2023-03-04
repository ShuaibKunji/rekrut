--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-04 05:15:10

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
-- TOC entry 3326 (class 1262 OID 16398)
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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: system; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA system;


ALTER SCHEMA system OWNER TO pg_database_owner;

--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA system; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA system IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: User; Type: TABLE; Schema: system; Owner: postgres
--

CREATE TABLE system."User" (
    id bigint NOT NULL,
    user_name character varying(30),
    email character varying(254),
    password_hash character varying(512)
);


ALTER TABLE system."User" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16399)
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
-- TOC entry 3174 (class 2606 OID 16410)
-- Name: User User_email_key; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- TOC entry 3176 (class 2606 OID 16404)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3178 (class 2606 OID 16408)
-- Name: User User_user_name_key; Type: CONSTRAINT; Schema: system; Owner: postgres
--

ALTER TABLE ONLY system."User"
    ADD CONSTRAINT "User_user_name_key" UNIQUE (user_name);


-- Completed on 2023-03-04 05:15:10

--
-- PostgreSQL database dump complete
--

