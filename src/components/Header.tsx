
import React from 'react';
import { FileText, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  planType: 'PGRS' | 'PGRSS';
  onChangePlanType: (type: 'PGRS' | 'PGRSS') => void;
};

const Header: React.FC<HeaderProps> = ({ planType, onChangePlanType }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-pgrs-primary" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Assistente de {planType === 'PGRS' ? 'PGRS' : 'PGRSS'}
              </h1>
              <p className="text-sm text-gray-500">
                Elaboração de {planType === 'PGRS' 
                  ? 'Plano de Gerenciamento de Resíduos Sólidos' 
                  : 'Plano de Gerenciamento de Resíduos de Serviços de Saúde'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 rounded-lg p-1">
              <Button 
                variant={planType === 'PGRS' ? 'default' : 'outline'}
                className={planType === 'PGRS' ? 'bg-pgrs-primary text-white' : 'bg-transparent text-gray-700'}
                onClick={() => onChangePlanType('PGRS')}
              >
                PGRS
              </Button>
              <Button 
                variant={planType === 'PGRSS' ? 'default' : 'outline'}
                className={planType === 'PGRSS' ? 'bg-pgrs-primary text-white' : 'bg-transparent text-gray-700'}
                onClick={() => onChangePlanType('PGRSS')}
              >
                PGRSS
              </Button>
            </div>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <BarChart2 className="h-4 w-4" />
              <span>Relatórios</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
