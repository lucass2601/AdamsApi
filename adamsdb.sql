CREATE TABLE "student" (
  "student_id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "class_fid" int
);

CREATE TABLE "subjects" (
  "subject_id" SERIAL PRIMARY KEY,
  "title" varchar
);

CREATE TABLE "homework" (
  "homework_id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" text,
  "date_due" date,
  "subject_fid" int
);

CREATE TABLE "exams" (
  "exam_id" SERIAL PRIMARY KEY,
  "subject_fid" int,
  "description" text,
  "exam_date" date
);

CREATE TABLE "classes" (
  "class_id" SERIAL PRIMARY KEY,
  "title" varchar
);

CREATE TABLE "subject_classes" (
  "id" SERIAL PRIMARY KEY,
  "subject_fid" int,
  "class_fid" int
);

ALTER TABLE "student" ADD FOREIGN KEY ("class_fid") REFERENCES "classes" ("class_id");

ALTER TABLE "subject_classes" ADD FOREIGN KEY ("class_fid") REFERENCES "classes" ("class_id");

ALTER TABLE "subject_classes" ADD FOREIGN KEY ("subject_fid") REFERENCES "subjects" ("subject_id");

ALTER TABLE "exams" ADD FOREIGN KEY ("subject_fid") REFERENCES "subjects" ("subject_id");

ALTER TABLE "homework" ADD FOREIGN KEY ("subject_fid") REFERENCES "subjects" ("subject_id");
