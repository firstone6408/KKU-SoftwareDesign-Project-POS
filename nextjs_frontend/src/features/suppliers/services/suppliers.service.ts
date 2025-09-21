import axios from "axios";
import { createSupplierSchema } from "./suppliers.schema";
import { ICreateSupplier, ISupplier } from "./suppliers.interface";
import { API_CONFIG } from "@/configs/api.config";
import { withApiHandling } from "@/utils/api.utils";
import { configureCache } from "@/utils/cache.utils";
import { getSupplierGlobalTag } from "./suppliers.cache";

export async function createSupplier(input: ICreateSupplier) {
    try {
        const { success, error, data } = createSupplierSchema.safeParse(input);
        if (success === false) {
            return {
                message: "กรุณากรอกข้อมูลให้ถูกต้อง",
                error: error.flatten().fieldErrors,
            };
        }

        const requestBody = {
            name: data.name,
            contactInfo: data.contactInfo,
        };

        const { error: resErr } = await withApiHandling(
            axios.post(API_CONFIG.BASE_URL + "/api/suppliers", requestBody)
        );

        if (resErr.status === "error") {
            return {
                message: resErr.errorMessage,
            };
        }
    } catch (error) {
        console.error(error);
        return {
            message: "Error",
        };
    }
}

export async function getSupplierList() {
    "use cache";
    configureCache({
        life: "hours",
        tag: getSupplierGlobalTag(),
    });
    try {
        const { result, error } = await withApiHandling(
            axios.get(API_CONFIG.BASE_URL + "/api/suppliers")
        );

        if (error.status === "error") {
            console.error(error.errorMessage);
            return [];
        }
        
        return result.data.data as ISupplier[];
    } catch (error) {
        console.error(error);
        return [];
    }
}