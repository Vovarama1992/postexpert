import React, { ReactNode } from 'react';
import ParcelInfoCard from '../../components/Cards/ParcelInfoCard';

interface ParcelPageLayoutProps {
    children: ReactNode;
}

const ParcelPageLayout: React.FC<ParcelPageLayoutProps> = ({ children }) => (
   <>
       <div className="order-left">
           <div className="space-y-8">
               {children}
           </div>
       </div>
       <ParcelInfoCard />
   </>
);

export default ParcelPageLayout;