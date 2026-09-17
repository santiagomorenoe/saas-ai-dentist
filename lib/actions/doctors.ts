"use server";

import { Gender } from "@prisma/client"
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

export async function getDoctors() {
    // devuelve el doctor y el numero de citas relacionadas con el doctor
    try {
        const doctors = await prisma.doctor.findMany({
            include: {
                _count: {
                    select: {
                        appointments: true
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // devuelve el doctor y el numero de citas
        return doctors.map((doctor) => ({
            ...doctor,
            appointmentsCount: doctor._count.appointments
        }));

    } catch (error) {
        console.log("Error in getDoctors", error);
        throw new Error("Error in getDoctors");
    }
}

interface CreateDoctorInput {
    name: string;
    email: string;
    phone: string;
    speciality: string;
    gender: Gender;
    isActive: boolean;
    bio?: string;
}

export async function createDoctor(input: CreateDoctorInput) {
    try {

        if (!input.name || !input.email || !input.phone || !input.speciality || !input.gender) {
            throw new Error("Missing required fields");
        }

        const doctor = await prisma.doctor.create({
            data: {
                ...input,
                imageUrl: generateAvatar(input.name, input.gender),
                bio: input.bio || "No bio yet"
            },
        });

        revalidatePath("/admin");

        return doctor;

    } catch (error: any) {
        console.log("Error in createDoctor", error);
        if (error?.code == "P2002") {
            throw new Error("Doctor already exists");
        }
        throw new Error("Error in createDoctor");
    }
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
    id: string;
}

export async function updateDoctor(input: UpdateDoctorInput) {
    try {
        if (!input.name || !input.email || !input.phone || !input.speciality || !input.gender) {
            throw new Error("Missing required fields");
        }

        const currenDoctor = await prisma.doctor.findUnique({
            where: { id: input.id },
            select: { email: true }
        });


        if (!currenDoctor) throw new Error("Doctor not found!");

        if (input.email !== currenDoctor.email) {
            const existingDoctor = await prisma.doctor.findUnique({
                where: { id: input.id, email: input.email }
            });

            if (existingDoctor) {
                throw new Error("Doctor already exists");
            }
        }

        const doctor = await prisma.doctor.update({
            where: { id: input.id },
            data: {
                name: input.name,
                email: input.email,
                phone: input.phone,
                speciality: input.speciality,
                gender: input.gender,
                bio: input.bio || "No bio yet",
                isActive: input.isActive
            }
        })

        return doctor;

    } catch (error: any) {
        console.log("Error in updateDoctor", error);
        throw new Error("Error in updateDoctor");
    }
}


export async function getAvaiableDoctor() {
    try {
        const availableDoctors = await prisma.doctor.findMany({
            where: { isActive: true },
            include: {
                _count: {
                    select: { appointments: true }
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        return availableDoctors.map((doctor) => ({
            ...doctor,
            appointmentsCount: doctor._count.appointments
        }));

    } catch (error: any) {
        console.log("Error at getAvaiableDoctor", error)
        throw new Error("Error at getAvaiableDoctor")
    }
}