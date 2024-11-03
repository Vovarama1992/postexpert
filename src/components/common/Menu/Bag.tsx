import React from 'react';
import {BagIcon} from "@/assets";
import {classNames} from "@/utils";
import {Link} from "@/navigation";
import {getParcelDraftCounts, getParcels} from "@/lib";
import {useQuery} from "@tanstack/react-query";

const Bag = ({className}: { className?: string }) => {

    const {data: draftCount} = useQuery({
        queryKey: ['draftCount'],
        queryFn: () => getParcelDraftCounts(),
    });

    return (
        <Link href="/dashboard/cart" className={
            classNames(
                " items-center gap-x-2 ",
                {},
                [className]
            )
        }>
            <BagIcon className="text-white"/>
            <span className="font-medium text-white text-small-2">{draftCount ?? 0}</span>
        </Link>
    );
};

export default Bag;
