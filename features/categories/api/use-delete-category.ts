import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?: string) => {
    const queryCLient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.categories[":id"]["$delete"]({
                param: { id },
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category deleted");
            queryCLient.invalidateQueries({ queryKey: ["category", { id }] });
            queryCLient.invalidateQueries({ queryKey: ["categories"] });
            //TODO: Invalidate sumary and transactions
        },
        onError: () => {
            toast.error("Failed to delete category");
        },
    });

    return mutation;
};