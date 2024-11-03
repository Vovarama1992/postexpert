import {SkeletonProps} from "../model/skeleton";
import SkeletonAddressCard from "./SkeletonFigures/SkeletonAddressCard";
import SkeletonRecipientCard from "./SkeletonFigures/SkeletonRecipientCard";
import SkeletonProfileCard from "./SkeletonFigures/SkeletonProfileCard";
import SkeletonTariffCard from "./SkeletonFigures/SkeletonTariffCard";
import SkeletonDashboardCard from "./SkeletonFigures/SkeletonDashboardCard";

const SkeletonWrapper = ({children, ready, type, className}: SkeletonProps) => {

    const renderType = () => {
        switch (type) {
            case 'address':
                return <SkeletonAddressCard className={className}/>
            case 'recipient':
                return <SkeletonRecipientCard className={className}/>
            case 'profile':
                return <SkeletonProfileCard className={className}/>
            case 'tariff':
                return <SkeletonTariffCard className={className}/>
            case 'dashboard':
                return <SkeletonDashboardCard className={className}/>
        }
    }

    if (!ready) {
        return renderType()
    }

    return children;
};

export default SkeletonWrapper;
