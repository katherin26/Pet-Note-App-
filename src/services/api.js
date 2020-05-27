import { API } from "aws-amplify";

export async function getPets() {
  return API.get("PetNote", "/pets");
}

export async function createPet(pet) {
  const payload = { ...pet, avatar: "avatar1.jpg" };

  if (payload.dob) {
    const date = new Date(payload.dob);
    date.setUTCHours(12);
    payload.dob = Math.round(date.getTime() / 1000);
  }

  if (payload.rabies_exp) {
    const date = new Date(payload.rabies_exp);
    date.setUTCHours(12);
    payload.rabies_exp = Math.round(date.getTime() / 1000);
  }

  return API.post("PetNote", "/pets", { body: payload });
}

export async function updatePet(petId, pet) {
  return API.patch(`/pets/${petId}`, { body: pet });
}

export async function deletePet(petId) {
  return API.del(`/pets/${petId}`);
}
