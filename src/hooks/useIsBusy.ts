import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export default function useIsBusy(){
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    if(isFetching>0 || isMutating>0)return true;
    return false;
}