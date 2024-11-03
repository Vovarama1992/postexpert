import React from 'react';
import {Pagination, PaginationProps} from "@nextui-org/react";
import {ArrowNarrowIcon} from "@/assets";
import {usePathname} from "@/navigation";
import {useTranslationContext} from "@/context";
import {twMerge} from "tailwind-merge";

interface PaginationCustomProps extends PaginationProps {
    total: number
    className?: string;
    currentPage: number
    setCurrentPage: (page: number) => void
}

const PaginationCustom = ({
                              total, setCurrentPage, className, currentPage, ...other
                          }: PaginationCustomProps) => {

    const {
        getLabelByCode
    } = useTranslationContext()

    const pathname = usePathname();

    const hasContainer = !pathname.includes('/dashboard')

    const onPrev = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
    }

    const onNext = () => {
        if (currentPage < total) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className={twMerge(
            `flex justify-between items-center ${hasContainer ? 'container' : ''}`,
            className
        )}>
            <button disabled={currentPage <= 1} onClick={onPrev} className={`flex max-sm:hidden items-center gap-3 ${currentPage > 1 ? '' : 'opacity-50 cursor-not-allowed'}`}>
                 <ArrowNarrowIcon/>
                <span className="text-small-4 text-gray-800 font-medium">{getLabelByCode('BACK')}</span>
            </button>
            <Pagination
                total={total}
                classNames={{
                    base: 'flex justify-center relative  overflow-hidden w-full',
                    cursor: '!bg-gray-800', prev: 'hidden', next: 'hidden',
                    item: '!bg-transparent !shadow-none hover:!bg-gray-800 transition-colors hover:!text-white',
                    wrapper: 'w-full',
                }}
                showControls
                initialPage={currentPage}
                onChange={setCurrentPage}
                {...other}
            />
            <button disabled={currentPage >= total} onClick={onNext} className={`flex max-sm:hidden items-center gap-3 ${currentPage < total ? '' : 'opacity-50 cursor-not-allowed'}`}>
                <span className="text-small-4 text-gray-800 font-medium">{getLabelByCode('NEXT')}</span>
                <ArrowNarrowIcon className="rotate-180"/>
            </button>
        </div>
    );
};

export default PaginationCustom;
