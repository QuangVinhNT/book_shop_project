import { SyncLoader } from "react-spinners";

export default function Loading() {
  return <div className="flex flex-col justify-center items-center gap-2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
    <SyncLoader color="#2472c8" size={10}/>
    <span className="text-lg font-semibold">Loading site...</span>
  </div>
}