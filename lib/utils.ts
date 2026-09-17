import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// GENERATE AVATAR
export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const username = name.replace(/\+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === "FEMALE") return `${base}girl?username=${username}`;
  // default to boy
  return `${base}/boy?username=${username}`
}

// Formato y validación de teléfono Mexicano
export const FormatPhoneNumber = (value: string): string => {
  // Elimina cualquier caracter que no sea un dígito
  if (!value) return "";

  const phoneNumber = value.replace(/[^\d]/g, "");
  
  // Un número mexicano tiene 10 dígitos (excluyendo el código de país opcional +52)
  let nationalNumber = phoneNumber;

  // Si viene con código de país (+52 o 52), lo quitamos
  if (nationalNumber.startsWith("52") && nationalNumber.length > 10) {
    nationalNumber = nationalNumber.slice(2);
  }
  if (nationalNumber.startsWith("1") && nationalNumber.length > 10) {
    // A veces los móviles en México incluyen un '1' antes del número nacional
    nationalNumber = nationalNumber.slice(1);
  }
  
  // Si no tiene 10 dígitos, regresamos el input formateado lo mejor posible
  if (nationalNumber.length < 10) {
    if (nationalNumber.length <= 3) return nationalNumber;
    if (nationalNumber.length <= 6)
      return `(${nationalNumber.slice(0,3)}) ${nationalNumber.slice(3)}`;
    return `(${nationalNumber.slice(0,3)}) ${nationalNumber.slice(3,6)}-${nationalNumber.slice(6)}`;
  }

  // Formato: (XXX) XXX-XXXX
  return `(${nationalNumber.slice(0,3)}) ${nationalNumber.slice(3,6)}-${nationalNumber.slice(6,10)}`;
}

//  ai generated 🎉
export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};

export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Control Regular", duration: "60 min", price: "$120" },
  { id: "cleaning", name: "Limpieza Dental", duration: "45 min", price: "$90" },
  { id: "consultation", name: "Consulta", duration: "30 min", price: "$75" },
  { id: "emergency", name: "Emergencia", duration: "30 min", price: "$150" },
];