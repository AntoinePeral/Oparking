# Conception

## Définition des entités, attributs et associations

Entité : Véhicule / personne qui emprunte 

Attributs véhicule :
- Marque
- PI
- code_véhicule

Attributs personne : 
-Code_personne
-nom
-prénom

Associations : personne Emprunter véhicule
Une personne peut emprunter 0 à N voiture
Une voiture peut être emprunter  par 0 à 1 personne

## MCD

PERSON: code_person, firstname, lastname
BORROW, 0N PERSON, 01 CAR

:
CAR: code_car, model, immatriculation

## MLD

CAR (_codeCar_, model, immatriculation(PI), #codePerson)
PERSON (_codePerson_, firstname, lastname)