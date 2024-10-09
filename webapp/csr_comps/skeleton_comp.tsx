import { Skeleton } from "@/components/ui/skeleton"


export const SkeletonComp = () => {

    return (
            <div className="flex items-center w-full">
                <Skeleton className="h-[50px] w-[50px] rounded-full bg-accent mr-[10px]" />
                <div className="space-y-2 flex-grow">
                    <Skeleton className="h-4 w-[50%] bg-accent" />
                    <Skeleton className="h-4 w-[40%] bg-accent" />
                    <Skeleton className="h-4 w-[30%] bg-accent" />
                </div>
            </div>
      )
}