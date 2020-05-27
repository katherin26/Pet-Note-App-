import { API } from "aws-amplify";

export async function getPets() {
  return API.get("PetNote", "/pets");
}

export async function createPet(pet) {
  return API.post("/pets", { body: pet });
}

export async function updatePet(petId, pet) {
  return API.patch(`/pets/${petId}`, { body: pet });
}

export async function deletePet(petId) {
  return API.del(`/pets/${petId}`);
}
