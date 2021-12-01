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
  "homework_date_due" date
);

CREATE TABLE "exams" (
  "exam_id" SERIAL PRIMARY KEY,
  "exam_title" varchar,
  "exam_description" text,
  "exam_date" date
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

ALTER TABLE "students" ADD FOREIGN KEY ("class_fid") REFERENCES "classes" ("class_id");

ALTER TABLE "classes" ADD FOREIGN KEY ("class_id") REFERENCES "classes_homework" ("class_fid");

ALTER TABLE "homework" ADD FOREIGN KEY ("homework_id") REFERENCES "classes_homework" ("homework_fid");

ALTER TABLE "classes" ADD FOREIGN KEY ("class_id") REFERENCES "classes_exams" ("class_fid");

ALTER TABLE "exams" ADD FOREIGN KEY ("exam_id") REFERENCES "classes_exams" ("exam_fid");
