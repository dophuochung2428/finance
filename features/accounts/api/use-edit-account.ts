import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

export const useEditAccount = (id?: string) => {
    const queryCLient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$patch"]({
                param: { id },
                json,

            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account updated");
            queryCLient.invalidateQueries({ queryKey: ["account", { id }] });
            queryCLient.invalidateQueries({ queryKey: ["accounts"] });
            queryCLient.invalidateQueries({ queryKey: ["transactions"] });
            //TODO: Invalidate sumary 
        },
        onError: () => {
            toast.error("Failed to edit account");
        },
    });

    return mutation;
};