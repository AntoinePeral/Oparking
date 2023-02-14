DROP TABLE IF EXISTS "person", "car";

CREATE TABLE "person"(
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" VARCHAR(100) NOT NULL,
  "lastname"VARCHAR(100) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );


CREATE TABLE "car"(
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"model" VARCHAR(100) NOT NULL,
"immatriculation" VARCHAR(100) NOT NULL,
"person_id" INT,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
"updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
CONSTRAINT "fk_car_person" 
FOREIGN KEY ("person_id")
REFERENCES "person"("id")
ON DELETE CASCADE
);

INSERT INTO "person" ("firstname", "lastname") VALUES
('Jean', 'Jacques'),
('Thierry', 'Henrry'),
('Zinedine', 'Zidane'),
('Michel', 'Sardou');

INSERT INTO "car" ("model", "immatriculation", "person_id") VALUES
('Clio II', '759 LD 44', 1),
('R5', '452 JF 35', 2),
('106', '159 NV 14', null),
('DS4', '538 FI 59', null);

  
  