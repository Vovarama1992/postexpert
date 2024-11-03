import {CategoryIcon, SMSEditIcon} from "@/assets";
import {defaultLocales} from "@/defaultLocales";
import {Tab} from "@/components/ui/Tabs";

const mainTabs = (getLabelByCode: any): Tab[] => {

    return [
        {
            label: defaultLocales(getLabelByCode).data.mainTabs[0],
            value: '',
            icon: CategoryIcon
        },
        {
            label: defaultLocales(getLabelByCode).data.mainTabs[1],
            value: '/support',
            icon: SMSEditIcon
        }
    ]

}
export {mainTabs}
