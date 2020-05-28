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
