import { GiPawPrint } from "react-icons/gi";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
        <GiPawPrint className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}
