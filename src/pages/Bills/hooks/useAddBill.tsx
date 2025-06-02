// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import { toast } from "sonner";

// import useAxios from "@/hooks/axios/useAxios";
// import useUser from "@/hooks/user/useUser";
// import queryKeys from "@/tanstackQuery/queryKeys";

// import type { BillFormValues } from "../components/CreateBillForm/types";

// const useAddBill = () => {
//   const api = useAxios();
//   const queryClient = useQueryClient();
//   const { user } = useUser();

//   const addBillFn = async (bill: BillFormValues) => {
//     const response = await api.post("/bills", bill, {
//       headers: {
//         Authorization: `Bearer ${user?.accessToken}`,
//       },
//     });
//     return response.data;
//   };

//   const { mutate: addBill, isPending } = useMutation({
//     mutationFn: addBillFn,
//     onSuccess: () => {
//       toast.success("Bill added successfully");
//       queryClient.invalidateQueries({ queryKey: [queryKeys.bills] });
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//       toast.error(error.response?.data?.message || error.message);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: [queryKeys.bills] });
//     },
//   });

//   return { addBill, isPending };
// };

// export default useAddBill;
