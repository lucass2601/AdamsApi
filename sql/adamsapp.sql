CREATE TABLE "students" (
  "student_id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "username" varchar,
  "key" varchar,
  "class_fid" int
);

CREATE TABLE "homework" (
  "homework_id" SERIAL PRIMARY KEY,
  "homework_title" varchar,
  "homework_description" text,
  "homework_date_due" date,
  "homework_done" boolean DEFAULT (FALSE),
  "homework_created_at" timestamp DEFAULT (now()),
  "homework_created_by" int,
  "homework_last_edit_at" timestamp,
  "homework_last_edit_by" int,
  "homework_subject_id" int
);

CREATE TABLE "exams" (
  "exam_id" SERIAL PRIMARY KEY,
  "exam_title" varchar,
  "exam_description" text,
  "exam_date" date,
  "exam_created_at" timestamp DEFAULT (now()),
  "exam_created_by" int,
  "exam_last_edit_at" timestamp,
  "exam_last_edit_by" int,
  "exam_subject_id" int
);

CREATE TABLE "classes" (
  "class_id" SERIAL PRIMARY KEY,
  "class_name" varchar
);

CREATE TABLE "classes_homework" (
  "class_homework_id" SERIAL PRIMARY KEY,
  "class_fid" int,
  "homework_fid" int
);

CREATE TABLE "classes_exams" (
  "class_exams_id" SERIAL PRIMARY KEY,
  "class_fid" int,
  "exam_fid" int
);

CREATE TABLE "appointments" (
  "appointment_id" SERIAL PRIMARY KEY,
  "apoointment_title" varchar,
  "appointment_description" text,
  "appointment_date" date,
  "appointment_created_at" timestamp DEFAULT (now()),
  "appointment_created_by" int,
  "appointment_last_edit_at" timestamp,
  "appointment_last_edit_by" int
);

CREATE TABLE "refresh_token" (
  "token_id" SERIAL PRIMARY KEY,
  "token" string,
  "student_fid" int
);

ALTER TABLE "students" ADD FOREIGN KEY ("class_fid") REFERENCES "classes" ("class_id");

ALTER TABLE "classes" ADD FOREIGN KEY ("class_id") REFERENCES "classes_homework" ("class_fid");

ALTER TABLE "homework" ADD FOREIGN KEY ("homework_id") REFERENCES "classes_homework" ("homework_fid");

ALTER TABLE "classes" ADD FOREIGN KEY ("class_id") REFERENCES "classes_exams" ("class_fid");

ALTER TABLE "exams" ADD FOREIGN KEY ("exam_id") REFERENCES "classes_exams" ("exam_fid");

ALTER TABLE "refresh_token" ADD FOREIGN KEY ("student_fid") REFERENCES "students" ("student_id");
