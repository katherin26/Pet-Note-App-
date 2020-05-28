import { API } from "aws-amplify";

export async function getPets() {
  return API.get("PetNote", "/pets");
}

export async function createPet(pet) {
  const payload = { ...pet, avatar: "avatar1.jpg" };
  return API.post("PetNote", "/pets", { body: payload });
}

export async function updatePet(petId, pet) {
  const payload = { ...pet };
  return API.patch("PetNote", `/pets/${petId}`, { body: payload });
}

export async function deletePet(petId) {
  return API.del("PetNote", `/pets/${petId}`);
}

export async function getVaccinations(petId) {
  return API.get("PetNote", `/pets/${petId}/vaccinations`);
}

export async function createVaccination(petId, vaccination) {
  const payload = { ...vaccination };
  return API.post("PetNote", `/pets/${petId}/vaccinations`, { body: payload });
}

export async function updateVaccination(petId, vaccinationId, vaccination) {
  const payload = { ...vaccination };
  return API.patch("PetNote", `/pets/${petId}/vaccinations/${vaccinationId}`, {
    body: payload,
  });
}

export async function deleteVaccination(petId, vaccinationId) {
  return API.del("PetNote", `/pets/${petId}/vaccinations/${vaccinationId}`);
}

export async function getProcedures(petId) {
  return API.get("PetNote", `/pets/${petId}/procedures`);
}

export async function createProcedure(petId, procedure) {
  const payload = { ...procedure };
  return API.post("PetNote", `/pets/${petId}/procedures`, { body: payload });
}

export async function updateProcedure(petId, procedureId, procedure) {
  const payload = { ...procedure };
  return API.patch("PetNote", `/pets/${petId}/procedures/${procedureId}`, {
    body: payload,
  });
}

export async function deleteProcedure(petId, procedureId) {
  return API.del("PetNote", `/pets/${petId}/procedures/${procedureId}`);
}

export async function getGrooming(petId) {
  return API.get("PetNote", `/pets/${petId}/grooming`);
}

export async function createGrooming(petId, grooming) {
  const payload = { ...grooming };
  return API.post("PetNote", `/pets/${petId}/grooming`, { body: payload });
}

export async function updateGrooming(petId, groomingId, grooming) {
  const payload = { ...grooming };
  return API.patch("PetNote", `/pets/${petId}/grooming/${groomingId}`, {
    body: payload,
  });
}

export async function deleteGrooming(petId, groomingId) {
  return API.del("PetNote", `/pets/${petId}/grooming/${groomingId}`);
}

export async function getPetNotes(petId) {
  return API.get("PetNote", `/pets/${petId}/reminders`);
}

export async function createPetNote(petId, reminder) {
  const payload = { ...reminder, done: false };
  return API.post("PetNote", `/pets/${petId}/reminders`, { body: payload });
}

export async function updatePetNote(petId, reminderId, reminder) {
  const payload = { ...reminder };
  return API.patch("PetNote", `/pets/${petId}/reminders/${reminderId}`, {
    body: payload,
  });
}

export async function deletePetNote(petId, reminderId) {
  return API.del("PetNote", `/pets/${petId}/reminders/${reminderId}`);
}

export async function getTimeline(petId) {
  return API.get("PetNote", `/pets/${petId}/timeline`);
}
