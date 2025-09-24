import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"];

export const useEditCategory = (id?: string) => {
    const queryCLient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$patch"]({
                param: { id },
                json,

            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category updated");
            queryCLient.invalidateQueries({ queryKey: ["category", { id }] });
            queryCLient.invalidateQueries({ queryKey: ["categories"] });
            queryCLient.invalidateQueries({ queryKey: ["transactions"] });
            //TODO: Invalidate sumary 
        },
        onError: () => {
            toast.error("Failed to edit category");
        },
    });

    return mutation;
};