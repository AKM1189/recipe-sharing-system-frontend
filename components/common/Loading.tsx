"use client";
import { Spinner } from "../ui/spinner";
import { useLoadingStore } from "@/store/loading.store";

const Loading = () => {
  const { loading } = useLoadingStore();
  if (loading)
    return (
      <div className="fixed top-0 left-0 bg-white/50  w-svw h-svh flex justify-center items-center">
        <Spinner className="size-12" />
      </div>
    );
};

export default Loading;
