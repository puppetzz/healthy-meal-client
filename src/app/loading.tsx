import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader size={46} color="orange" />
    </div>
  );
}
