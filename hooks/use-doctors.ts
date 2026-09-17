"use client";

import { createDoctor, getAvaiableDoctor, getDoctors, updateDoctor } from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDoctors() {
    const result = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors
    })

    return result;
}

export function useCreateDoctor() { 
    const queryClient = useQueryClient(); 
    const result = useMutation({
        mutationFn: createDoctor, 
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ["getDoctors"] })
            queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"]})
        },
        onError: (error) => { 
            console.log("Error in useCreateDoctor", error)
        }
    })

    return result;
}

export function useUpdateDoctor() {
    const queryClient = useQueryClient(); 
    const result = useMutation({
        mutationFn: updateDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getDoctors"] })
            queryClient.invalidateQueries({ queryKey: ["gerAvaiableDoctors"] })
        },
        onError: (error) => {
            console.log("Error in useUpdateDoctor", error)
            throw new Error("Error at useUpdatedDoctor")
        }
    })

    return result;
}

export function useGetAvailableDoctor() { 
    const result = useQuery({
        queryKey: ["getAvailableDoctors"],
        queryFn: getAvaiableDoctor
    })

    return result; 
}