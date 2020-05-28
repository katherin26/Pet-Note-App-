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
  return API.del(`/pets/${petId}`);
}
